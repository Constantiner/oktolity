import { Footer } from "@/components/layout/footer/footer";
import { DashboardProvider } from "@/components/layout/header/dashboardProvider";
import { Header } from "@/components/layout/header/header";
import { ThemeProvider } from "@/components/themeProvider";
import { cn } from "@/lib/tailwindUtil";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/react";
import { Fira_Sans, Inter, Merriweather, PT_Mono } from "next/font/google";
import type { PropsWithChildren, JSX } from "react";

const headerFont = Fira_Sans({
	subsets: ["cyrillic-ext", "latin-ext"],
	weight: ["300", "400", "700", "900"],
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

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</head>
			<body
				suppressHydrationWarning
				className={cn(
					"min-h-screen bg-background font-body font-normal text-foreground antialiased",
					headerFont.variable,
					bodyFont.variable,
					monoFont.variable,
					serviceFont.variable
				)}
			>
				<Analytics />
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					<TRPCReactProvider>
						<DashboardProvider>
							<div className="relative flex min-h-screen flex-col">
								<Header />
								<>{children}</>
								<Footer />
							</div>
						</DashboardProvider>
					</TRPCReactProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
