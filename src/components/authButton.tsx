"use client";

import { LogIn } from "lucide-react";
import type { Session } from "next-auth";
import { signIn, type SignInResponse } from "next-auth/react";
import type { FunctionComponent } from "react";
import { P, match } from "ts-pattern";
import { Button } from "./ui/button";

export const AuthButton: FunctionComponent<{ session: Session | null }> = ({ session }) =>
	match(session)
		.with(P.nullish, () => (
			<>
				<Button
					className="hidden md:inline-flex"
					size="lg"
					variant="outline"
					onClick={(): Promise<SignInResponse | undefined> => signIn("github", { callbackUrl: "/dashboard" })}
				>
					<LogIn className="size-[1.2rem]" />
					<span>Sign in</span>
				</Button>
				<Button
					className="md:hidden"
					size="icon"
					variant="outline"
					onClick={(): Promise<SignInResponse | undefined> => signIn("github", { callbackUrl: "/dashboard" })}
				>
					<LogIn className="size-[1.2rem]" />
					<span className="sr-only">"Sign in"</span>
				</Button>
			</>
		))
		.otherwise(() => null);
