import Link from 'next/link'

interface Recipe {
  id: string
  title: string
  description: string
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <Link href={`/recipes/${recipe.id}`} className="text-blue-500 hover:underline">
          View Recipe
        </Link>
      </div>
    </div>
  )
}

