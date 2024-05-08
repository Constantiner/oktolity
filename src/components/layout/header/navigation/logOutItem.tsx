"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import type { FunctionComponent } from "react";

export const LogOutItem: FunctionComponent<{ className?: string }> = ({ className }) => (
	<SheetClose asChild>
		<Button onClick={(): Promise<void> => signOut()} className={className} variant="ghost" align="start">
			<LogOut className="size-4" />
			<span>Sign out</span>
		</Button>
	</SheetClose>
);
