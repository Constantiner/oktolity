import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { LogoSvg } from "../logoSvg";

import type { JSX } from "react";

export function HeaderLogo(): JSX.Element {
	return (
		<Link href="/" className="mr-2 flex items-center">
			<LogoSvg className="mr-1 size-8 md:size-10" />
			<H1 family="mono" className="select-none" size="sm">
				oktolity
			</H1>
		</Link>
	);
}
