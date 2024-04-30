import { cn } from "@/lib/utils";
import { forwardRef, type HTMLAttributes } from "react";
import { H3, P } from "./typography";
import { cva, type VariantProps } from "class-variance-authority";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground shadow-sm", {
	variants: {
		variant: {
			default: "",
			borderless: "border-0"
		}
	},
	defaultVariants: {
		variant: "default"
	}
});

export type CardProperties = HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const Card = forwardRef<HTMLDivElement, CardProperties>(({ className, variant, ...properties }, reference) => (
	<div ref={reference} className={cn(cardVariants({ variant, className }))} {...properties} />
));
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...properties }, reference) => (
		<div ref={reference} className={cn("flex flex-col space-y-1.5 p-6", className)} {...properties} />
	)
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLHeadingElement> & {
		asChild?: boolean;
	}
>(({ className, asChild, ...properties }, reference) => {
	if (!asChild) {
		return (
			<H3
				ref={reference}
				className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
				{...properties}
			/>
		);
	}
	const { children, ...rest } = properties;
	return (
		<H3
			ref={reference}
			className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
			{...rest}
			asChild
		>
			{children}
		</H3>
	);
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...properties }, reference) => (
		<P ref={reference} className={cn("text-sm text-muted-foreground", className)} {...properties} />
	)
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...properties }, reference) => (
		<div ref={reference} className={cn("p-6 pt-0", className)} {...properties} />
	)
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...properties }, reference) => (
		<div ref={reference} className={cn("flex items-center p-6 pt-0", className)} {...properties} />
	)
);
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
