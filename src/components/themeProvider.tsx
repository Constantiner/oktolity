"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...properties }: ThemeProviderProps): JSX.Element {
	return <NextThemesProvider {...properties}>{children}</NextThemesProvider>;
}
