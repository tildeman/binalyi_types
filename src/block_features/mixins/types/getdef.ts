import { TypeWorkspace, TypeWorkspaceSvg } from "../../../types/workspace_extensions.js";
import { ITypeModel } from "../../../models/interfaces/i_type_model.js";
import { TypeBlock } from "../../types/type_block.js";

export type TypeRefGetDefMixin = typeof typeRefGetDefMixin;

export const typeRefGetDefMixin = {
	model_: null as ITypeModel | null,

	getTypeModel(this: TypeBlock) {
		return this.model_;
	},

	findTypeModel(this: TypeBlock, name: string) {
		const workspace = this.getTargetWorkspace_();
		if (!workspace) return null;
		const types = [...workspace.getDataTypeMap().getTypeMap().values()];
		const model = types.find((type) => type.getName() === name);
		return model || null;
	},

	getTargetWorkspace_(this: TypeBlock): TypeWorkspace | null {
		if (this.workspace.isFlyout) {
			return (this.workspace as TypeWorkspaceSvg).targetWorkspace as TypeWorkspace | null;
		}
		return this.workspace;
	}
}