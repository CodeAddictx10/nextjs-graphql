import DailogForm from "@/components/shared/DialogForm";
import { Pencil } from "lucide-react";


export default function EditUser() {
    return (
        <DailogForm
            id="update-user"
            title="Edit User"
            description={
                <span>Update user profile. Click update when done</span>
            }
            Trigger={
                <button>
                    <Pencil
                        type="button"
                        className="cursor-pointer"
                        size={14}
                    />
                </button>
            }
            form={<h1>Hello</h1>}
        />
    );
}
