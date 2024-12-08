import RecipeList from '../components/RecipeList'
import SearchBar from '../components/SearchBar'

export default function Home() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Welcome to Cloud Recipes</h1>
      <SearchBar />
      <RecipeList />
    </div>
  )
}

