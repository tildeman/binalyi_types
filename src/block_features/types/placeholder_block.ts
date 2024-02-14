import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { PlaceholderUpdateTypeMixin } from "../mixins/placeholders/updatetype.js";
import { PlaceholderOnChangeMixin } from "../mixins/placeholders/onchange.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";
import { GetTargetWorkspaceMixin } from "../mixins/get_target_workspace.js";
import { GetModelMixin } from "../mixins/get_type_model.js";

export type PlaceholderBlock = Block & IPlaceholderMutator;
interface IPlaceholderMutator
	extends	GetModelMixin,
			PlaceholderUpdateTypeMixin,
			PlaceholderOnChangeMixin,
			CascadeUpdatesMixin,
			GetTargetWorkspaceMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}