import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { PlaceholderGetDefMixin } from "../mixins/placeholders/getdef.js";
import { PlaceholderUpdateTypeMixin } from "../mixins/placeholders/updatetype.js";
import { PlaceholderOnChangeMixin } from "../mixins/placeholders/onchange.js";
import { CascadeUpdatesMixin } from "../mixins/cascade_updates.js";

export type PlaceholderBlock = Block & IPlaceholderMutator;
interface IPlaceholderMutator extends PlaceholderGetDefMixin, PlaceholderUpdateTypeMixin, PlaceholderOnChangeMixin, CascadeUpdatesMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}