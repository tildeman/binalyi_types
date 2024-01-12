import { TypeWorkspaceSvg } from "../../types/workspace_extensions.js";
import { TypeBlock } from "../../block_features/types/type_block.js";
import { globalBaseModels } from "../../models/observable_type_model.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";

export type PrimitiveDefGetDefMixin = typeof primitiveDefGetDefMixin;

export const primitiveDefGetDefMixin = {
	model_: globalBaseModels.INT as ITypeModel, // Defaults to int.

	getTargetWorkspace_(this: TypeBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
};