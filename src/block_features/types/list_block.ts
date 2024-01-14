import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { ListGetDefMixin } from "../mixins/list_getdef.js";
import { ListOnChangeMixin } from "../mixins/list_onchange.js";
import { ListUpdateTypeMixin } from "../mixins/list_updatetype.js";

export type ListBlock = Block & IListMutator;
interface IListMutator extends ListGetDefMixin, ListOnChangeMixin, ListUpdateTypeMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}