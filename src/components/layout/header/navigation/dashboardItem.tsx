"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";
import type { FunctionComponent } from "react";
import { match } from "ts-pattern";
import { useDashboardContext } from "../dashboardProvider";

export const DashboardItem: FunctionComponent<{ className?: string }> = ({ className }) => {
	const { isDashboard } = useDashboardContext();
	const router = useRouter();

	return match(isDashboard)
		.with(true, () => null)
		.otherwise(() => (
			<SheetClose asChild>
				<Button variant="ghost" align="start" className={className} onClick={() => router.push("/dashboard")}>
					<LayoutDashboard className="size-4" />
					<span>Dashboard</span>
				</Button>
			</SheetClose>
		));
};
