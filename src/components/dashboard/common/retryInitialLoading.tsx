"use client";

import { Button } from "@/components/ui/button";
import { initAction } from "@/model/features/stars/starActions";
import { useAppDispatch } from "@/model/hooks";
import type { FunctionComponent } from "react";

export const RetryInitialLoading: FunctionComponent = () => {
	const dispatch = useAppDispatch();

	return (
		<Button className="mt-2" variant="destructive" onClick={() => dispatch(initAction())}>
			Retry
		</Button>
	);
};
