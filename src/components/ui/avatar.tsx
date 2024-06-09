"use client";

import { cn } from "@/lib/tailwindUtil";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { type ComponentPropsWithRef, type FunctionComponent } from "react";

const Avatar: FunctionComponent<ComponentPropsWithRef<typeof AvatarPrimitive.Root>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<AvatarPrimitive.Root
		ref={reference}
		className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
		{...properties}
	/>
);

const AvatarImage: FunctionComponent<ComponentPropsWithRef<typeof AvatarPrimitive.Image>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<AvatarPrimitive.Image ref={reference} className={cn("aspect-square h-full w-full", className)} {...properties} />
);

const AvatarFallback: FunctionComponent<ComponentPropsWithRef<typeof AvatarPrimitive.Fallback>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<AvatarPrimitive.Fallback
		ref={reference}
		className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)}
		{...properties}
	/>
);

export { Avatar, AvatarFallback, AvatarImage };
