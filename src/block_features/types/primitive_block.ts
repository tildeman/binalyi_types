import { Block } from "blockly";
import { DebugTypeMenuMixin } from "../mixins/contextmenu.js";
import { PrimitiveUpdateTypeMixin } from "../mixins/primitives/updatetype.js";
import { PrimitiveOnChangeMixin } from "../mixins/primitives/onchange.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";
import { GetTargetWorkspaceMixin } from "../mixins/get_target_workspace.js";
import { GetModelMixin } from "../mixins/get_type_model.js";

export type PrimitiveBlock = Block & IPrimitiveMutator;
interface IPrimitiveMutator
	extends PrimitiveOnChangeMixin,
			GetModelMixin,
			PrimitiveUpdateTypeMixin,
			DebugTypeMenuMixin,
			CascadeUpdatesMixin,
			GetTargetWorkspaceMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}