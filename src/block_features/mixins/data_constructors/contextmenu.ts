import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { findLegalName } from "../../../utilities/find_legal_name.js";
import { DataConstructorBlock } from "../../types/dc_def_block.js";
import { removeType } from "../../../utilities/delete_type.js";
import { Block } from "blockly";

// I want to call this a curried function, but this sounds like alien talk.
function deleteOptionCallback(block: DataConstructorBlock) {
	return function() {
		const workspace = block.workspace;
		const typeModel = block.getDataConstructorModel()?.getParentType();
		if (!typeModel) return;
		removeType(workspace, typeModel.getId());
	}
}

function tmpFindNameFactory(block: Block) {
	return function() {
		const s = prompt("What do you want to call this block?");
		if (s) alert("The closest available name: " + findLegalName(s, block));
	}
}

function debugModelCallback(block: DataConstructorBlock) {
	return function() {
		console.log(block.getDataConstructorModel());
	}
}

export const dataConstructorContextMenuMixin = {
	customContextMenu: function(this: DataConstructorBlock, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
		if (this.isInFlyout) return;
		options.push({
			text: "Delete Type",
			enabled: true,
			callback: deleteOptionCallback(this)
		});
		options.push({
			text: "Find a Legal Name",
			enabled: true,
			callback: tmpFindNameFactory(this)
		});
		options.push({
			text: "Debug model",
			enabled: true,
			callback: debugModelCallback(this)
		});
	}
};