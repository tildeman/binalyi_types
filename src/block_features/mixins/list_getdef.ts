import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { TypeWorkspaceSvg } from "../../types/workspace_extensions.js";
import { ListBlock } from "../types/list_block.js";

export type ListGetDefMixin = typeof listGetDefMixin;

export const listGetDefMixin = {
	model_: null as ITypeModel | null, // Defaults to null.

	getModel(this: ListBlock) {
		return this.model_;
	},

	getTargetWorkspace_(this: ListBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
};