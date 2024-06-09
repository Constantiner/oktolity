import type { HTMLAttributes, RefObject } from "react";
import type { EmptyType } from "../empty";

export type WithReference<Reference> = {
	ref?: RefObject<Reference>;
};

export type WithReferenceProperties<Reference, Properties = EmptyType> = WithReference<Reference> & Properties;

export type WithReferenceAttributes<Reference extends HTMLElement> = {
	ref?: RefObject<Reference>;
} & HTMLAttributes<Reference>;
