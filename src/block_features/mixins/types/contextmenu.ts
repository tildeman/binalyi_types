import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { TypeBlock } from "../../types/type_block.js";
import { Events } from "blockly";
import { TypeDelete } from "../../../events/type_delete.js";

export type TypeContextMenuMixin = typeof typeContextMenuMixin;

function deleteRenameOptionCallback(block: TypeBlock) {
	return function() {
		const workspace = block.workspace;
		const typeModel = block.getTypeModel();
		if (!typeModel) return;
		const typeName = typeModel.getName();
		// removeType(workspace, typeName || "");
		Events.fire(new TypeDelete(workspace, typeModel));
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