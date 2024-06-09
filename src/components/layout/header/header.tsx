import { HeaderLayout } from "./headerLayout";
import { HeaderLogo } from "./headerLogo";
import { Navigation } from "./navigation";

import type { JSX } from "react";

export function Header(): JSX.Element {
	return (
		<HeaderLayout>
			<HeaderLogo />
			<Navigation />
		</HeaderLayout>
	);
}
