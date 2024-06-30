import { selectInitialStateLoading } from "@/model/features/stars/starSlice";
import { useAppSelector } from "@/model/hooks";
import type { FunctionComponent } from "react";

export const Sidebar: FunctionComponent = () => {
	const isLoading = useAppSelector(selectInitialStateLoading);

	return <>{isLoading}</>;
};
