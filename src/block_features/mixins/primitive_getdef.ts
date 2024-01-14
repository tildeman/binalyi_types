import { globalBaseModels } from "../../models/observable_type_model.js";
import { TypeWorkspaceSvg } from "../../types/workspace_extensions.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { PrimitiveBlock } from "../types/primitive_block.js";

export type PrimitiveGetDefMixin = typeof primitiveGetDefMixin;

export const primitiveGetDefMixin = {
	model_: globalBaseModels.INT as ITypeModel, // Defaults to int.

	getModel(this: PrimitiveBlock) {
		return this.model_;
	},

	getTargetWorkspace_(this: PrimitiveBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
};