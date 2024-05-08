import { H1 } from "@/components/ui/typography";
import Link from "next/link";

export function Logo(): JSX.Element {
	return (
		<H1 family="mono" className="mr-2 select-none self-center" asChild>
			<Link href="/">oktolity</Link>
		</H1>
	);
}
