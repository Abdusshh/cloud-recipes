import type { Recipe } from '@/types'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Recipe: {recipe.id}</h2>
        <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-lg font-medium mb-2">Instructions:</h3>
        <div className="prose">
          {recipe.instructions.map((instruction, index) => (
            <p key={index}>{instruction}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

