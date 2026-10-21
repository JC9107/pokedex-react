import type { PokemonListItem } from "../types"
import { getPokemonId, getPokemonImage } from "../api/pokemon"

interface Props {
    pokemon: PokemonListItem
    onSelect: () => void
}

export default function PokemonCard({ pokemon, onSelect }: Props) {
    const id = getPokemonId(pokemon.url)

    return (
        <button 
            onClick={onSelect}
            className="rounded-xl bg-white p-4 text-center shadow transition hover:shadow-lg"
        >
            <img
                src={getPokemonImage(id)}
                alt={pokemon.name}
                loading="lazy"
                className="mx-auto h-32 w-32"
            />
            <p className="mt-2 text-xs text-gray-400">#{String(id).padStart(3, '0')}</p>
            <h2 className="font-semibold capitalize">{pokemon.name}</h2>
        </button>
    )
}
