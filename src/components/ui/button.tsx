import { cn } from "@/lib/tailwindUtil";
import type { WithAsChild } from "@/lib/types/components/asChild";
import type { WithReferenceProperties } from "@/lib/types/react/withReference";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, FunctionComponent } from "react";

const buttonVariants = cva(
	"inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline"
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 rounded-md px-3",
				lg: "h-11 rounded-md px-8",
				icon: "size-10"
			},
			align: {
				start: "justify-start",
				center: "justify-center",
				end: "justify-end"
			}
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			align: "center"
		}
	}
);

export type ButtonProperties = WithAsChild<
	ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>
>;

const Button: FunctionComponent<WithReferenceProperties<HTMLButtonElement, ButtonProperties>> = ({
	ref: reference,
	className,
	variant,
	size,
	align,
	asChild = false,
	...properties
}) => {
	const Comp = asChild ? Slot : "button";
	return <Comp className={cn(buttonVariants({ variant, size, align, className }))} ref={reference} {...properties} />;
};

export { Button, buttonVariants };
