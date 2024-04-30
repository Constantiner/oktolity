import "@/styles/globals.css";
import { Inter, Merriweather, Oswald, PT_Mono } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

const headerFont = Oswald({
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: "variable",
	style: "normal",
	variable: "--font-oktolity-header"
});

const bodyFont = Merriweather({
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: ["300", "400", "700", "900"],
	style: ["italic", "normal"],
	variable: "--font-oktolity-body"
});

const serviceFont = Inter({
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: "variable",
	style: "normal",
	variable: "--font-oktolity-service"
});

const monoFont = PT_Mono({
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: "400",
	style: "normal",
	variable: "--font-oktolity-mono"
});

export const metadata = {
	title: "Oktolity",
	description:
		"T3 Stack (Next.js, Typescript, tRPC, Prisma, Tailwind CSS, NextAuth.js) application to manage repositories, starred on GitHub",
	icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				className={cn(
					"min-h-screen bg-background font-body font-normal text-foreground antialiased",
					headerFont.variable,
					bodyFont.variable,
					monoFont.variable,
					serviceFont.variable
				)}
			>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}
