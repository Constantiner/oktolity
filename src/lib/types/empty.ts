interface EmptyType {}

const isEmptyType = (value: unknown): value is EmptyType =>
	value !== undefined && value !== null && typeof value === "object" && Object.keys(value).length === 0;

export type { EmptyType };
export { isEmptyType };
