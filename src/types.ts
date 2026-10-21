export interface PokemonListItem {
    name: string
    url: string
}

export interface PokemonListResponse {
    results: PokemonListItem[]
}

export interface PokemonDetail {
    id: number
    name: string
    height: number
    weight: number
    types: { type: { name: string } }[]
    stats: { base_stat: number; stat: { name: string } }[]
}
