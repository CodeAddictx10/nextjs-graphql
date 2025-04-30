import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function decodeToken(token: string) {
    try {
        const decoded = jwtDecode(token);
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}
