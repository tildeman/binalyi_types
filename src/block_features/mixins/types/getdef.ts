import { TypeBlock } from "../../types/type_block.js";

export type TypeRefGetDefMixin = typeof typeRefGetDefMixin;

export const typeRefGetDefMixin = {
	findTypeModel(this: TypeBlock, name: string) {
		const workspace = this.getTargetWorkspace_();
		if (!workspace) return null;
		const types = [...workspace.getDataTypeMap().getTypeMap().values()];
		const model = types.find((type) => type.getName() === name);
		return model || null;
	}
}