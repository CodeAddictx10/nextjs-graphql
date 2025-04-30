"use client";
import { z } from "zod";
import { useSuspenseQuery } from "@apollo/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import EditSubDepartment from "./Edit";
import DeleteAction from "@/components/shared/DeleteAction";
import CreateUser from "./Create";
import { DELETE_SUBDEPARTMENT, GET_SUBDEPARTMENTS } from "@/lib/graphql.def";

export const schema = z.object({
    id: z.number(),
    name: z.string(),
    department: z.object({
        id: z.number(),
        name: z.string(),
    }),
});
export type TColumnDef = z.infer<typeof schema>;
const columns: ColumnDef<TColumnDef>[] = [
    {
        id: "index",
        header: "SubDepartment Id",
        cell: ({ row }) => <div className="w-32 px-2">{row.original.id}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
            <div className="w-32 py-4">{row?.original?.name}</div>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
          <div className="w-32 py-4">{row?.original?.department.name}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="inline-flex space-x-5">
                    <EditSubDepartment formData={row.original} />
                    <DeleteAction
                        deleteMutation={DELETE_SUBDEPARTMENT}
                        refreshQuery={GET_SUBDEPARTMENTS}
                        variables={{ deleteSubDepartmentId: row.original.id }}
                    />
                </div>
            );
        },
    },
];

export function List() {
    const { data } = useSuspenseQuery(GET_SUBDEPARTMENTS);

    return (
        <>
            <div className="relative flex justify-end gap-4 px-4 lg:px-6">
                <CreateUser />
            </div>
            <DataTable data={data.getSubDepartments || []} columns={columns} />
        </>
    );
}
