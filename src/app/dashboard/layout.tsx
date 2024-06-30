import { InitialLoader } from "@/components/dashboard/initialLoader";
import { StoreProvider } from "@/components/dashboard/storeProvider";
import { type JSX, type PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren): JSX.Element {
	return (
		<StoreProvider>
			<InitialLoader>{children}</InitialLoader>
		</StoreProvider>
	);
}
