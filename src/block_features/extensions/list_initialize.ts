import { ObservableTypeModel } from "../../models/observable_type_model.js";
import { TypeKind } from "../../models/interfaces/i_type_model.js";
import { ListBlock } from "../types/list_block.js";

export function listInitialize(this: ListBlock) {
	this.model_ = new ObservableTypeModel("UNNAMED_LIST", TypeKind.List);
}