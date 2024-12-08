'use client'

import { useState } from 'react'

interface Recipe {
  title: string
  ingredients: string[]
  instructions: string[]
}

export default function GenerateRecipe() {
  const [ingredients, setIngredients] = useState('')
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaveMessage(null)
    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })
      const data = await response.json()
      setGeneratedRecipe(data)
    } catch (error) {
      console.error('Error generating recipe:', error)
    }
  }

  const handleSaveRecipe = async () => {
    if (!generatedRecipe) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedRecipe),
      })
      if (response.ok) {
        setSaveMessage('Recipe saved successfully!')
      } else {
        setSaveMessage('Failed to save recipe. Please try again.')
      }
    } catch (error) {
      console.error('Error saving recipe:', error)
      setSaveMessage('An error occurred while saving the recipe.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate a Recipe</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <label htmlFor="ingredients" className="block mb-2">Enter ingredients (comma-separated):</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
          rows={4}
        />
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          Generate Recipe
        </button>
      </form>
      {generatedRecipe && (
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{generatedRecipe.title}</h2>
          <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
          <ul className="list-disc list-inside mb-4">
            {generatedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3 className="text-lg font-medium mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside">
            {generatedRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <button
            onClick={handleSaveRecipe}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Recipe'}
          </button>
          {saveMessage && (
            <p className={`mt-4 ${saveMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
              {saveMessage}
            </p>
          )}
        </div>
      )}
    </div>
  )
}