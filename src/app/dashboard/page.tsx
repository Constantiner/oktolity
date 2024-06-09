import { StarsList } from "@/components/dashboard/starsList";

import type { JSX } from "react";

export default async function Dashboard(): Promise<JSX.Element> {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<StarsList />
		</main>
	);
}
