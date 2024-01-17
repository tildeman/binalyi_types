import { ObservableTypeModel } from "../../models/observable_type_model.js";
import { TypeKind } from "../../models/interfaces/i_type_model.js";
import { TupleBlock } from "../types/tuple_block.js";

export function tupleInitialize(this: TupleBlock) {
	this.model_ = new ObservableTypeModel("UNNAMED_TUPLE", TypeKind.Tuple, [], undefined, []);
}