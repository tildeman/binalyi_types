import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { Block } from "blockly";

export type PrimitiveContextMenuMixin = typeof primitiveContextMenuMixin;

function debugModelCallback(block: Block & { getModel: () => ITypeModel }) {
	return function() {
		console.log(block.getModel());
	}
}

export const primitiveContextMenuMixin = {
	customContextMenu: function(this: Block & { getModel: () => ITypeModel }, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
		options.push({
			text: "Debug model",
			enabled: true,
			callback: debugModelCallback(this)
		});
	}
};