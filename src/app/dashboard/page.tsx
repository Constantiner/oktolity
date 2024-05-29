import { StarsList } from "@/components/dashboard/starsList";

export default async function Dashboard(): Promise<JSX.Element> {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<StarsList />
		</main>
	);
}
