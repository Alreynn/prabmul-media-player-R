import { useEffect } from 'react'

export const Closed = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])
    return (
        <div className="fixed flex flex-col items-center justify-center bg-zinc-900 h-screen w-full z-[100]">
            <h1 className="text-3xl font-bold">Prabmul Media Player</h1>
            <p className="text-lg">Situs ditutup untuk beberapa hari.</p>
            <p className="text-sm">Perlu sedikit perbaikan.</p>
        </div>
    )
}