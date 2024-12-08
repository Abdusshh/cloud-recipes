import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const recipe = await request.json()

  // Mock database logic
  console.log('Saving recipe to the database:', recipe)

  // Simulate success response
  return NextResponse.json({ success: true, message: 'Recipe saved successfully!' })
}