import { TypeKind } from "../../models/interfaces/i_type_model.js";
import { PlaceholderBlock } from "../types/placeholder_block.js";
import { ObservableTypeModel } from "../../index.js";

export function placeholderInitialize(this: PlaceholderBlock) {
	this.model_ = new ObservableTypeModel("", TypeKind.Placeholder);
}