"use client";

import { makeStore, type AppStore } from "@/model/store";
import { useRef, type FunctionComponent, type PropsWithChildren } from "react";
import { Provider } from "react-redux";

export const StoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const storeReference = useRef<AppStore | null>(null);

	if (!storeReference.current) {
		// Create the store instance the first time this renders
		storeReference.current = makeStore();
	}

	return <Provider store={storeReference.current}>{children}</Provider>;
};
