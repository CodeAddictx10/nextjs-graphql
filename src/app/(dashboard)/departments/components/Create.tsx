import DailogForm from "@/components/shared/DialogForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserForm from "./Form";

export default function CreateDepartment() {
    return (
        <DailogForm
            id="create-department"
            title="Create Department"
            Trigger={
                    <Button variant="outline" className="w-max">
                        Create <Plus size={15} />
                    </Button>
            }
            form={<UserForm />}
        />
    );
}
