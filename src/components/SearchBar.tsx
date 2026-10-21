interface Props {
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: Props) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Buscar Pokémon..."
            aria-label="Buscar Pokémon"
            className="mb-6 w-full max-w-md rounded-lg border border-slate-300 bg-white px-4 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
    )
}
