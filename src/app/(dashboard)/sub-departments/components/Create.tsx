import DailogForm from "@/components/shared/DialogForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserForm from "./Form";

export default function CreateSubDepartment() {
    return (
        <DailogForm
            id="create-subdepartment"
            title="Create SubDepartment"
            Trigger={
                    <Button variant="outline" className="w-max">
                        Create <Plus size={15} />
                    </Button>
            }
            form={<UserForm />}
        />
    );
}
