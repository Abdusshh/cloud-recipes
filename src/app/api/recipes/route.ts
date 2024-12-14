import { NextResponse } from 'next/server'
import type { Recipe } from '@/types'
import { addRecipe, getRecipes
 } from '@/util/database'

// Handle GET and POST requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')

  const recipes : Recipe[] = await getRecipes()

  let filteredRecipes = recipes

  if (query) {
    filteredRecipes = recipes.filter(recipe =>
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase())) ||
      recipe.instructions.some(instruction => instruction.toLowerCase().includes(query.toLowerCase()))
    )
  }

  return NextResponse.json(filteredRecipes)
}

export async function POST(request: Request) {
  const newRecipe = await request.json()
  
  // Validate data (basic example)
  if (!newRecipe.ingredients || !newRecipe.instructions) {
    return NextResponse.json({ error: 'Title and description are required.' }, { status: 400 })
  }

  console.log('New recipe:', newRecipe)

  // Add the new recipe to the mock database
  addRecipe(newRecipe)

  return NextResponse.json(newRecipe, { status: 201 }) // Return the created resource
}