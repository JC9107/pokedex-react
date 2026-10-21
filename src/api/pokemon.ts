import type { PokemonDetail, PokemonListItem, PokemonListResponse } from '../types'

const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemonList(limit = 151): Promise<PokemonListItem[]> {
    const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
    if (!res.ok) throw new Error('No se pudo cargar la lista')
    const data: PokemonListResponse = await res.json()
    return data.results
}

export function getPokemonId(url: string): number {
    const parts = url.split('/').filter(Boolean)
    return Number(parts[parts.length - 1])
}

export function getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
    const res = await fetch(`${BASE_URL}/pokemon/${name}`)
    if (!res.ok) throw new Error('No se pudo cargar el detalle')
    return res.json()
}
