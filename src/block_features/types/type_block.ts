import { Block } from "blockly";
import { DisconnectBlocksMixin } from "../mixins/disconnect_blocks.js";
import { TypeContextMenuMixin } from "../mixins/types/contextmenu.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { TypeRefGetDefMixin } from "../mixins/types/getdef.js";
import { TypeMutatorType } from "../mutators/type.js";

export type TypeBlock = Block & ITypeMutator;
interface ITypeMutator extends TypeMutatorType, TypeRefGetDefMixin, TypeContextMenuMixin, DisconnectBlocksMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}