import { Separator } from "@/components/ui/separator";
import { H3, P } from "@/components/ui/typography";
import type { FunctionComponent } from "react";
import { FooterLogo } from "./footerLogo";

const STARTING_YEAR = 2024;

const getCopyrightYearsRange = (): string => {
	const currentYear = new Date().getFullYear();
	return currentYear > STARTING_YEAR ? `${STARTING_YEAR} - ${currentYear}` : `${STARTING_YEAR}`;
};

export const Footer: FunctionComponent = () => {
	return (
		<footer id="footer">
			<Separator className="mx-auto w-11/12" />

			<section className="container grid grid-cols-2 gap-x-12 gap-y-8 py-20 xl:grid-cols-4">
				<div className="col-span-full xl:col-span-2">
					<FooterLogo />
				</div>

				<div className="flex flex-col gap-2">
					<H3 size="sm">Follow Me</H3>
					<P spacing="none" size="sm" decoration="link" asChild>
						<a rel="noreferrer noopener" href="https://github.com/Constantiner" target="_blank">
							Github
						</a>
					</P>

					<P spacing="none" size="sm" decoration="link" asChild>
						<a rel="noreferrer noopener" href="https://www.linkedin.com/in/constantiner/" target="_blank">
							LinkedIn
						</a>
					</P>

					<P spacing="none" size="sm" decoration="link" asChild>
						<a
							rel="noreferrer noopener"
							href="https://www.upwork.com/freelancers/~01d3bd56967c09c3fa"
							target="_blank"
						>
							Upwork
						</a>
					</P>
				</div>

				<div className="flex flex-col gap-2">
					<H3 size="sm">Resources</H3>
					<P spacing="none" size="sm" decoration="link" asChild>
						<a rel="noreferrer noopener" href="https://github.com/Constantiner/oktolity" target="_blank">
							Source Code
						</a>
					</P>

					<P spacing="none" size="sm" decoration="link" asChild>
						<a
							rel="noreferrer noopener"
							href="https://github.com/Constantiner/oktolity/issues"
							target="_blank"
						>
							Report a Bug
						</a>
					</P>
				</div>
			</section>

			<section className="container pb-14 text-center">
				<P className="truncate" asChild>
					<h3>
						&copy; {getCopyrightYearsRange()}{" "}
						<a
							rel="noreferrer noopener"
							target="_blank"
							href="https://github.com/Constantiner"
							className="border-primary text-primary transition-all hover:border-b-2"
						>
							Konstantin Kovalev aka Constantiner
						</a>
					</h3>
				</P>
			</section>
		</footer>
	);
};
