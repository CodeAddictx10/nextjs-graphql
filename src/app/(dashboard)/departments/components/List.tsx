"use client";
import { z } from "zod";
import { Suspense } from "react";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { TDepartment } from "@/types";
import EditUser from "./Edit";
import DeleteIcon from "@/components/shared/DeleteIcon";

interface Data {
    getDepartments: TDepartment[];
}

const QUERY: TypedDocumentNode<Data> = gql`
    query Query {
        getDepartments {
            id
            name
            subDepartments {
                id
                name
            }
        }
    }
`;

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

const columns: ColumnDef<z.infer<typeof schema>>[] = [
    {
        id: "index",
        header: "S/N",
        cell: ({ row }) => <div className="w-32">{row?.original?.id}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div className="w-32">{row?.original?.name}</div>,
    },
    {
        accessorKey: "subDepartment",
        header: "Sub Departments",
        cell: ({ row }) => (
            <div className="w-32">
                {row.original.subDepartments?.length ? (
                    <Badge
                        variant="outline"
                        className="text-muted-foreground p-2 gap-2">
                        {row.original.subDepartments.map((item) => (
                            <span
                                key={item.id}
                                className="after:content-[','] lowercase">
                                {item.name}
                            </span>
                        ))}
                    </Badge>
                ) : null}
            </div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: () => {
            return (
                <div className="inline-flex space-x-5">
                    <EditUser />
                    <DeleteIcon />
                </div>
            );
        },
    },
];

export function List() {
    const { data } = useSuspenseQuery(QUERY);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DataTable data={data.getDepartments || []} columns={columns} />
        </Suspense>
    );
}
