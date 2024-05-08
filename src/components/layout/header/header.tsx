import { cn } from "@/lib/tailwindUtil";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header({ className }: { className?: string }): JSX.Element {
	return (
		<header
			className={cn(
				"group/dashboard sticky top-0 z-50 w-full border-b border-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				className
			)}
		>
			<div className="container flex h-16 items-stretch group-[.dashboard]/dashboard:mx-1 group-[.dashboard]/dashboard:max-w-full">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
}
