import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const Popup = ({ changesParagraph, changesList }) => {
    const [pop, setPop] = useState(true);
    return (
        <Dialog open={pop} onOpenChange={setPop}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Catatan Perubahan</DialogTitle>
                    <DialogDescription>
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
                    </DialogDescription>
                </DialogHeader>
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