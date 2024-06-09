"use client";

import { cn } from "@/lib/tailwindUtil";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { type ComponentPropsWithRef, type FunctionComponent, type HTMLAttributes } from "react";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger: FunctionComponent<
	ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubTrigger> & {
		inset?: boolean;
	}
> = ({ ref: reference, className, inset, children, ...properties }) => (
	<DropdownMenuPrimitive.SubTrigger
		ref={reference}
		className={cn(
			"flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
			inset && "pl-8",
			className
		)}
		{...properties}
	>
		{children}
		<ChevronRight className="ml-auto size-4" />
	</DropdownMenuPrimitive.SubTrigger>
);

const DropdownMenuSubContent: FunctionComponent<ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<DropdownMenuPrimitive.SubContent
		ref={reference}
		className={cn(
			"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
			className
		)}
		{...properties}
	/>
);

const DropdownMenuContent: FunctionComponent<ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>> = ({
	ref: reference,
	className,
	sideOffset = 4,
	...properties
}) => (
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.Content
			ref={reference}
			sideOffset={sideOffset}
			className={cn(
				"z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className
			)}
			{...properties}
		/>
	</DropdownMenuPrimitive.Portal>
);

const DropdownMenuItem: FunctionComponent<
	ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
		inset?: boolean;
	}
> = ({ ref: reference, className, inset, ...properties }) => (
	<DropdownMenuPrimitive.Item
		ref={reference}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			inset && "pl-8",
			className
		)}
		{...properties}
	/>
);

const DropdownMenuCheckboxItem: FunctionComponent<ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>> = ({
	ref: reference,
	className,
	children,
	checked,
	...properties
}) => (
	<DropdownMenuPrimitive.CheckboxItem
		ref={reference}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		checked={checked}
		{...properties}
	>
		<span className="absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Check className="size-4" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.CheckboxItem>
);

const DropdownMenuRadioItem: FunctionComponent<ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>> = ({
	ref: reference,
	className,
	children,
	...properties
}) => (
	<DropdownMenuPrimitive.RadioItem
		ref={reference}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		{...properties}
	>
		<span className="absolute left-2 flex size-3.5 items-center justify-center">
			<DropdownMenuPrimitive.ItemIndicator>
				<Circle className="size-2 fill-current" />
			</DropdownMenuPrimitive.ItemIndicator>
		</span>
		{children}
	</DropdownMenuPrimitive.RadioItem>
);

const DropdownMenuLabel: FunctionComponent<
	ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean;
	}
> = ({ ref: reference, className, inset, ...properties }) => (
	<DropdownMenuPrimitive.Label
		ref={reference}
		className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
		{...properties}
	/>
);

const DropdownMenuSeparator: FunctionComponent<ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<DropdownMenuPrimitive.Separator
		ref={reference}
		className={cn("-mx-1 my-1 h-px bg-muted", className)}
		{...properties}
	/>
);

const DropdownMenuShortcut = ({ className, ...properties }: HTMLAttributes<HTMLSpanElement>): JSX.Element => {
	return <span className={cn("ml-auto text-xs tracking-widest opacity-60", className)} {...properties} />;
};

export {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
};
