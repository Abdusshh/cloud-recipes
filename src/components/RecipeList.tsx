'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import RecipeCard from './RecipeCard'
import type { Recipe } from '@/types'

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams() // Get the search parameters
  const query = searchParams.get('query') || '' // Get the 'query' parameter

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Fetch recipes with the query parameter
        const url = query
          ? `/api/recipes?query=${encodeURIComponent(query)}`
          : '/api/recipes'
        const response = await fetch(url)
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
  }, [query]) // Re-run whenever the query parameter changes

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