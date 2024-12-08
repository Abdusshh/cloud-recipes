import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, you would fetch this data from a database
  const recipes = [
    { id: '1', title: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
    { id: '2', title: 'Chicken Tikka Masala', description: 'A popular Indian curry dish.' },
    { id: '3', title: 'Caesar Salad', description: 'A refreshing salad with a creamy dressing.' },
    // Add more recipes as needed
  ]

  return NextResponse.json(recipes)
}

