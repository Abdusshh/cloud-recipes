import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Validate API Key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable is not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp", // Adjust model name if necessary
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.ingredients || typeof body.ingredients !== "string") {
      return NextResponse.json(
        { error: "Invalid ingredients. Please provide a comma-separated string of ingredients." },
        { status: 400 }
      );
    }

    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
    const result = await chatSession.sendMessage(`You are an expert chef. Create a step-by-step recipe using the following ingredients: ${body.ingredients}. 
    - Write the recipe in a clear and beginner-friendly format, do not include any markdown format in your response. 
    - Include exact measurements and specify the sequence of actions clearly.
    - Divide the recipe into "Ingredients" and "Instructions" sections.
    - In the "Instructions" section, write numbered steps in a concise and detailed manner. For example:
    1. [Explain the first step, such as preheating the oven or preparing utensils.]
    2. [Explain the next step, such as mixing ingredients.]
    3. [Continue describing steps until the recipe is complete.]
    Focus on making the recipe easy to follow. Avoid unnecessary technical jargon.`);
    
    const recipeResponse = result.response.text();
    

    return NextResponse.json({
      ingredients: body.ingredients.split(",").map((i: string) => i.trim()),
      instructions: recipeResponse.split("\n"),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred while generating the recipe." },
      { status: 500 }
    );
  }
}
