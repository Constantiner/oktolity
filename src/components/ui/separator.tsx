"use client";

import { cn } from "@/lib/tailwindUtil";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { type ComponentPropsWithRef, type FunctionComponent } from "react";

const Separator: FunctionComponent<ComponentPropsWithRef<typeof SeparatorPrimitive.Root>> = ({
	ref: reference,
	className,
	orientation = "horizontal",
	decorative = true,
	...properties
}) => (
	<SeparatorPrimitive.Root
		ref={reference}
		decorative={decorative}
		orientation={orientation}
		className={cn(
			"shrink-0 bg-border",
			orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
			className
		)}
		{...properties}
	/>
);

export { Separator };
