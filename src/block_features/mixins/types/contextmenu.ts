import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { TypeBlock } from "../../types/type_block.js";
import { removeType } from "../../../utilities/delete_type.js";

export type TypeContextMenuMixin = typeof typeContextMenuMixin;

function deleteRenameOptionCallback(block: TypeBlock) {
	return function() {
		const workspace = block.workspace;
		const typeModel = block.getModel();
		if (!typeModel) return;
		removeType(workspace, typeModel.getId());
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