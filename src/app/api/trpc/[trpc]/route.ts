import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { environment } from "@/environment";
import { appRouter } from "@/server/api/root";
import { createTRPCContext, type TRPCContext } from "@/server/api/trpc";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (request: NextRequest): Promise<TRPCContext> =>
	createTRPCContext({
		headers: request.headers
	});

const handler = (request: NextRequest): Promise<Response> =>
	fetchRequestHandler({
		endpoint: "/api/trpc",
		req: request,
		router: appRouter,
		createContext: () => createContext(request),
		onError:
			environment.NODE_ENV === "development"
				? ({ path, error }): void => {
						// eslint-disable-next-line no-console
						console.error(`❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`);
					}
				: undefined
	});

export { handler as GET, handler as POST };
