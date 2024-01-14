import { PrimitiveBlock } from "../types/primitive_block.js";
import { globalBaseModels } from "../../models/observable_type_model.js";
import { ForceCapitalize } from "../../utilities/force_capitalize.js";
import { toUpperCase } from "../../utilities/correct_uppercase.js";
import { ParentTypeBlock } from "../../types/block_variants.js";

export type PrimitiveTypes = ForceCapitalize<keyof typeof globalBaseModels>;
export type PrimitiveUpdateTypeMixin = typeof primitiveUpdateTypeMixin;

export const primitiveUpdateTypeMixin = {
	updateType(this: PrimitiveBlock, newValue: PrimitiveTypes) {
		this.model_ = globalBaseModels[toUpperCase(newValue)];

		const parentBlock: ParentTypeBlock = this.getParent() as any;
		parentBlock?.updateType();
	}
};