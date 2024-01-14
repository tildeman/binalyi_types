import { IObservable } from "blockly";

export enum TypeKind {
	Placeholder = 0,
	Primitive = 1,
	List = 2,
	Tuple = 3,
	UserDefined = 4,
};

export interface ITypeModel extends IObservable {
	setName(name: string): this;

	getId(): string;
	getName(): string;
	getKind(): TypeKind;

	getTypePlaceholders(): string[];
	getTypePlaceholder(index: number): string;

	addTypePlaceholder(typePlaceholder: string): this;
	removeTypePlaceholder(typePlaceholder: string): this;
	setTypePlaceholder(typePlaceholders: string[]): this;

	// list-specific properties
	getListElementType(): ITypeModel | undefined;
	setListElementType(type: ITypeModel): this;

	// tuple-specific properties
	getTupleElementTypes(): ITypeModel[] | undefined;
}
