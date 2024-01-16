import { ITypeModel, TypeKind } from "./interfaces/i_type_model.js";
import { utils } from "blockly";

export class ObservableTypeModel implements ITypeModel {
	private id: string;
	private name: string;
	private kind: TypeKind;
	private typePlaceholders: string[];
	private shouldFireEvents: boolean;
	private listElementType: ITypeModel | undefined;
	private tupleElementTypes?: ITypeModel[];

	constructor (
		name: string,
		kind: TypeKind,
		typePlaceholders?: string[],
		listElementType?: ITypeModel,
		tupleElementTypes?: ITypeModel[],
		id?: string
	) {
		this.id = id ?? utils.idGenerator.genUid();
		this.name = name;
		this.kind = kind;
		this.shouldFireEvents = false;
		this.typePlaceholders = typePlaceholders || [];
		this.listElementType = listElementType;
		this.tupleElementTypes = tupleElementTypes;
	}

	setName(name: string): this {
		this.name = name;
		if (this.shouldFireEvents) {
			// TODO: trigger an event
		}
		return this;
	}

	getId(): string {
		return this.id;
	}

	getName(): string {
		return this.name;
	}

	getKind(): TypeKind {
		return this.kind;
	}

	getListElementType(): ITypeModel | undefined {
		return this.listElementType;
	}

	setListElementType(type: ITypeModel) {
		this.listElementType = type;
		return this;
	}

	getTupleElementTypes(): ITypeModel[] | undefined {
		return this.tupleElementTypes
	}

	getTypePlaceholders(): string[] {
		return this.typePlaceholders;
	}

	getTypePlaceholder(index: number): string {
		return this.typePlaceholders[index];
	}

	addTypePlaceholder(typePlaceholder: string): this {
		this.typePlaceholders.push(typePlaceholder);
		return this;
	}

	removeTypePlaceholder(typePlaceholder: string): this {
		const index = this.typePlaceholders.indexOf(typePlaceholder);
		if (index !== -1) {
			this.typePlaceholders.splice(index, 1);
		}
		return this;
	}

	setTypePlaceholder(...typePlaceholders: string[]): this {
		this.typePlaceholders = typePlaceholders;
		return this;
	}

	startPublishing(): void {
		this.shouldFireEvents = true;
	}

	stopPublishing(): void {
		this.shouldFireEvents = false;
	}
}

/**
 * For primitive types, use one of these built-in models.
 * These are not added into the type map.
 */
export const globalBaseModels = {
	INT: new ObservableTypeModel("Int", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_INT") as ITypeModel,
	INTEGER: new ObservableTypeModel("Integer", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_INTEGER") as ITypeModel,
	FLOAT: new ObservableTypeModel("Float", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_FLOAT") as ITypeModel,
	DOUBLE: new ObservableTypeModel("Double", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_DOUBLE") as ITypeModel,
	CHAR: new ObservableTypeModel("Char", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_CHAR") as ITypeModel,
	BOOL: new ObservableTypeModel("Bool", TypeKind.Primitive, undefined, undefined, undefined, "SPECIAL_BOOL") as ITypeModel,
	UNIT: new ObservableTypeModel("()", TypeKind.Tuple, undefined, undefined, [], "SPECIAL_UNIT") as ITypeModel
}