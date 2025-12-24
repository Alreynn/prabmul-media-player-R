import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { X } from 'lucide-react'

export const Popup = ({ changesParagraph = "Tidak ada perubahan.", changesList }) => {
    let [isOpen, setIsOpen] = useState(true)
    function close() {
        setIsOpen(false)
    }
    
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={close}>
                <Transition.Child as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/35" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                            >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-blue-300/95 to-[#87CEEB]/95 p-6 pt-4 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="div" className="flex justify-between text-3xl font-bold text-gray-100 text-shadow-popup">
                                    Catatan Perubahan
                                    <X type="button" onClick={close} />
                                </Dialog.Title>
                                <div>
                                    <p className="text-lg text-gray-200 text-shadow-popup">{changesParagraph}</p>
                                    {changesList.length > 0 &&
                                        <ol className="list-inside list-disc text-md text-gray-200 text-shadow-popup">
                                            {changesList.map((item) => {
                                                return (
                                                    <li>{item}</li>
                                                )
                                            })}
                                        </ol>
                                    }
                                </div>
                                <div className="mt-3">
                                    <button type="button"
                                        className="inline-flex justify-center rounded-md bg-zinc-950/25 px-2 py-1.5 w-full text-md font-medium text-blue-100 transition-all duration-100 hover:bg-zinc-950/35"
                                        onClick={close}>
                                        Tutup
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}