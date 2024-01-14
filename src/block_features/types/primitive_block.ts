import { Block } from "blockly";
import { PrimitiveContextMenuMixin } from "../mixins/primitive_contextmenu.js";
import { PrimitiveUpdateTypeMixin } from "../mixins/primitive_updatetype.js";
import { PrimitiveOnChangeMixin } from "../mixins/primitive_onchange.js";
import { PrimitiveDefGetDefMixin } from "../mixins/primitive_dgd.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";

export type PrimitiveBlock = Block & IPrimitiveMutator;
interface IPrimitiveMutator extends PrimitiveOnChangeMixin, PrimitiveDefGetDefMixin, PrimitiveUpdateTypeMixin, PrimitiveContextMenuMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}