import { ModeToggle } from "./themeToggle";

export async function Navigation(): Promise<JSX.Element> {
	return (
		<div className="flex flex-1 items-center justify-end gap-2">
			<ModeToggle />
		</div>
	);
}
