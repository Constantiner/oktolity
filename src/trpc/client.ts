"use client";

import { type AppRouter } from "@/server/api/root";
import { TRPCClientError, createTRPCClient, httpBatchLink } from "@trpc/client";
import { getBaseUrl } from "./util/baseUrl";
import superjson from "superjson";

export const isTRPCClientError = (cause: unknown): cause is TRPCClientError<AppRouter> =>
	cause instanceof TRPCClientError;

export const trpcClient = createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			transformer: superjson,
			url: getBaseUrl() + "/api/trpc",
			headers: () => {
				const headers = new Headers();
				headers.set("x-trpc-source", "nextjs-react");
				return headers;
			}
		})
	]
});
