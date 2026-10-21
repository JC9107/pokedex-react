import type { PokemonListItem } from "../types"
import { getPokemonId, getPokemonImage } from "../api/pokemon"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { toggleFavorite } from "../store/favoritesSlice"

interface Props {
    pokemon: PokemonListItem
    onSelect: () => void
}

export default function PokemonCard({ pokemon, onSelect }: Props) {
    const id = getPokemonId(pokemon.url)
    const dispatch = useAppDispatch()
    const isFavorite = useAppSelector((state) => 
        state.favorites.names.includes(pokemon.name)
    )

    return (
        <div className="relative">
            <button 
                onClick={onSelect}
                className="w-full cursor-pointer rounded-xl bg-white p-4 text-center shadow transition hover:shadow-lg"
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

            <button
                onClick={() => dispatch(toggleFavorite(pokemon.name))}
                aria-label={isFavorite ? `Quitar ${pokemon.name} de favoritos` : `Agregar ${pokemon.name} a favoritos`}
                aria-pressed={isFavorite}
                className="absolute right-2 top-2 cursor-pointer text-xl"
            >
                {isFavorite ? '❤️' : '🤍'}
            </button>
        </div>
    )
}
