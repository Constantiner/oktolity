// eslint-disable-next-line @typescript-eslint/ban-types
type MeaningfulType = string | number | boolean | symbol | bigint | object | Function;

/**
 * Makes type T as possible to accept null
 */
type NullableStrict<T extends MeaningfulType> = T | null;

/**
 * Makes type T as possible to accept undefined
 */
type Optional<T extends MeaningfulType> = T | undefined;

/**
 * Makes type T as possible to accept null and undefined
 */
type Nullable<T> = T | null | undefined;

type NotNullable<T> = T extends null | undefined ? never : T;
type NotNullableStrict<T> = T extends null ? never : T;
type NotUndefined<T> = T extends undefined ? never : T;

/**
 * Type guard to check is value not null.
 *
 * @template T Base non nullable type to extract
 * @param {Nullable<T>} nullable Is nullable type to check
 * @returns {nullable is T} If true it is pure T, null otherwise.
 */
const isNonNullableStrict = <T extends MeaningfulType | undefined>(nullable: Nullable<T>): nullable is T => {
	if (nullable === null) {
		return false;
	}
	return true;
};

/**
 * Type guard to check is value non nullable.
 *
 * @template T Base non nullable type to extract
 * @param {Nullable<T>} nullable Is nullable type to check
 * @returns {nullable is T} If true it is pure T, null or undefined otherwise.
 */
const isNonNullable = <T extends MeaningfulType>(nullable: Nullable<T>): nullable is T => {
	if (nullable === null || nullable === undefined) {
		return false;
	}
	return true;
};

/**
 * Type guard to check is value null.
 *
 * @template T Base non nullable type to extract
 * @param {Nullable<T>} nullable Is nullable type to check
 * @returns {(nullable is null)} If true it is null, pure T otherwise.
 */
const isNullableStrict = <T>(nullable: Nullable<T>): nullable is null => {
	if (nullable === null) {
		return true;
	}
	return false;
};

/**
 * Type guard to check is value nullable (null or undefined).
 *
 * @template T Base non nullable type to extract
 * @param {Nullable<T>} nullable Is nullable type to check
 * @returns {(nullable is null | undefined)} If true it is null or undefined, pure T otherwise.
 */
const isNullable = <T>(nullable: Nullable<T>): nullable is null | undefined => {
	if (nullable === null || nullable === undefined) {
		return true;
	}
	return false;
};

export type { Nullable, NullableStrict, NotNullable, NotNullableStrict, NotUndefined, MeaningfulType, Optional };
export { isNonNullable, isNonNullableStrict, isNullable, isNullableStrict };
