import { Block } from "blockly";
import { PrimitiveContextMenuMixin } from "../mixins/primitive_contextmenu.js";
import { PrimitiveUpdateTypeMixin } from "../mixins/primitive_updatetype.js";
import { PrimitiveOnChangeMixin } from "../mixins/primitive_onchange.js";
import { PrimitiveGetDefMixin } from "../mixins/primitive_getdef.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";

export type PrimitiveBlock = Block & IPrimitiveMutator;
interface IPrimitiveMutator extends PrimitiveOnChangeMixin, PrimitiveGetDefMixin, PrimitiveUpdateTypeMixin, PrimitiveContextMenuMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}