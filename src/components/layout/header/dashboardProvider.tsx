"use client";

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

export type DashboardContextProperties = {
	isDashboard: boolean;
	setIsDashboard?: Dispatch<SetStateAction<boolean>>;
};

export const DashboardProviderContext = createContext<DashboardContextProperties>({ isDashboard: false });

export const DashboardProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [isDashboard, setIsDashboard] = useState(false);

	return (
		<DashboardProviderContext.Provider value={{ isDashboard, setIsDashboard }}>
			{children}
		</DashboardProviderContext.Provider>
	);
};

export const useDashboardContext = (): DashboardContextProperties => {
	return useContext(DashboardProviderContext);
};
