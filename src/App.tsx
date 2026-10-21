import { useEffect, useState } from "react"
import { getPokemonList } from "./api/pokemon"
import type { PokemonListItem } from "./types"
import PokemonCard from "./components/PokemonCard"
import SearchBar from "./components/SearchBar"
import PokemonModal from "./components/PokemonModal"

function App() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    getPokemonList()
      .then(setPokemons)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="p-8">Cargando...</p>
  if (error) return <p className="p-8 text-red-600">{error}</p>

  const filtered = pokemons.filter((p) =>
    p.name.includes(search.toLowerCase().trim())
  )

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">Pokédex</h1>
      <SearchBar value={search} onChange={setSearch} />
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
