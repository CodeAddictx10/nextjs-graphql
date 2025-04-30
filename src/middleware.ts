import { auth } from "@/auth";
import { NextRequest } from "next/server";

const onlyGuest = ["/"];

export default auth((req: NextRequest & { auth: unknown }) => {
    if (req.auth && onlyGuest.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/departments", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }

    if (!req.auth && !onlyGuest.includes(req.nextUrl.pathname)) {
        const newUrl = new URL("/login", req.nextUrl.origin);
        return Response.redirect(newUrl);
    }
});

export const config = {
    matcher: ["/", "/departments", "/sub-departments"],
};
