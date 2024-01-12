import { IDataConstructorModel } from "./i_data_constructor_model.js";
import { ITypeModel } from "./i_type_model.js";
import { IObservable } from "blockly";

export interface IDataTypeMap extends IObservable {
	/** Return the map of all types on the workpace. */
	getTypeMap(): Map<string, ITypeModel>;

	/** Adds the given TypeModel to the map of type models, so that blocks can find it. */
	setTypeMap(typeId: string, value: ITypeModel): void;

	/** Return the map of all data constructors on the workpace. */
	getDataConsMap(): Map<string, IDataConstructorModel>;

	/** Adds the given DataConstructorModel to the map of data constructor models, so that blocks can find it. */
	setDataConsMap(dataConsId: string, value: IDataConstructorModel): void;
}