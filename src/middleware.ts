import { auth } from "./server/auth";
import { NextResponse, type NextRequest } from "next/server";

export const middleware = auth((request: NextRequest) => {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("x-next-pathname", request.nextUrl.pathname);

	return NextResponse.next({
		request: {
			headers: requestHeaders
		}
	});
});

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	/*
	 * Match all request paths except for the ones starting with:
	 * - api (API routes)
	 * - _next/static (static files)
	 * - _next/image (image optimization files)
	 * - favicon.ico (favicon file)
	 */
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
