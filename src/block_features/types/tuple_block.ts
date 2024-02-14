import { Block } from "blockly";
import { TupleUpdateTypeMixin } from "../mixins/tuples/updatetype.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { TupleTypeMutatorType } from "../mutators/product_type.js";
import { TupleOnChangeMixin } from "../mixins/tuples/onchange.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";
import { GetTargetWorkspaceMixin } from "../mixins/get_target_workspace.js";
import { GetModelMixin } from "../mixins/get_type_model.js";

export type TupleBlock = Block & ITupleMutator;
interface ITupleMutator
	extends GetModelMixin,
			TupleTypeMutatorType,
			TupleOnChangeMixin,
			TupleUpdateTypeMixin,
			CascadeUpdatesMixin,
			GetTargetWorkspaceMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}