export type AsChild = {
	asChild?: boolean;
};

export type WithAsChild<Properties> = Properties & AsChild;
