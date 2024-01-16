import { Block } from "blockly";
import { PrimitiveContextMenuMixin } from "../mixins/contextmenu.js";
import { PrimitiveUpdateTypeMixin } from "../mixins/primitives/updatetype.js";
import { PrimitiveOnChangeMixin } from "../mixins/primitives/onchange.js";
import { PrimitiveGetDefMixin } from "../mixins/primitives/getdef.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";

export type PrimitiveBlock = Block & IPrimitiveMutator;
interface IPrimitiveMutator extends PrimitiveOnChangeMixin, PrimitiveGetDefMixin, PrimitiveUpdateTypeMixin, PrimitiveContextMenuMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}