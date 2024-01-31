import { IDataConstructorModel } from "./interfaces/i_data_constructor_model.js";
import { ITypeModel } from "./interfaces/i_type_model.js";
import { utils } from "blockly";

export class ObservableDataConstructorModel implements IDataConstructorModel {
	private id: string;
	private name: string;
	private parentType: ITypeModel;
	private argTypes: ITypeModel[];
	private shouldFireEvents: boolean;
	private typePlaceholders: Map<string, number>;

	/**
	 * @param name The name of the new data constructor.
	 * @param parentType The inherited type the new data constructor.
	 * @param argTypes The argument types the new data constructor.
	 * @param id The (optional) unique language-neutral ID for the data constructor.
	 */
	constructor(name: string, parentType: ITypeModel, argTypes: ITypeModel[], id?: string) {
		this.id = id ?? utils.idGenerator.genUid();
		this.name = name;
		this.parentType = parentType;
		this.argTypes = argTypes;
		this.shouldFireEvents = false;
		this.typePlaceholders = new Map();
	}

	/**
	 * @param name The human-readable name of the data constructor.
	 * @returns This data constructor model.
	 */
	setName(name: string): this {
		this.name = name;
		if (this.shouldFireEvents) {
			// TODO: Should fire an event here.
		}
		return this;
	}

	/**
	 * @returns The unique language-neutral ID for the data constructor.
	 */
	getId(): string {
		return this.id;
	}

	/**
	 * @returns The human-readable name of the data constructor.
	 */
	getName(): string {
		return this.name;
	}

	/**
	 * @returns The inherited type of the data constructor.
	 */
	getParentType(): ITypeModel {
		return this.parentType;
	}

	setParentType(newType: ITypeModel): this {
		this.parentType = newType;
		return this;
	}

	/**
	 * @returns An array of all of the template types in the template type list.
	 */
	getArgTypes(): ITypeModel[] {
		return this.argTypes;
	}

	setArgTypes(...argTypes: ITypeModel[]): this {
		this.argTypes.splice(0);
		return this.addArgTypes(...argTypes);
	}

	addArgTypes(...argTypes: ITypeModel[]): this {
		this.argTypes.push(...argTypes);
		return this;
	}

	/**
	 * @param index The index of the template type to return.
	 * @returns The template type at the given index in the template type list.
	 */
	getArgType(index: number): ITypeModel {
		return this.argTypes[index];
	}

	getTypePlaceholders(): string[] {
		const placeholders: string[] = [];
		this.typePlaceholders.forEach((value, key) => placeholders.push(key));
		return placeholders;
	}

	addTypePlaceholder(typePlaceholder: string): this {
		if (!this.typePlaceholders.has(typePlaceholder)) {
			this.typePlaceholders.set(typePlaceholder, 0);
		}
		const currentCount = this.typePlaceholders.get(typePlaceholder) || 0;
		this.typePlaceholders.set(typePlaceholder, currentCount + 1);
		return this;
	}

	removeTypePlaceholder(typePlaceholder: string): this {
		const currentCount = this.typePlaceholders.get(typePlaceholder) || 0;
		if (currentCount <= 1) this.typePlaceholders.delete(typePlaceholder);
		else this.typePlaceholders.set(typePlaceholder, currentCount - 1);
		return this;
	}

	setTypePlaceholders(...typePlaceholders: string[]): this {
		this.typePlaceholders.clear();
		typePlaceholders.forEach(value => this.addTypePlaceholder(value));
		return this;
	}

	/**
	 * Tells the data constructor model it should fire events.
	 *
	 * @internal
	 */
	startPublishing(): void {
		this.shouldFireEvents = true;
	}

	/**
	 * Tells the data constructor model it should not fire events.
	 *
	 * @internal
	 */
	stopPublishing(): void {
		this.shouldFireEvents = false;
	}
}
