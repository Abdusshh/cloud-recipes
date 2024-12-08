'use client'

import { useState, useEffect } from 'react'
import RecipeCard from './RecipeCard'

interface Recipe {
  id: string
  title: string
  description: string
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch('/api/recipes')
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setRecipes(data)
      } catch (error) {
        console.error('Error fetching recipes:', error)
        setError('Failed to fetch recipes. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  if (isLoading) {
    return <div className="text-center">Loading recipes...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (recipes.length === 0) {
    return <div className="text-center">No recipes found.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}

