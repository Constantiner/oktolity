"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { NullableStrict } from "@/lib/types/nullable";
import { Separator } from "@radix-ui/react-separator";
import type { Session } from "next-auth";
import { useState, type FunctionComponent, type MouseEventHandler } from "react";
import { P, match } from "ts-pattern";
import { DashboardItem } from "./dashboardItem";
import { LogOutItem } from "./logOutItem";

const getAbbreviation = (name?: NullableStrict<string>): string =>
	match(name)
		.with(P.nullish, () => "")
		.otherwise(name =>
			name
				.split(/\s+/)
				.filter(word => word.length > 0)
				.map(word => word[0]?.toUpperCase())
				.join("")
		);

const UserAvatar: FunctionComponent<{
	user: Session["user"];
	className?: string;
	onClick?: MouseEventHandler<HTMLSpanElement>;
}> = ({ user, className, onClick }) => (
	<Avatar aria-label={user.name ?? undefined} className={className} onClick={onClick}>
		<AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
		<AvatarFallback>{getAbbreviation(user.name)}</AvatarFallback>
	</Avatar>
);

export const NavigationContent: FunctionComponent<{ session: Session }> = ({ session }) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger>
				<UserAvatar user={session.user} onClick={() => setIsOpen(true)} />
			</SheetTrigger>
			<SheetContent className="flex flex-col gap-1">
				<SheetHeader>
					<section className="flex w-full flex-col items-center gap-3 md:flex-row">
						<UserAvatar user={session.user} />
						<div className="flex w-full min-w-0 flex-col items-center md:items-start">
							<SheetTitle className="w-full min-w-0 truncate">{session.user.name}</SheetTitle>
							<SheetDescription className="w-full min-w-0 truncate">Have a good one!</SheetDescription>
						</div>
					</section>
				</SheetHeader>
				<Separator className="mt-4 md:hidden" />
				<DashboardItem className="md:mt-4" onClick={() => setIsOpen(false)} />
				<div className="flex-1"></div>
				<LogOutItem className="md:mt-4" />
			</SheetContent>
		</Sheet>
	);
};
