import { IDataConstructorModel } from "../../../models/interfaces/i_data_constructor_model.js";
import { DataConstructorGetBlock } from "../../types/dc_get_block.js";
import { TypeWorkspace, TypeWorkspaceSvg } from "../../../types/workspace_extensions.js";

export type DataConstructorCallerGetDefMixin = typeof dataConstructorCallerGetDefMixin;

export const dataConstructorCallerGetDefMixin = {
	model_: null as IDataConstructorModel | null,

	/**
	 * Returns the data model for this data constructor block.
	 * 
	 * @returns The data model for this data constructor block.
	 */
	getDataConstructorModel(this: DataConstructorGetBlock) {
		return this.model_;
	},

	findDataConsModel(this: DataConstructorGetBlock, name: string) {
		const workspace = this.getTargetWorkspace_();
		const models = workspace?.getDataTypeMap().getDataConsMap();
		if (!models) return null;
		const model = [...models.values()].find((datacons) => datacons.getName() === name);
		if (!model) return null;

		// No need to check, just being careless here
		return model;
	},

	getTargetWorkspace_(this: DataConstructorGetBlock): TypeWorkspace | null {
		if (this.workspace.isFlyout) {
			return (this.workspace as TypeWorkspaceSvg).targetWorkspace as TypeWorkspace | null;
		}
		return this.workspace;
	}
}