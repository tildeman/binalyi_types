/**
 * @fileoverview Backing global model for type maps.
 */

import { IDataConstructorModel } from "./interfaces/i_data_constructor_model.js";
import { IDataTypeMap } from "./interfaces/i_data_type_map.js";
import { ITypeModel } from "./interfaces/i_type_model.js";

export class ObservableDataTypeMap implements IDataTypeMap {
	readonly types: Map<string, ITypeModel>;
	readonly dataConstructors: Map<string, IDataConstructorModel>;

	constructor() {
		this.types = new Map<string, ITypeModel>();
		this.dataConstructors = new Map<string, IDataConstructorModel>();
	}

	getTypeMap() {
		return this.types;
	}
	setTypeMap(typeId: string, value: ITypeModel) {
		this.types.set(typeId, value);
	}

	getDataConsMap() {
		return this.dataConstructors;
	}
	setDataConsMap(dataConsId: string, value: IDataConstructorModel) {
		this.dataConstructors.set(dataConsId, value);
	}

	startPublishing(): void {
		// Nothing to start publishing (yet)
	}
	stopPublishing(): void {
		// Nothing to stop publishing (yet)
	}
}