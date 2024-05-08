/* eslint-disable security/detect-object-injection */
import { isNonNullable, type MeaningfulType, type Nullable } from "./types/nullable";

type DataKeysOfType<DataType, Type extends MeaningfulType> = {
	[Key in keyof DataType]: Required<DataType>[Key] extends Type ? Key : never;
}[keyof DataType];

type StringDataKeys<DataType> = DataKeysOfType<DataType, string>;

type DataComposer<DataType extends Record<string, MeaningfulType>> = {
	merge(data: DataType): DataComposer<DataType>;
	set<Fields extends keyof DataType>(field: Fields, value: Nullable<DataType[Fields]>): DataComposer<DataType>;
	setTransform<Fields extends keyof DataType, TypeToTransform extends MeaningfulType, Field extends Fields>(
		field: Field,
		value: Nullable<TypeToTransform>,
		transformer: (value: TypeToTransform) => DataType[Field]
	): DataComposer<DataType>;
	setString<Fields extends StringDataKeys<DataType>>(field: Fields, value: Nullable<string>): DataComposer<DataType>;
	setStringTransform<Type extends MeaningfulType, Fields extends DataKeysOfType<DataType, Type>>(
		field: Fields,
		value: Nullable<string>,
		transformer: (value: string) => Type
	): DataComposer<DataType>;
	get(): DataType;
};

export function createDataComposer<DataType extends Record<string, MeaningfulType>>(
	initialData: Readonly<DataType>
): DataComposer<DataType> {
	const data: DataType = { ...initialData };

	const composer: DataComposer<DataType> = {
		merge(newData): DataComposer<DataType> {
			Object.assign(data, newData);
			return composer;
		},
		set(field, value): DataComposer<DataType> {
			if (isNonNullable(value)) {
				data[field] = value;
			}
			return composer;
		},
		setTransform(field, value, transformer): DataComposer<DataType> {
			if (isNonNullable(value)) {
				data[field] = transformer(value);
			}
			return composer;
		},
		setString(field, value): DataComposer<DataType> {
			if (isNonNullable(value) && value.trim() !== "") {
				Object.assign(data, { [field]: value });
			}
			return composer;
		},
		setStringTransform(field, value, transformer): DataComposer<DataType> {
			if (isNonNullable(value) && value.trim() !== "") {
				Object.assign(data, { [field]: transformer(value) });
			}
			return composer;
		},
		get(): DataType {
			return data;
		}
	};
	return composer;
}
