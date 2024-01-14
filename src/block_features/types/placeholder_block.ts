import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { PlaceholderGetDefMixin } from "../mixins/ph_getdef.js";
import { PlaceholderUpdateTypeMixin } from "../mixins/ph_updatetype.js";
import { PlaceholderOnChangeMixin } from "../mixins/ph_onchange.js";

export type PlaceholderBlock = Block & IPlaceholderMutator;
interface IPlaceholderMutator extends PlaceholderGetDefMixin, PlaceholderUpdateTypeMixin, PlaceholderOnChangeMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}