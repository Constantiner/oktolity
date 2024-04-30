import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions, type Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import { environment } from "@/environment";
import { database } from "@/server/database";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions = {
	debug: true,
	callbacks: {
		session: ({ session, user }): Session => ({
			...session,
			user: {
				...session.user,
				id: user.id
			}
		})
	},
	adapter: PrismaAdapter(database),
	providers: [
		GitHubProvider({
			clientId: environment.GITHUB_ID,
			clientSecret: environment.GITHUB_SECRET,
			authorization: {
				params: { scope: "read:user,user:email" }
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
} satisfies NextAuthOptions;

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (): Promise<Session | null> => getServerSession(authOptions);
