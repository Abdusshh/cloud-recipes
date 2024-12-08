import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Cloud Recipes
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          {/* <li><Link href="/recipes">Recipes</Link></li> */}
          <li><Link href="/generate">Generate Recipe</Link></li>
        </ul>
      </nav>
    </header>
  )
}

