"use server";

import { signIn, signOut } from "@/auth";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";

type TLogin = {
    username: string;
    password: string;
};

type TLoginResponse = {
    login: {
        token: string
    }
}

export const login = async (
    formData: TLogin,
): Promise<{ error: boolean; message?: string }> => {
    try {
        await signIn("credentials", {
            ...formData,
            redirect: false,
        });
        return { error: false };
    } catch (error: unknown) {
        console.log((error as Error).message, "jddhjhdsdsksjk");

        return { error: true, message: (error as Error).message };
    }
};

export const loginRequest = async ({
    username,
    password,
}: TLogin): Promise<TLoginResponse> => {
    const LOGIN = gql`
        mutation login($payload: LoginInput!) {
            login(payload: $payload) {
                token
            }
        }
    `;

    const client = getClient();

    try {
        const { data } = await client.mutate({
            mutation: LOGIN,
            variables: { payload: { username, password } },
        });

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export async function logout() {
    await signOut();
    redirect("/");
}
