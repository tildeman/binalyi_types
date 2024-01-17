import { ITypeModel } from "../../../models/interfaces/i_type_model.js";
import { TypeWorkspaceSvg } from "../../../types/workspace_extensions.js";
import { TupleBlock } from "../../types/tuple_block.js";

export type TupleGetDefMixin = typeof tupleGetDefMixin;

export const tupleGetDefMixin = {
	model_: null as ITypeModel | null, // Defaults to null.

	getModel(this: TupleBlock) {
		return this.model_;
	},

	getTargetWorkspace_(this: TupleBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
};