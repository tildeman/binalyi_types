import { ITypeModel } from "./i_type_model.js";
import { IObservable } from "blockly";

export interface IDataConstructorModel extends IObservable {
	/** Sets the human-readable name of the data constructor. */
	setName(name: string): this;

	/** Returns the unique language-neutral ID for the data constructor. */
	getId(): string;

	/** Returns the human-readable name of the data constructor. */
	getName(): string;

	/** Returns the inherited type of the data constructor. */
	getParentType(): ITypeModel;

	/** Modifies the inherited type of the data constructor. */
	setParentType(newType: ITypeModel): this;

	/** Returns an array of all of the template types for the data constructor. */
	getArgTypes(): ITypeModel[];

	/** Sets an array of all of the template types for the data constructor. */
	setArgTypes(...argTypes: ITypeModel[]): this;

	/** Appends an array of all of the template types to the data constructor. */
	addArgTypes(...argTypes: ITypeModel[]): this;

	/** Returns the template type at the given index in the template type list */
	getArgType(index: number): ITypeModel;

	/** Returns an array of all of the type placeholders for the data constructor. */
	getTypePlaceholders(): string[];

	/** Sets an array of all of the type placeholders for the data constructor. */
	setTypePlaceholders(...typePlaceholders: string[]): this;

	/** Adds a type placeholder to the data constructor. */
	addTypePlaceholder(typePlaceholder: string): this;

	/** Removes a type placeholder from the data constructor. */
	removeTypePlaceholder(typePlaceholder: string): this;

}
