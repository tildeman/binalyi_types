import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { PrimitiveBlock } from "../types/primitive_block.js";

export type PrimitiveContextMenuMixin = typeof primitiveContextMenuMixin;

function debugModelCallback(block: PrimitiveBlock) {
	return function() {
		console.log(block.getModel());
	}
}

export const primitiveContextMenuMixin = {
	customContextMenu: function(this: PrimitiveBlock, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
		options.push({
			text: "Debug model",
			enabled: true,
			callback: debugModelCallback(this)
		});
	}
};