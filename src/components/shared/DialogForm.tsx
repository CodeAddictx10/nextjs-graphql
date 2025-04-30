import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode } from "react";

export default function DailogForm({
    Trigger,
    id,
    title,
    form,
    description,
}: {
    title: string;
    Trigger: ReactNode;
    id: string;
    form: ReactNode;
    description?: ReactNode;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild id={id}>
                {Trigger}
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-[425px]"
                onPointerDownOutside={(event) => event.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-center">{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {form}
            </DialogContent>
        </Dialog>
    );
}
