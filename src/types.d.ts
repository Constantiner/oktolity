import "next-auth";
import { type DefaultSession } from "next-auth";

declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		sub: string;
	}
}
