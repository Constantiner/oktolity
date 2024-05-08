import { AuthButton } from "@/components/authButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/server/auth";
import type { Session } from "next-auth";
import type { FunctionComponent } from "react";
import { P, match } from "ts-pattern";
import { LogOutItem } from "./navigation/logOutItem";
import { ModeToggle } from "./themeToggle";

const getAbbreviation = (name?: string | null): string =>
	match(name)
		.with(P.nullish, () => "")
		.otherwise(name =>
			name
				.split(/\s+/)
				.filter(word => word.length > 0)
				.map(word => word[0]?.toUpperCase())
				.join("")
		);

const UserAvatar: FunctionComponent<{ user: Session["user"]; className?: string }> = ({ user, className }) => (
	<Avatar aria-label={user.name ?? undefined} className={className}>
		<AvatarImage src={user.image ?? undefined} alt={user.name ?? undefined} />
		<AvatarFallback>{getAbbreviation(user.name)}</AvatarFallback>
	</Avatar>
);

export async function Navigation(): Promise<JSX.Element> {
	const session = await auth();

	return (
		<div className="flex flex-1 items-center justify-end gap-2 md:gap-3">
			{match(session)
				.with(P.nullish, () => null)
				.otherwise(session => (
					<Sheet>
						<SheetTrigger>
							<UserAvatar user={session.user} />
						</SheetTrigger>
						<SheetContent className="flex flex-col gap-1">
							<SheetHeader>
								<section className="flex w-full flex-col items-center gap-3 md:flex-row">
									<UserAvatar user={session.user} />
									<div className="flex w-full min-w-0 flex-col items-center md:items-start">
										<SheetTitle className="w-full min-w-0 truncate">{session.user.name}</SheetTitle>
										<SheetDescription className="w-full min-w-0 truncate">
											Have a good one!
										</SheetDescription>
									</div>
								</section>
							</SheetHeader>
							<Separator className="mt-4 md:hidden" />
							<LogOutItem className="md:mt-4" />
						</SheetContent>
					</Sheet>
				))}
			<AuthButton session={session} />
			<ModeToggle />
		</div>
	);
}
