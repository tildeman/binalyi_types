import { IDataConstructorModel } from "../../../models/interfaces/i_data_constructor_model.js";
import { TypeWorkspace } from "../../../types/workspace_extensions.js";
import { DataConstructorDelete } from "../../../events/dc_delete.js";
import { DataConstructorBlock } from "../../types/dc_def_block.js";
import { Events } from "blockly";

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
		const dataConsModel = this.getDataConstructorModel();
		if (dataConsModel) {
			const dcTypeModel = dataConsModel.getParentType()
			dataConsModel.getTypePlaceholders().forEach(function(tp) {
				dcTypeModel.removeTypePlaceholder(tp);
			});
			(this.workspace as TypeWorkspace)
				.getDataTypeMap()
				.getDataConsMap()
				.delete(dataConsModel.getId());
			Events.fire(new DataConstructorDelete(this.workspace, dataConsModel))
		}
	}
}