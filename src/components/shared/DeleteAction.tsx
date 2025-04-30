"use client";
import { Loader, Trash2 } from "lucide-react";
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
import { TypedDocumentNode, useMutation } from "@apollo/client";

type Props = {
    deleteMutation: TypedDocumentNode;
    refreshQuery: TypedDocumentNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables: { [key: string]: any } | undefined;
};
export default function DeleteAction({ deleteMutation, refreshQuery, variables }: Props) {
    const [deleteDepartment, {loading}] = useMutation(deleteMutation, {
        refetchQueries: [{ query: refreshQuery }],
        awaitRefetchQueries: true,
    });
    const onSubmit = async () => {
        try {
            await deleteDepartment({
                variables,
            });
            toast.success("Record has been deleted successfully");
        } catch (error) {
            toast.error("Uh oh! Something went wrong.", {
                description: (error as Error).message,
            });
        }
    };

    return loading ? (
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
                        delete the record.
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
