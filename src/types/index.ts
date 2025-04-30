export type TDepartment = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    subDepartments?: TSubDepartment[];
};

export type TSubDepartment = {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    department: TDepartment
};
