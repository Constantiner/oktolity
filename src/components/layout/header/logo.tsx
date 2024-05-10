import { H1 } from "@/components/ui/typography";
import Link from "next/link";
import type { FunctionComponent, SVGProps } from "react";

const LogoSvg: FunctionComponent<SVGProps<SVGSVGElement>> = properties => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...properties}>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="m25 0 25 12.5v25L25 50 0 37.5v-25Zm6.25 6.25 12.5 12.5v12.5l-12.5 12.5h-12.5l-12.5-12.5v-12.5l12.5-12.5Z"
		/>
	</svg>
);

export function Logo(): JSX.Element {
	return (
		<Link href="/" className="mr-2 flex items-center">
			<LogoSvg className="mr-1 size-8 md:size-10" />
			<H1 family="mono" className="select-none" size="sm">
				oktolity
			</H1>
		</Link>
	);
}
