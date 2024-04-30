"use client";

import type { Session } from "next-auth";
import { signIn, signOut, type SignInResponse } from "next-auth/react";
import type { FunctionComponent } from "react";
import { Button } from "./ui/button";

export const AuthButton: FunctionComponent<{ session: Session | null }> = ({ session }): JSX.Element => {
	"use client";

	return (
		<Button
			size="lg"
			variant="outline"
			onClick={
				session ? (): Promise<void> => signOut() : (): Promise<SignInResponse | undefined> => signIn("github")
			}
		>
			{session ? "Sign out" : "Sign in"}
		</Button>
	);
};
