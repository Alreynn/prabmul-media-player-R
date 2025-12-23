import { Telescope, House, CodeXml } from 'lucide-react'

const iconClass = "size-[1.5em] -mb-1 transition-all active:scale-110";
export const Footer = () => {
    return (
        <footer className="fixed flex justify-evenly w-full bottom-0 z-20 backdrop-blur-[8px] border-t-[1px] p-2">
            <a href="https://github.com/Alreynn/prabmul-media-player" className="flex relative flex-col items-center w-56">
                <Telescope className={iconClass} />
                <p>Orisinil</p>
            </a>
            <button onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex relative flex-col items-center w-56">
                <House className={iconClass} />
                <p>Halaman</p>
            </button>
            <a href="https://github.com/Alreynn/prabmul-media-player-R" className="flex flex-col items-center w-56">
                <CodeXml className={iconClass} />
                <p>Kode Sumber</p>
            </a>
        </footer>
    )
}
