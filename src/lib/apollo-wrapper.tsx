"use client";

import { HttpLink } from "@apollo/client";
import {
    ApolloNextAppProvider,
    ApolloClient,
    InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { setContext } from "@apollo/client/link/context";
import { useSession } from "next-auth/react";
import React, { useMemo } from "react";

export function ApolloWrapper({ children }: React.PropsWithChildren) {
    const { data: session, status } = useSession();

    const memoizedMakeClient = useMemo(() => {
        return () => {
            const httpLink = new HttpLink({
                uri: process.env.NEXT_PUBLIC_API_URL,
            });

            const authLink = setContext((_, { headers }) => {
                const token = session?.accessToken;
                return {
                    headers: {
                        ...headers,
                        authorization: token ? `Bearer ${token}` : "",
                    },
                };
            });

            return new ApolloClient({
                cache: new InMemoryCache(),
                link: authLink.concat(httpLink),
            });
        };
    }, [session?.accessToken]);

    if (status === "loading") return null;

    return (
        <ApolloNextAppProvider makeClient={memoizedMakeClient}>
            {children}
        </ApolloNextAppProvider>
    );
}
