"use client";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import BadgeInputList from "@/components/ui/badge-input-list";
import { useMutation } from "@apollo/client";
import {
    CREATE_DEPARTMENT,
    GET_DEPARTMENTS,
    UPDATE_DEPARTMENT,
} from "@/lib/graphql.def";
import { TColumnDef } from "./List";

const FormSchema = z.object({
    name: z.string().min(2, "Name should be minimum of two characters"),
    subDepartments: z.array(z.string()).optional(),
});

export type TDepartmentFormData = z.infer<typeof FormSchema>;

export default function DepartmentForm({ formData }: { formData?: TColumnDef }) {
    const isEdit = formData !== undefined;
    const [createDepartment] = useMutation(CREATE_DEPARTMENT, {
        refetchQueries: [{ query: GET_DEPARTMENTS }],
        awaitRefetchQueries: true,
    });
    const [updateDepartment] = useMutation(UPDATE_DEPARTMENT, {
        refetchQueries: [{ query: GET_DEPARTMENTS }],
        awaitRefetchQueries: true,
    });

    const form = useForm<TDepartmentFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: isEdit ? formData?.name : "",
            subDepartments: isEdit
                ? formData.subDepartments?.map((item) => item.name)
                : [],
        },
    });

    const handleCreateDepartment = async (formData: TDepartmentFormData) => {
        try {
            await createDepartment({
                variables: { createDepartmentInput: formData },
            });

            document.getElementById("create-department")?.click();

            form.reset();

            toast.success("Department has been created succesfully");
        } catch (error) {
            return toast.error((error as Error).message);
        }
    };

    const handleUpdateDepartment = async ({ name }: TDepartmentFormData) => {
        try {
            await updateDepartment({
                variables: {
                    updateDepartmentInput: { name, id: formData?.id },
                },
            });

            document
                .getElementById(`update-department${formData?.id}`)
                ?.click();

            toast.success("Department has been updated succesfully");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const onSubmit = async (data: TDepartmentFormData) =>
        isEdit
            ? await handleUpdateDepartment(data)
            : await handleCreateDepartment(data);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter department name"
                                    type="text"
                                    {...field}
                                    onChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {!isEdit && (
                    <BadgeInputList
                        name="subDepartments"
                        label="SubDepartments"
                        placeholder="Enter a department"
                        form={form}
                    />
                )}

                <Button
                    disabled={form.formState.isSubmitting}
                    type="submit"
                    className="w-full disabled:bg-gray-500">
                    {form.formState.isSubmitting
                        ? "Processing..."
                        : isEdit
                        ? "Update"
                        : "Create"}
                </Button>
            </form>
        </Form>
    );
}
