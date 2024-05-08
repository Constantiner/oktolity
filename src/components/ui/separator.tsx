"use client";

import { cn } from "@/lib/tailwindUtil";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react";

const Separator = forwardRef<
	ElementRef<typeof SeparatorPrimitive.Root>,
	ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...properties }, reference) => (
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
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
