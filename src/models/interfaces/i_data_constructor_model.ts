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

	/** Returns an array of all of the template types for the data constructor. */
	getArgTypes(): ITypeModel[];

	/** Returns the template type at the given index in the template type list*/
	getArgType(index: number): ITypeModel;
}
