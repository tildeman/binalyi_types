import { ITypeModel } from "../../../models/interfaces/i_type_model.js";
import { TypeWorkspaceSvg } from "../../../types/workspace_extensions.js";
import { TypeBlock } from "../../types/type_block.js";

export type TypeRefGetDefMixin = typeof typeRefGetDefMixin;

export const typeRefGetDefMixin = {
	model_: null as ITypeModel | null,

	getTypeModel(this: TypeBlock) {
		return this.model_;
	},

	findTypeModel(this: TypeBlock, name: string, placeholders: string[] = []) {
		const types = [...this.workspace.getDataTypeMap().getTypeMap().values()];
		const model = types.find((type) => type.getName() === name);

		if (!model) return null;

		return model;
	},

	getTargetWorkspace_(this: TypeBlock) {
		return this.workspace.isFlyout
			? (this.workspace as TypeWorkspaceSvg).targetWorkspace
			: this.workspace;
	},
}