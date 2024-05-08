import { environment } from "@/environment";
import { type NextAuthConfig, type Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
	debug: true,
	callbacks: {
		session: ({ session, token }): Session => ({
			...session,
			user: {
				...session.user,
				id: token.sub
			}
		}),
		authorized({ auth, request: { nextUrl } }): boolean | Response {
			const isLoggedIn = !!auth?.user;
			const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
			if (isOnDashboard) {
				if (isLoggedIn) {
					return true;
				}
				return Response.redirect(new URL("/", nextUrl));
			}
			return true;
		}
	},
	providers: [
		GitHubProvider({
			clientId: environment.GITHUB_ID,
			clientSecret: environment.GITHUB_SECRET,
			authorization: {
				params: { scope: "read:user,user:email,public_repo" }
			}
		})
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the GitHub provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	]
} satisfies NextAuthConfig;
