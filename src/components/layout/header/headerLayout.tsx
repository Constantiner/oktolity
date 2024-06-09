"use client";

import { cn } from "@/lib/tailwindUtil";
import { use, type FunctionComponent, type PropsWithChildren } from "react";
import { DashboardProviderContext } from "./dashboardProvider";

export const HeaderLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
	const { isDashboard } = use(DashboardProviderContext);
	return (
		<header
			className={cn(
				"group/dashboard sticky top-0 z-50 w-full border-b border-accent bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
				{
					dashboard: isDashboard
				}
			)}
		>
			<div className="container flex h-16 items-stretch group-[.dashboard]/dashboard:max-w-full">{children}</div>
		</header>
	);
};
