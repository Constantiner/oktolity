export { auth as middleware } from "./server/auth";

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
