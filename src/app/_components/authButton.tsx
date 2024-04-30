"use client";

import type { Session } from "next-auth";
import { signIn, signOut, type SignInResponse } from "next-auth/react";
import type { FunctionComponent } from "react";

export const AuthButton: FunctionComponent<{ session: Session | null }> = ({ session }): JSX.Element => {
	"use client";

	return (
		<button
			className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
			onClick={
				session ? (): Promise<void> => signOut() : (): Promise<SignInResponse | undefined> => signIn("github")
			}
		>
			{session ? "Sign out" : "Sign in"}
		</button>
	);
};
