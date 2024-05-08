"use client";

import { useDashboardContext } from "@/components/layout/header/dashboardProvider";
import { usePathname } from "next/navigation";
import { type PropsWithChildren } from "react";

export default function RootTemplate({ children }: PropsWithChildren): JSX.Element {
	const pathname = usePathname();
	const isDashboard = pathname.startsWith("/dashboard");
	const { setIsDashboard } = useDashboardContext();
	if (setIsDashboard) {
		setIsDashboard(isDashboard);
	}
	return <>{children}</>;
}
