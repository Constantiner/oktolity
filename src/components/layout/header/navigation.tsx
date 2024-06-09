import { AuthButton } from "@/components/authButton";
import { auth } from "@/server/auth";
import { P, match } from "ts-pattern";
import { NavigationContent } from "./navigation/navigationContent";
import { ModeToggle } from "./themeToggle";

import type { JSX } from "react";

export async function Navigation(): Promise<JSX.Element> {
	const session = await auth();

	return (
		<div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
			{match(session)
				.with(P.nullish, () => null)
				.otherwise(session => (
					<NavigationContent session={session} />
				))}
			<AuthButton session={session} />
			<ModeToggle />
		</div>
	);
}
