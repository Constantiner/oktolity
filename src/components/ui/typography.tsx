import { cn } from "@/lib/tailwindUtil";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type FunctionComponent, type HTMLAttributes, type PropsWithChildren } from "react";

const h1Variants = cva("mb-0 scroll-m-20 not-italic tracking-tight first:mt-0", {
	variants: {
		variant: {
			default: "font-bold text-foreground",
			muted: "font-black text-muted-foreground"
		},
		family: {
			service: "font-service",
			body: "",
			header: "font-header",
			mono: "font-mono"
		},
		size: {
			normal: "text-3xl md:text-4xl lg:text-5xl",
			lg: "text-4xl md:text-6xl lg:text-7xl"
		}
	},
	defaultVariants: {
		size: "normal",
		variant: "default",
		family: "header"
	}
});

export interface H1Properties extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof h1Variants> {
	asChild?: boolean;
}

export const H1 = forwardRef<HTMLHeadingElement, H1Properties>(
	({ className, asChild = false, variant, size, family, ...properties }, reference) => {
		const Comp = asChild ? Slot : "h1";
		return (
			<Comp className={cn(h1Variants({ variant, size, family, className }))} ref={reference} {...properties} />
		);
	}
);
H1.displayName = "H1";

const h2Variants = cva("mb-0 scroll-m-20 font-header not-italic tracking-tight transition-colors first:mt-0", {
	variants: {
		variant: {
			default: "font-semibold text-foreground",
			muted: "font-bold text-muted-foreground"
		},
		size: {
			normal: "text-2xl md:text-3xl lg:text-4xl",
			lg: "text-7xl"
		}
	},
	defaultVariants: {
		size: "normal",
		variant: "default"
	}
});

export interface H2Properties extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof h2Variants> {
	asChild?: boolean;
}

export const H2 = forwardRef<HTMLHeadingElement, H2Properties>(
	({ className, asChild = false, variant, size, ...properties }, reference) => {
		const Comp = asChild ? Slot : "h2";
		return <Comp className={cn(h2Variants({ variant, size, className }))} ref={reference} {...properties} />;
	}
);
H2.displayName = "H2";

const h3Variants = cva("mb-0 scroll-m-20 font-header not-italic tracking-tight transition-colors first:mt-0", {
	variants: {
		variant: {
			default: "font-semibold text-secondary-foreground",
			muted: "font-black text-muted-foreground"
		},
		size: {
			normal: "text-xl md:text-2xl lg:text-3xl",
			lg: "text-6xl"
		}
	},
	defaultVariants: {
		size: "normal",
		variant: "default"
	}
});

export interface H3Properties extends HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof h3Variants> {
	asChild?: boolean;
}

export const H3 = forwardRef<HTMLHeadingElement, H3Properties>(
	({ className, asChild = false, variant, size, ...properties }, reference) => {
		const Comp = asChild ? Slot : "h3";
		return <Comp className={cn(h3Variants({ variant, size, className }))} ref={reference} {...properties} />;
	}
);
H3.displayName = "H3";

export const H4: FunctionComponent<PropsWithChildren> = ({ children }) => {
	return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>;
};

export const pVariantsConfig = {
	variants: {
		variant: {
			normal: "not-italic",
			secondary: "not-italic text-secondary-foreground",
			muted: "not-italic text-muted-foreground",
			gray: "not-italic text-gray-500",
			error: "not-italic text-destructive"
		},
		size: {
			default: "text-sm md:text-base lg:text-lg",
			md: "text-base md:text-lg lg:text-xl",
			sm: "text-xs md:text-sm lg:text-base",
			xs: "text-xs md:text-xs lg:text-sm",
			lg: "text-lg md:text-xl lg:text-2xl tracking-tight",
			xl: "text-xl md:text-2xl lg:text-3xl",
			xxl: "text-5xl md:text-7xl"
		},
		weight: {
			default: "font-light",
			normal: "font-normal",
			bold: "font-bold",
			black: "font-black"
		},
		family: {
			service: "font-service",
			body: "",
			header: "font-header"
		},
		spacing: {
			default: "[&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6",
			none: "mt-0",
			tight: "[&:not(:first-child)]:mt-2 md:[&:not(:first-child)]:mt-3"
		}
	}
} as const;

const pVariants = cva("break-words leading-7", {
	...pVariantsConfig,
	defaultVariants: {
		variant: "normal",
		size: "default",
		family: "body",
		weight: "default",
		spacing: "default"
	}
});

export interface PProperties extends HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof pVariants> {
	asChild?: boolean;
}

export const P = forwardRef<HTMLParagraphElement, PProperties>(
	({ className, asChild = false, variant, size, family, weight, spacing, ...properties }, reference) => {
		const Comp = asChild ? Slot : "p";
		return (
			<Comp
				className={cn(pVariants({ variant, size, family, weight, spacing, className }))}
				ref={reference}
				{...properties}
			/>
		);
	}
);
P.displayName = "P";

const blockquoteVariants = cva("pl-4 italic lg:pl-6 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6", {
	variants: {
		variant: {
			default: "border-l-2",
			quoteMark: ""
		},
		size: {
			default: "text-sm md:text-base lg:text-lg",
			md: "text-base md:text-lg lg:text-xl",
			sm: "text-xs md:text-sm lg:text-base",
			lg: "text-lg tracking-tight md:text-xl lg:text-2xl",
			xl: "text-xl md:text-2xl lg:text-3xl",
			xxl: "text-5xl md:text-7xl"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});

export interface BlockquoteProperties
	extends HTMLAttributes<HTMLQuoteElement>,
		VariantProps<typeof blockquoteVariants> {
	asChild?: boolean;
}

export const Blockquote = forwardRef<HTMLQuoteElement, BlockquoteProperties>(
	({ className, asChild = false, variant, size, children, ...properties }, reference) => {
		const Comp = asChild ? Slot : "blockquote";
		return variant === "quoteMark" ? (
			<Comp className={cn(blockquoteVariants({ variant, size, className }))} ref={reference} {...properties}>
				<svg
					className="mb-2 block size-6 text-muted-foreground md:mb-3 md:size-7 lg:mb-4 lg:size-8"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 14"
				>
					<path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
				</svg>
				{children}
			</Comp>
		) : (
			<Comp className={cn(blockquoteVariants({ variant, className }))} ref={reference} {...properties}>
				{children}
			</Comp>
		);
	}
);
Blockquote.displayName = "Blockquote";

export const Code: FunctionComponent<PropsWithChildren> = ({ children }) => {
	return <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-normal">{children}</code>;
};
