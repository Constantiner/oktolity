"use client";

import { selectStarredRepositories } from "@/model/features/stars/starSelectors";
import { useAppSelector } from "@/model/hooks";
import { type FunctionComponent } from "react";
import { WithInitialLoading } from "./common/withInitialLoading";
import { match } from "ts-pattern";
import { P } from "../ui/typography";

export const StarsList: FunctionComponent = () => {
	const stars = useAppSelector(selectStarredRepositories);

	return (
		<WithInitialLoading>
			<>
				{match(stars.length)
					.with(0, () => <P>Not yet starred</P>)
					.otherwise(() => stars.map(star => <div key={star.id}>{star.name}</div>))}
			</>
		</WithInitialLoading>
	);
};
