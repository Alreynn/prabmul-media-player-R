import { useState } from 'react'
import { Button } from "./ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"

export const Popup = ({ changesParagraph, changesList, lastUpdated }) => {
    const [pop, setPop] = useState(true);
    return (
        <Dialog open={pop} onOpenChange={setPop}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Catatan Perubahan</DialogTitle>
                </DialogHeader>
                <div className="text-white">
                    <p>{changesParagraph}</p>
                    {changesList.length > 0 &&
                        <ol className="list-inside list-disc">
                            {changesList.map((item) => {
                                return (
                                    <li>{item}</li>
                                )
                            })}
                        </ol>
                    }
                    <p className="mt-4">Perubahan terakhir: {lastUpdated}</p>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Tutup
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}