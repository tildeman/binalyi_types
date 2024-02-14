import { Block } from "blockly";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";

export type GetModelMixin = typeof getModelMixin;

export const getModelMixin = {
	model_: null as ITypeModel | null, // Defaults to null.

	getModel(this: Block & { model_: ITypeModel | null }) {
		return this.model_;
	}
};