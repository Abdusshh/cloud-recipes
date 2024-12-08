import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { ingredients } = await request.json()

  // Here, you would typically call your Recipe Generation Service
  // For now, we'll just return a mock response
  const mockGeneratedRecipe = {
    title: "Generated Recipe",
    ingredients: ingredients.split(',').map((i: string) => i.trim()),
    instructions: [
      "Mix all ingredients in a bowl",
      "Cook for 20 minutes",
      "Serve and enjoy!"
    ]
  }

  return NextResponse.json(mockGeneratedRecipe)
}

