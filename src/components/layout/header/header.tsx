import { HeaderLayout } from "./headerLayout";
import { Logo } from "./logo";
import { Navigation } from "./navigation";

export function Header(): JSX.Element {
	return (
		<HeaderLayout>
			<Logo />
			<Navigation />
		</HeaderLayout>
	);
}
