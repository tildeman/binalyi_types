import { TypeWorkspaceSvg } from "../../../types/workspace_extensions.js";
import { ITypeModel } from "../../../models/interfaces/i_type_model.js";
import { PlaceholderBlock } from "../../types/placeholder_block.js";

export type PlaceholderGetDefMixin = typeof placeholderGetDefMixin;

export const placeholderGetDefMixin = {
	model_: null as ITypeModel | null, // Defaults to empty string.

	getModel(this: PlaceholderBlock) {
		return this.model_;
	},

	getTargetWorkspace_(this: PlaceholderBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
};