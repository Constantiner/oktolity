"use client";

import { usePathname } from "next/navigation";
import {
	createContext,
	useLayoutEffect,
	useState,
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction
} from "react";

export type DashboardContextProperties = {
	isDashboard: boolean;
	setIsDashboard?: Dispatch<SetStateAction<boolean>>;
};

export const DashboardProviderContext = createContext<DashboardContextProperties>({ isDashboard: false });

export const DashboardProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [isDashboard, setIsDashboard] = useState(false);
	const pathname = usePathname();

	useLayoutEffect(() => {
		setIsDashboard(pathname.startsWith("/dashboard"));
	}, [pathname]);

	return (
		<DashboardProviderContext.Provider value={{ isDashboard, setIsDashboard }}>
			{children}
		</DashboardProviderContext.Provider>
	);
};
