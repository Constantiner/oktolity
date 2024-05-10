import { AuthButton } from "@/components/authButton";
import { CreatePost } from "@/components/createPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, H2, P } from "@/components/ui/typography";
import { auth } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import type { FunctionComponent } from "react";
import { P as Pattern, match } from "ts-pattern";

export default async function Home(): Promise<JSX.Element> {
	const hello = await api.post.hello({ text: "from tRPC" });
	const session = await auth();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<H1>
					Create{" "}
					<span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent">
						T3
					</span>{" "}
					App
				</H1>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle asChild>
								<H2>First Steps →</H2>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1">
							<P>
								Just the basics - Everything you need to know to set up your database and
								authentication.
							</P>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href="https://create.t3.gg/en/usage/first-steps" target="_blank">
									Learn T3 Stack
								</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card className="flex flex-col">
						<CardHeader>
							<CardTitle asChild>
								<H2>Documentation →</H2>
							</CardTitle>
						</CardHeader>
						<CardContent className="flex-1">
							<P>Learn more about Create T3 App, the libraries it uses, and how to deploy it.</P>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href="https://create.t3.gg/en/introduction" target="_blank">
									Read Documentation
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
				<Card className="flex flex-col items-center gap-2" variant="borderless">
					<CardHeader>
						<CardTitle asChild>
							<H2>{hello ? hello.greeting : "Loading tRPC query..."}</H2>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<P variant="secondary" size="sm" className="text-center">
							{session && <span>Logged in as {session.user?.name}</span>}
						</P>
					</CardContent>
					<CardFooter>
						<AuthButton session={session} />
					</CardFooter>
				</Card>
				<CrudShowcase />
			</div>
		</main>
	);
}

const CrudShowcase: FunctionComponent = async () => {
	const session = await auth();
	return match(session)
		.with(Pattern.nullish, () => null)
		.otherwise(session =>
			match(session.user)
				.with(Pattern.nullish, () => null)
				.otherwise(async () => {
					const latestPost = await api.post.getLatest();

					return (
						<div className="w-full max-w-xs">
							{match(latestPost)
								.with(Pattern.nullish, () => <P variant="muted">You have no posts yet.</P>)
								.otherwise(latestPost => (
									<P className="truncate">Your most recent post: {latestPost.name}</P>
								))}
							<CreatePost />
						</div>
					);
				})
		);
};
