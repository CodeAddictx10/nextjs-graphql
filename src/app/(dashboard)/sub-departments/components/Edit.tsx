import DailogForm from "@/components/shared/DialogForm";
import { Pencil } from "lucide-react";
import SubDepartmentForm from "./Form";
import { TColumnDef } from "./List";

export default function EditSubDepartment({ formData }: { formData: TColumnDef }) {
    return (
        <DailogForm
            id={`update-subdepartment${formData.id}`}
            title="Edit SubDepartment"
            description={
                <span>Update sub department name. Click update when done</span>
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
            form={<SubDepartmentForm formData={formData} />}
        />
    );
}
