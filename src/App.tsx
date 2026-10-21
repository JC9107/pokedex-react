import { useEffect, useState } from "react"
import { getPokemonList } from "./api/pokemon"
import type { PokemonListItem } from "./types"
import PokemonCard from "./components/PokemonCard"
import SearchBar from "./components/SearchBar"
import PokemonModal from "./components/PokemonModal"
import { useAppSelector } from "./store/hooks"

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [showFavorites, setShowFavorites] = useState(false)
  const favoriteNames = useAppSelector((state) => state.favorites.names)

  useEffect(() => {
    getPokemonList()
      .then(setPokemons)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-8">Cargando...</p>
  if (error) return <p className="p-8 text-red-600">{error}</p>

  const filtered = pokemons.filter((p) =>
    p.name.includes(search.toLowerCase().trim()) &&
    (!showFavorites || favoriteNames.includes(p.name))
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">Pokédex</h1>
      <SearchBar value={search} onChange={setSearch} />
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setShowFavorites(false)}
          className={`cursor-pointer rounded-full px-4 py-1 text-sm ${!showFavorites ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
        >
          Todos
        </button>
        <button
          onClick={() => setShowFavorites(true)}
          className={`cursor-pointer rounded-full px-4 py-1 text-sm ${showFavorites ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'}`}
        >
          Favoritos ({favoriteNames.length})
        </button>
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-500">No se encontraron Pokémon</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filtered.map((p) => (
            <PokemonCard key={p.name} pokemon={p} onSelect={() => setSelected(p.name)} />
          ))}
        </div>
      )}

      {selected &&(
        <PokemonModal name={selected} onClose={() =>setSelected(null)} />
      )}
    </main>
  )
}

export default App
