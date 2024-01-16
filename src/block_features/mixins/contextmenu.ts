import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { GetModelBlock } from "../../types/block_variants.js";

export type PrimitiveContextMenuMixin = typeof primitiveContextMenuMixin;

function debugModelCallback(block: GetModelBlock) {
	return function() {
		console.log(block.getModel());
	}
}

export const primitiveContextMenuMixin = {
	customContextMenu: function(this: GetModelBlock, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
		options.push({
			text: "Debug model",
			enabled: true,
			callback: debugModelCallback(this)
		});
	}
};