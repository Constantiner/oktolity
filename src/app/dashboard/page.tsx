import { api } from "@/trpc/server";
import { Suspense, type FunctionComponent } from "react";
import { P, match } from "ts-pattern";

const StarsList: FunctionComponent = async () => {
	const stars = await api.stars.list();

	return match(stars)
		.with(P.nullish, () => null)
		.otherwise(stars => stars.map(star => <div key={star.id}>{star.name}</div>));
};

export default async function Dashboard(): Promise<JSX.Element> {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<Suspense fallback={<div>Loading...</div>}>
				<StarsList />
			</Suspense>
		</main>
	);
}
