"use client";

import { getStars } from "@/model/features/stars/starActions";
import { selectIsStarsLoading, selectStarred, selectStarsErrorMessage } from "@/model/features/stars/starsSlice";
import { useAppDispatch, useAppSelector } from "@/model/hooks";
import { useEffect, type FunctionComponent } from "react";
import { P as Pattern, match } from "ts-pattern";
import { P } from "../ui/typography";

export const StarsList: FunctionComponent = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectIsStarsLoading);
	const stars = useAppSelector(selectStarred);
	const error = useAppSelector(selectStarsErrorMessage);

	useEffect(() => {
		dispatch(getStars());
	}, [dispatch]);

	return match(isLoading)
		.with(true, () => <P>Loading...</P>)
		.otherwise(() =>
			match(error)
				.with(Pattern.nullish, () => stars.map(star => <div key={star.id}>{star.name}</div>))
				.otherwise(error => <P variant="error">{error}</P>)
		);
};