import { Block } from "blockly";
import { TupleUpdateTypeMixin } from "../mixins/tuples/updatetype.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { TupleTypeMutatorType } from "../mutators/product_type.js";
import { TupleOnChangeMixin } from "../mixins/tuples/onchange.js";
import { TupleGetDefMixin } from "../mixins/tuples/getdef.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";

export type TupleBlock = Block & ITupleMutator;
interface ITupleMutator extends TupleGetDefMixin, TupleTypeMutatorType, TupleOnChangeMixin, TupleUpdateTypeMixin, CascadeUpdatesMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}