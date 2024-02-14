import { globalBaseModels } from "../../models/observable_type_model.js";
import { PrimitiveBlock } from "../types/primitive_block.js";

export function primitiveInitialize(this: PrimitiveBlock) {
	this.model_ = globalBaseModels.INT;
}