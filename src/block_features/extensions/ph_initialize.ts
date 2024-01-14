import { TypeKind } from "../../models/interfaces/i_type_model.js";
import { ObservableTypeModel } from "../../models/observable_type_model.js";
import { PlaceholderBlock } from "../types/placeholder_block.js";

export function placeholderInitialize(this: PlaceholderBlock) {
	const name: string = this.getFieldValue("NAME");
	this.model_ = new ObservableTypeModel(name, TypeKind.Placeholder);
}