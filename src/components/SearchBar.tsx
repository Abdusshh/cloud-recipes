'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/recipes?search=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        className="px-4 py-2 border border-gray-300 rounded-l-md w-64"
      />
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r-md">
        Search
      </button>
    </form>
  )
}

