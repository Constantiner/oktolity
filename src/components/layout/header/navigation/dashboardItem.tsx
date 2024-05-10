"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import type { FunctionComponent, MouseEventHandler } from "react";
import { match } from "ts-pattern";
import { useDashboardContext } from "../dashboardProvider";

export const DashboardItem: FunctionComponent<{ className?: string; onClick?: MouseEventHandler<HTMLSpanElement> }> = ({
	className,
	onClick
}) => {
	const { isDashboard } = useDashboardContext();

	return match(isDashboard)
		.with(true, () => null)
		.otherwise(() => (
			<SheetClose asChild>
				<Button variant="ghost" align="start" className={className} asChild onClick={onClick}>
					<Link href="/dashboard" passHref>
						<LayoutDashboard className="size-4" />
						<span>Dashboard</span>
					</Link>
				</Button>
			</SheetClose>
		));
};
