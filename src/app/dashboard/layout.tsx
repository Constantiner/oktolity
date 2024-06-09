import { StoreProvider } from "@/components/dashboard/storeProvider";
import type { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
	return <StoreProvider>{children}</StoreProvider>;
}