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
import { useMutation, useQuery } from "@apollo/client";
import {
    CREATE_SUBDEPARTMENT,
    GET_DEPARTMENTS,
    GET_SUBDEPARTMENTS,
    UPDATE_SUBDEPARTMENT,
} from "@/lib/graphql.def";
import { TColumnDef } from "./List";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TDepartment } from "@/types";

const FormSchema = z.object({
    name: z.string().min(2, "Name should be minimum of two characters"),
    departmentId: z.union([z.number(), z.string()]),
});

export type TSubDepartmentFormData = z.infer<typeof FormSchema>;

export default function SubDepartmentForm({
    formData,
}: {
    formData?: TColumnDef;
}) {
    const { data } = useQuery(GET_DEPARTMENTS);
    const isEdit = formData !== undefined;
    const [createSubDepartment] = useMutation(CREATE_SUBDEPARTMENT, {
        refetchQueries: [{ query: GET_SUBDEPARTMENTS }],
        awaitRefetchQueries: true,
    });
    const [updateSubDepartment] = useMutation(UPDATE_SUBDEPARTMENT, {
        refetchQueries: [{ query: GET_SUBDEPARTMENTS }],
        awaitRefetchQueries: true,
    });

    const form = useForm<TSubDepartmentFormData>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: isEdit ? formData?.name : "",
            departmentId: isEdit ? formData?.department?.id : "",
        },
    });

    const handleCreateSubDepartment = async (
        formData: TSubDepartmentFormData,
    ) => {
        try {
            await createSubDepartment({
                variables: {
                    createSubDepartmentInput: {
                        ...formData,
                        departmentId: +formData.departmentId,
                    },
                },
            });

            document.getElementById("create-subdepartment")?.click();

            form.reset();

            toast.success("SubDepartment has been created succesfully");
        } catch (error) {
            return toast.error((error as Error).message);
        }
    };

    const handleUpdateSubDepartment = async ({
        name,
        departmentId,
    }: TSubDepartmentFormData) => {
        try {
            await updateSubDepartment({
                variables: {
                    updateSubDepartmentInput: {
                        name,
                        id: formData?.id,
                        departmentId: +departmentId,
                    },
                },
            });

            document
                .getElementById(`update-subdepartment${formData?.id}`)
                ?.click();

            toast.success("SubDepartment has been updated succesfully");
        } catch (error) {
            toast.error((error as Error).message);
        }
    };

    const onSubmit = async (data: TSubDepartmentFormData) =>
        isEdit
            ? await handleUpdateSubDepartment(data)
            : await handleCreateSubDepartment(data);

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
                <FormField
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={`${field.value}`}>
                                <FormControl>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select department" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {data?.getDepartments?.map(
                                        (item: TDepartment) => (
                                            <SelectItem
                                                value={`${item.id}`}
                                                key={item.id}>
                                                {item.name}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

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
