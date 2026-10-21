import { useEffect, useState } from "react"
import { getPokemonDetail, getPokemonImage } from "../api/pokemon"
import type { PokemonDetail } from "../types"

interface Props {
    name: string
    onClose: () => void
}

export default function PokemonModal({ name, onClose }: Props) {
    const [detail, setDetail] = useState<PokemonDetail | null>(null)
    const [error, setError] = useState('')

    useEffect(() => {
        getPokemonDetail(name)
            .then(setDetail)
            .catch((e) => setError(e.message))
    }, [name])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [onClose])

    return (
        <div
            className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-label={`Detalle de ${name}`}
                className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-x1"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="float-right text-2xl leading-none text-slate-400 hover:text-slate-700"
                >
                    ×
                </button>

                {error && <p className="text-red-600">{error}</p>}
                {!detail && !error && <p>Cargando...</p>}

                {detail && (
                    <div className="text-center">
                        <img
                            src={getPokemonImage(detail.id)}
                            alt={detail.name}
                            className="mx-auto h-40 w-40"
                        />
                        <h2 className="text-2xl font-bold capitalize">{detail.name}</h2>

                        <div className="mt-2 flex justify-center gap-2">
                            {detail.types.map((t) => (
                                <span
                                    key={t.type.name}
                                    className="rounded-full bg-slate-200 px-3 py-1 text-xs capitalize"
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        <p className="mt-3 text-sm text-slate-600">
                            Altura: {detail.height / 10} m · Peso: {detail.weight / 10} kg
                        </p>

                        <div className="mt-4 space-y-2 text-left">
                            {detail.stats.map((s) => (
                                <div key={s.stat.name}>
                                    <div className="flex justify-between text-xs capitalize text-slate-600">
                                        <span>{s.stat.name}</span>
                                        <span>{s.base_stat}</span>
                                    </div>
                                    <div className="h-2 rounded bg-slate-200">
                                        <div 
                                            className="h-2 rounded bg-blue-500"
                                            style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
