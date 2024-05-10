import { HeaderLayout } from "./headerLayout";
import { HeaderLogo } from "./headerLogo";
import { Navigation } from "./navigation";

export function Header(): JSX.Element {
	return (
		<HeaderLayout>
			<HeaderLogo />
			<Navigation />
		</HeaderLayout>
	);
}
