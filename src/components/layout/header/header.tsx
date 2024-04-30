import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header(): JSX.Element {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-stretch">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
}
