"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/tailwindUtil";
import { type DialogProps } from "@radix-ui/react-dialog";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { type ComponentPropsWithRef, type FunctionComponent, type HTMLAttributes } from "react";

const Command: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<CommandPrimitive
		ref={reference}
		className={cn(
			"flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
			className
		)}
		{...properties}
	/>
);

interface CommandDialogProperties extends DialogProps {}

const CommandDialog: FunctionComponent<CommandDialogProperties> = ({ children, ...properties }) => {
	return (
		<Dialog {...properties}>
			<DialogContent className="overflow-hidden p-0 shadow-lg">
				<Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:size-5">
					{children}
				</Command>
			</DialogContent>
		</Dialog>
	);
};

const CommandInput: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.Input>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<div className="flex items-center border-b px-3" cmdk-input-wrapper="">
		<Search className="mr-2 size-4 shrink-0 opacity-50" />
		<CommandPrimitive.Input
			ref={reference}
			className={cn(
				"flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
				className
			)}
			{...properties}
		/>
	</div>
);

const CommandList: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.List>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<CommandPrimitive.List
		ref={reference}
		className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
		{...properties}
	/>
);

const CommandEmpty: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.Empty>> = ({
	ref: reference,
	...properties
}) => <CommandPrimitive.Empty ref={reference} className="py-6 text-center text-sm" {...properties} />;

const CommandGroup: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.Group>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<CommandPrimitive.Group
		ref={reference}
		className={cn(
			"overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
			className
		)}
		{...properties}
	/>
);

const CommandSeparator: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.Separator>> = ({
	ref: reference,
	className,
	...properties
}) => <CommandPrimitive.Separator ref={reference} className={cn("-mx-1 h-px bg-border", className)} {...properties} />;

const CommandItem: FunctionComponent<ComponentPropsWithRef<typeof CommandPrimitive.Item>> = ({
	ref: reference,
	className,
	...properties
}) => (
	<CommandPrimitive.Item
		ref={reference}
		className={cn(
			"relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
			className
		)}
		{...properties}
	/>
);

const CommandShortcut: FunctionComponent<HTMLAttributes<HTMLSpanElement>> = ({ className, ...properties }) => {
	return <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...properties} />;
};

export {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut
};
