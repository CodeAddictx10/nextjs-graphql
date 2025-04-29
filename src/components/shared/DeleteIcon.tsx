"use client";
import { Loader, Trash2 } from "lucide-react";
import { useTransition } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function DeleteIcon() {
    const [isPending, startTransition] = useTransition();
    const onSubmit = () => {
        startTransition(async () => {
            try {
                toast.success("Record has been deleted successfully");
                // router.refresh();
            } catch (error) {
                toast.error("Uh oh! Something went wrong.", {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    description: (error as any).message,
                });
            }
        });
    };

    return isPending ? (
        <Loader size={20} className="text-sm animate-spin" />
    ) : (
        <AlertDialog>
            <AlertDialogTrigger>
                <Trash2 size={14} className="cursor-pointer text-red-500" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the record and remove the record from our
                        servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-500"
                        onClick={onSubmit}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
