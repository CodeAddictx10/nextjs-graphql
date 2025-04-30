import { TDepartment, TSubDepartment } from "@/types";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_DEPARTMENTS: TypedDocumentNode<{
    getDepartments: TDepartment[];
}> = gql`
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

export const CREATE_DEPARTMENT: TypedDocumentNode<{
    createDepartment: TDepartment;
}> = gql`
    mutation Mutation($createDepartmentInput: CreateDepartmentInput!) {
        createDepartment(createDepartmentInput: $createDepartmentInput) {
            id
        }
    }
`;

export const UPDATE_DEPARTMENT: TypedDocumentNode<{
    updateDepartment: TDepartment;
}> = gql`
    mutation Mutation($updateDepartmentInput: UpdateDepartmentInput!) {
        updateDepartment(updateDepartmentInput: $updateDepartmentInput) {
            id,
        }
    }
`;

export const DELETE_DEPARTMENT: TypedDocumentNode<{
    deleteDepartment: boolean;
}> = gql`
    mutation DeleteDepartment($deleteDepartmentId: Int!) {
        deleteDepartment(id: $deleteDepartmentId)
    }
`;

export const GET_SUBDEPARTMENTS: TypedDocumentNode<{
    getSubDepartments: TSubDepartment[];
}> = gql`
    query Query {
        getSubDepartments {
            id
            name
            createdAt
            updatedAt
            department {
                id
                name
            }
        }
    }
`;

export const CREATE_SUBDEPARTMENT: TypedDocumentNode<{
    createSubDepartment: TSubDepartment;
}> = gql`
    mutation Mutation($createSubDepartmentInput: CreateSubDepartmentInput!) {
        createSubDepartment(createSubDepartmentInput: $createSubDepartmentInput) {
            id
        }
    }
`;

export const UPDATE_SUBDEPARTMENT: TypedDocumentNode<{
    updateSubDepartment: TSubDepartment;
}> = gql`
    mutation Mutation($updateSubDepartmentInput: UpdateSubDepartmentInput!) {
        updateSubDepartment(updateSubDepartmentInput: $updateSubDepartmentInput) {
            id
        }
    }
`;

export const DELETE_SUBDEPARTMENT: TypedDocumentNode<{
    deleteDepartment: boolean;
}> = gql`
    mutation DeleteSubDepartment($deleteSubDepartmentId: Int!) {
        deleteSubDepartment(id: $deleteSubDepartmentId)
    }
`;