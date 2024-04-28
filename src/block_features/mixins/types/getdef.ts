import { TypeKind } from "../../../models/interfaces/i_type_model.js";
import { ObservableTypeModel } from "../../../models/observable_type_model.js";
import { TypeBlock } from "../../types/type_block.js";

export type TypeRefGetDefMixin = typeof typeRefGetDefMixin;

export const typeRefGetDefMixin = {
	findTypeModel(this: TypeBlock, name: string) {
		const workspace = this.getTargetWorkspace_();
		if (!workspace) return null;
		const types = [...workspace.getDataTypeMap().getTypeMap().values()];
		const model = types.find((type) => type.getName() === name);
		if (!model) {
			const newModel = new ObservableTypeModel(
				name, TypeKind.UserDefined
			);
			workspace.getDataTypeMap().setTypeMap(newModel.getId(), newModel);
			return newModel;
		}
		return model;
	}
}