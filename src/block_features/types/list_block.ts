import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { ListOnChangeMixin } from "../mixins/lists/onchange.js";
import { ListUpdateTypeMixin } from "../mixins/lists/updatetype.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";
import { GetTargetWorkspaceMixin } from "../mixins/get_target_workspace.js";
import { GetModelMixin } from "../mixins/get_type_model.js";

export type ListBlock = Block & IListMutator;
interface IListMutator
	extends GetModelMixin,
			ListOnChangeMixin,
			ListUpdateTypeMixin,
			CascadeUpdatesMixin,
			GetTargetWorkspaceMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}