import { Block } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { ListGetDefMixin } from "../mixins/lists/getdef.js";
import { ListOnChangeMixin } from "../mixins/lists/onchange.js";
import { ListUpdateTypeMixin } from "../mixins/lists/updatetype.js";

export type ListBlock = Block & IListMutator;
interface IListMutator extends ListGetDefMixin, ListOnChangeMixin, ListUpdateTypeMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}