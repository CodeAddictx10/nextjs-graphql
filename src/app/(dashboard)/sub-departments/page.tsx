import { Suspense } from "react";
import { List } from "./components/List";
import TableSkeletonLoader from "@/components/shared/TableLoader";

export default async function Page() {
    return (
        <Suspense fallback={<TableSkeletonLoader />}>
            <List />
        </Suspense>
    );
}
