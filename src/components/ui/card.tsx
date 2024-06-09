import { cn } from "@/lib/tailwindUtil";
import type { WithAsChild } from "@/lib/types/components/asChild";
import type { WithReferenceAttributes, WithReferenceProperties } from "@/lib/types/react/withReference";
import { cva, type VariantProps } from "class-variance-authority";
import { type FunctionComponent, type HTMLAttributes } from "react";
import { H3, P } from "./typography";

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

const Card: FunctionComponent<WithReferenceAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>> = ({
	ref: reference,
	className,
	variant,
	...properties
}) => <div ref={reference} className={cn(cardVariants({ variant, className }))} {...properties} />;

const CardHeader: FunctionComponent<WithReferenceProperties<HTMLDivElement, HTMLAttributes<HTMLDivElement>>> = ({
	ref: reference,
	className,
	...properties
}) => <div ref={reference} className={cn("flex flex-col space-y-1.5 p-6", className)} {...properties} />;

const CardTitle: FunctionComponent<
	WithReferenceProperties<HTMLParagraphElement, WithAsChild<HTMLAttributes<HTMLHeadingElement>>>
> = ({ ref: reference, className, asChild, ...properties }) => {
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
};

const CardDescription: FunctionComponent<WithReferenceAttributes<HTMLParagraphElement>> = ({
	ref: reference,
	className,
	...properties
}) => <P ref={reference} className={cn("text-sm text-muted-foreground", className)} {...properties} />;

const CardContent: FunctionComponent<WithReferenceAttributes<HTMLDivElement>> = ({
	ref: reference,
	className,
	...properties
}) => <div ref={reference} className={cn("p-6 pt-0", className)} {...properties} />;

const CardFooter: FunctionComponent<WithReferenceAttributes<HTMLDivElement>> = ({
	ref: reference,
	className,
	...properties
}) => <div ref={reference} className={cn("flex items-center p-6 pt-0", className)} {...properties} />;

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
