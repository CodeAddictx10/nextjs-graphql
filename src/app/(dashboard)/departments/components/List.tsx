"use client";
import { z } from "zod";
import { useSuspenseQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import EditDepartment from "./Edit";
import DeleteAction from "@/components/shared/DeleteAction";
import CreateUser from "./Create";
import { DELETE_DEPARTMENT, GET_DEPARTMENTS } from "@/lib/graphql.def";

export const schema = z.object({
    id: z.number(),
    name: z.string(),
    subDepartments: z
        .array(
            z.object({
                id: z.number(),
                name: z.string(),
            }),
        )
        .optional(),
});
export type TColumnDef = z.infer<typeof schema>;
const columns: ColumnDef<TColumnDef>[] = [
    {
        id: "index",
        header: "Department Id",
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
        accessorKey: "subDepartment",
        header: "Sub Departments",
        cell: ({ row }) => (
            <div className="flex overflow-x-auto scroll-pt-10 gap-2 max-w-xl">
                {row.original.subDepartments?.length ? (
                    row.original.subDepartments.map((item) => (
                        <Badge
                            variant="outline"
                            key={item.id}
                            className="text-muted-foreground p-2 gap-2">
                            <span className="capitalize">{item.name}</span>
                        </Badge>
                    ))
                ) : (
                    <p className="text-yellow-400 text-xs">
                        No subdepartment attached yet!
                    </p>
                )}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            return (
                <div className="inline-flex space-x-5">
                    <EditDepartment formData={row.original} />
                    <DeleteAction
                        deleteMutation={DELETE_DEPARTMENT}
                        refreshQuery={GET_DEPARTMENTS}
                        variables={{ deleteDepartmentId: row.original.id }}
                    />
                </div>
            );
        },
    },
];

export function List() {
    const { data } = useSuspenseQuery(GET_DEPARTMENTS);

    return (
        <>
            <div className="relative flex justify-end gap-4 px-4 lg:px-6">
                <CreateUser />
            </div>
            <DataTable data={data.getDepartments || []} columns={columns} />
        </>
    );
}
