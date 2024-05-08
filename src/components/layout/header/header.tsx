import { HeaderLayout } from "./headerLayout";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header(): JSX.Element {
	return (
		<HeaderLayout>
			<div className="container flex h-16 items-stretch group-[.dashboard]/dashboard:mx-1 group-[.dashboard]/dashboard:max-w-full">
				<Logo />
				<Navigation />
			</div>
		</HeaderLayout>
	);
}
