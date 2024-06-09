"use client";

import { cn } from "@/lib/tailwindUtil";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { type ComponentPropsWithRef, type FunctionComponent, type HTMLAttributes, type JSX } from "react";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay: FunctionComponent<ComponentPropsWithRef<typeof SheetPrimitive.Overlay>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<SheetPrimitive.Overlay
		className={cn(
			"fixed inset-0 z-50 bg-black/80 backdrop-blur data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className
		)}
		{...properties}
		ref={reference}
	/>
);

const sheetVariants = cva(
	"fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
	{
		variants: {
			side: {
				top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
				bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
				left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
				right: "inset-y-0 right-0 h-full w-3/4  border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
			}
		},
		defaultVariants: {
			side: "right"
		}
	}
);

const SheetContent: FunctionComponent<
	ComponentPropsWithRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>
> = ({ ref: reference, side = "right", className, children, ...properties }) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content ref={reference} className={cn(sheetVariants({ side }), className)} {...properties}>
			{children}
			<SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
				<X className="size-4" />
				<span className="sr-only">Close</span>
			</SheetPrimitive.Close>
		</SheetPrimitive.Content>
	</SheetPortal>
);

const SheetHeader: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ className, ...properties }): JSX.Element => (
	<div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...properties} />
);

const SheetFooter: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ className, ...properties }) => (
	<div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...properties} />
);

const SheetTitle: FunctionComponent<ComponentPropsWithRef<typeof SheetPrimitive.Title>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<SheetPrimitive.Title
		ref={reference}
		className={cn("text-lg font-semibold text-foreground", className)}
		{...properties}
	/>
);

const SheetDescription: FunctionComponent<ComponentPropsWithRef<typeof SheetPrimitive.Description>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<SheetPrimitive.Description
		ref={reference}
		className={cn("text-sm text-muted-foreground", className)}
		{...properties}
	/>
);

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle,
	SheetTrigger
};
