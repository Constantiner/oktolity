import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { forwardRef, type HTMLAttributes } from "react";
import { H3, P } from "./typography";

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
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

	const Comp = asChild ? Slot : H3;
	return (
		<Comp
			ref={reference}
			className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
			{...properties}
		/>
	);
});
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
	({ className, ...props }, ref) => (
		<P ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
	)
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
