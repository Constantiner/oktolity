import { AuthButton } from "@/components/authButton";
import { getServerAuthSession } from "@/server/auth";
import { ModeToggle } from "./themeToggle";

export async function Navigation(): Promise<JSX.Element> {
	const session = await getServerAuthSession();

	return (
		<div className="flex flex-1 items-center justify-end gap-2">
			<AuthButton session={session} />
			<ModeToggle />
		</div>
	);
}
