import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex items-center justify-center h-screen">
            <Button variant={"outline"} type="submit" className="w-max" asChild>
                <Link href={"/login"}>Login to continue</Link>
            </Button>
        </div>
    );
}
