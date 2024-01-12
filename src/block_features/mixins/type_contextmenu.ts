import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { TypeWorkspaceSvg } from "../../types/workspace_extensions.js";
import { TypeBlock } from "../types/type_block.js";
import { removeType } from "../../core.js";

export type TypeContextMenuMixin = typeof typeContextMenuMixin;

function deleteRenameOptionCallback(block: TypeBlock) {
	return function() {
		const workspace = block.workspace as TypeWorkspaceSvg;
		const typeName = ("typeName_" in block && typeof block.typeName_ == "string") ? block.typeName_ : "";
		removeType(workspace, typeName);
	}
}

export const typeContextMenuMixin = {
	customContextMenu: function(this: TypeBlock, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
		options.push({
			text: "Delete Type",
			enabled: true,
			callback: deleteRenameOptionCallback(this)
		});
	}
};