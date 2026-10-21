import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface FavoritesState {
    names: string[]
}

const initialState: FavoritesState = { names: [] }

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite(state, action: PayloadAction<string>) {
            const name = action.payload
            if (state.names.includes(name)) {
                state.names = state.names.filter((n) => n !== name)
            } else {
                state.names.push(name)
            }
        },
    },
})

export const { toggleFavorite } = favoritesSlice.actions
export default favoritesSlice.reducer
