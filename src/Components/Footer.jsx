import { Telescope, House, CodeXml } from 'lucide-react'

export const Footer = () => {
    return (
        <footer className="fixed flex justify-evenly w-full bottom-0 z-20 backdrop-blur-[8px] border-t-[1px] p-2">
            <a href="https://github.com/Alreynn/prabmul-media-player" className="flex relative flex-col items-center w-56">
                <Telescope className="size-[1.5em] -mb-1 transition-all active:scale-110" />
                <p>Orisinil</p>
            </a>
            <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex relative flex-col items-center w-56">
                <House className="size-[1.5em] -mb-1 transition-all active:scale-110" />
                <p>Halaman</p>
            </button>
            <a href="https://github.com/Alreynn/prabmul-media-player-R" className="flex flex-col items-center w-56">
                <CodeXml className="size-[1.5em] -mb-1 transition-all active:scale-110" />
                <p>Kode Sumber</p>
            </a>
        </footer>
    )
}
