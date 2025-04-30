import NextAuth, { DefaultSession, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { loginRequest } from "./app/login/actions";
import { decodeToken } from "./lib/utils";

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: DefaultSession["user"];
        accessToken?: string;
        error?: "RefreshTokenError";
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await loginRequest(
                    credentials as unknown as {
                        username: string;
                        password: string;
                    },
                );

                // Check if we got a token from the login mutation
                if (!response?.login?.token) {
                    throw new Error("Invalid credentials.");
                }

                const decodedToken = decodeToken(response.login.token);

                if (!decodedToken || !decodedToken.sub) {
                    throw new Error("Invalid token structure");
                }

                return {
                    id: decodedToken.sub,
                    name: credentials.username,
                    token: response.login.token,
                } as User;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: { token: JWT; user: User }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,
                    name: user.name,
                    accessToken: (user as { token: string }).token,
                };
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.name = token.name as string;
                session.accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
});
