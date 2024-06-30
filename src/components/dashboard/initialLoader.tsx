"use client";

import { initAction } from "@/model/features/stars/starActions";
import { useAppDispatch } from "@/model/hooks";
import { useEffect, type FunctionComponent, type PropsWithChildren } from "react";

export const InitialLoader: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(initAction());
	}, [dispatch]);

	return <>{children}</>;
};
