import { IDataConstructorModel } from "../../../models/interfaces/i_data_constructor_model.js";
import { DataConstructorBlock } from "../../types/dc_def_block.js";
import { TypeWorkspace } from "../../../types/workspace_extensions.js";

export type DataConstructorDefGetDefMixin = typeof dataConstructorDefGetDefMixin;

export const dataConstructorDefGetDefMixin = {
	model_: null as IDataConstructorModel | null,

	/**
	 * Returns the data model for this data constructor block.
	 * 
	 * @returns The data model for this data constructor block.
	 */
	getDataConstructorModel(this: DataConstructorBlock) {
		return this.model_;
	},

	getPlaceholderTypes(this: DataConstructorBlock) {
		return this.getDataConstructorModel()!
			.getArgTypes()
			.map(model => model.getName());
	},

	getPlaceholderTypeModels(this: DataConstructorBlock) {
		return this.getDataConstructorModel()!.getArgTypes();
	},

	destroy(this: DataConstructorBlock) {
		const dataConsModelId = this.getDataConstructorModel()?.getId();
		if (dataConsModelId){
			(this.workspace as TypeWorkspace)
				.getDataTypeMap()
				.getDataConsMap()
				.delete(dataConsModelId);
		}
	}
}