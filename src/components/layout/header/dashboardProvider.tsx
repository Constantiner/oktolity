"use client";

import { usePathname } from "next/navigation";
import {
	createContext,
	useLayoutEffect,
	useState,
	type Context,
	type Dispatch,
	type JSX,
	type PropsWithChildren,
	type SetStateAction
} from "react";

export type DashboardContextProperties = {
	isDashboard: boolean;
	setIsDashboard?: Dispatch<SetStateAction<boolean>>;
};

export const DashboardProviderContext: Context<DashboardContextProperties> = createContext<DashboardContextProperties>({
	isDashboard: false
});

export const DashboardProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [isDashboard, setIsDashboard] = useState(false);
	const pathname = usePathname();

	useLayoutEffect(() => {
		setIsDashboard(pathname.startsWith("/dashboard"));
	}, [pathname]);

	return <DashboardProviderContext value={{ isDashboard, setIsDashboard }}>{children}</DashboardProviderContext>;
};
