import { database } from "@/server/database";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { authConfig } from "./authConfig";

export const { handlers, auth, signIn, signOut } = NextAuth({
	...authConfig,
	session: {
		strategy: "jwt"
	},
	adapter: PrismaAdapter(database)
});
