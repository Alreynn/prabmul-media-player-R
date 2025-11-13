import { useState } from 'react'
import './App.css'
import cover1 from './assets/1762736741104.jpg'
import cover2 from './assets/1762830088190.jpg'
import tak_ingin_sendiri from './assets/audio/Dian_Piesesha-Tak_Ingin_Sendiri.mp3'

const App = () => {
    const Songs = [
        { id: 1, cover: cover1, url: tak_ingin_sendiri, title: 'Tak Ingin Sendiri', artist: 'Dian Piesesha' },
        { id: 2, cover: cover2, url: '', title: 'Hello', artist: 'Testpage' },
        { id: 3, cover: cover1, url: '', title: 'Hello', artist: 'Testpage' },
    ]
    return (
        <>
            <body className="bg-gradient-to-t from-blue-300/90 to-[#87CEEB]">
                <header className="bg-transparent text-white p-5 border-b-[1px]">
                    <p className="font-bold text-3xl">Prabowo-Jokowi Untuk Kebutuhan Iman</p>
                </header>
                
                <main className="p-3 px-4 min-h-screen">
                    <h1 className="text-3xl font-bold text-white mb-3">Cari lagu yang sesuai dengan kebutuhanmu akan Prabowo-Jokowi.</h1>
                    <h2 className="text-2xl font-bold text-white mb-2">Musik Pilihan Kami</h2>
                    <div className="flex flex-none overflow-auto snap-x snap-mandatory gap-4">
                        {Songs.map((item) => {
                            return (
                                <button className="flex flex-col flex-none bg-gradient-to-br from-[#87CEEB] to-blue-300/90 snap-start border-[1px] w-48 p-3 rounded-[6px] text-white transition-all active:text-neutral-200" key={item.id}>
                                    <img className="aspect-square object-cover rounded h-auto" src={item.cover} />
                                    <h3 className="text-l font-semibold text-center overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</h3>
                                </button>
                            )
                        })}
                    </div>
                </main>
            </body>
        </>
    )
}

export default App