"use client";

import { P } from "@/components/ui/typography";
import { selectInitialStateLoading, selectInitialStateLoadingErrorMessage } from "@/model/features/stars/starSlice";
import { useAppSelector } from "@/model/hooks";
import type { FunctionComponent, PropsWithChildren } from "react";
import { P as Pattern, match } from "ts-pattern";
import { RetryInitialLoading } from "./retryInitialLoading";

export const WithInitialLoading: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const isLoading = useAppSelector(selectInitialStateLoading);
	const error = useAppSelector(selectInitialStateLoadingErrorMessage);

	return match(isLoading)
		.with(true, () => <P>Loading...</P>)
		.otherwise(() =>
			match(error)
				.with(Pattern.nullish, () => children)
				.otherwise(error => (
					<>
						<P variant="error">{error}</P>
						<RetryInitialLoading />
					</>
				))
		);
};
