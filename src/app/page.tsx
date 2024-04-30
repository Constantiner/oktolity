import { AuthButton } from "@/components/authButton";
import { CreatePost } from "@/components/createPost";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, H2, P } from "@/components/ui/typography";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function Home(): Promise<JSX.Element> {
	const hello = await api.post.hello({ text: "from tRPC" });
	const session = await getServerAuthSession();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<H1>
					Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
				</H1>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
					<Card>
						<CardHeader>
							<CardTitle asChild>
								<H2>First Steps →</H2>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<P>
								Just the basics - Everything you need to know to set up your database and
								authentication.
							</P>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href="https://create.t3.gg/en/usage/first-steps" target="_blank">
									Learn more
								</Link>
							</Button>
						</CardFooter>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle asChild>
								<H2>Documentation →</H2>
							</CardTitle>
						</CardHeader>
						<CardContent>
							<P>Learn more about Create T3 App, the libraries it uses, and how to deploy it.</P>
						</CardContent>
						<CardFooter>
							<Button asChild>
								<Link href="https://create.t3.gg/en/introduction" target="_blank">
									Learn more
								</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
				<div className="flex flex-col items-center gap-2">
					<P weight="normal" variant="muted" size="lg">
						{hello ? hello.greeting : "Loading tRPC query..."}
					</P>

					<div className="flex flex-col items-center justify-center gap-4">
						<P variant="secondary" size="sm" className="text-center">
							{session && <span>Logged in as {session.user?.name}</span>}
						</P>
						<AuthButton session={session} />
					</div>
				</div>

				<CrudShowcase />
			</div>
		</main>
	);
}

async function CrudShowcase(): Promise<JSX.Element | null> {
	const session = await getServerAuthSession();
	if (!session?.user) return null;

	const latestPost = await api.post.getLatest();

	return (
		<div className="w-full max-w-xs">
			{latestPost ? (
				<P className="truncate">Your most recent post: {latestPost.name}</P>
			) : (
				<P variant="muted">You have no posts yet.</P>
			)}

			<CreatePost />
		</div>
	);
}
