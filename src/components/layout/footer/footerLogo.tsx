import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import { LogoSvg } from "../logoSvg";

import type { JSX } from "react";

export function FooterLogo(): JSX.Element {
	return (
		<Link href="/" className="flex items-center">
			<LogoSvg className="mr-1 size-6 md:size-8" />
			<H1 family="mono" className="select-none" size="xs">
				oktolity
			</H1>
		</Link>
	);
}
