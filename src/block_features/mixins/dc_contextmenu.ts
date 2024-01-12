import { ContextMenuOption, LegacyContextMenuOption } from "blockly/core/contextmenu_registry.js";
import { DataConstructorBlock } from "../types/dc_def_block.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { findLegalName, removeType } from "../../core.js";
import { Block } from "blockly";

// I want to call this a curried function, but this sounds like alien talk.
function deleteOptionCallback(block: DataConstructorBlock) {
	return function() {
		const workspace = block.workspace as TypeWorkspace;
		const typeName = block.getFieldValue("TYPE");
		removeType(workspace, typeName);
	}
}

function tmpFindNameFactory(block: Block) {
	return function() {
		const s = prompt("What do you want to call this block?");
		if (s) alert("The closest available name: " + findLegalName(s, block));
	}
}

export const dataConstructorContextMenuMixin = {
	customContextMenu: function(this: DataConstructorBlock, options: Array<ContextMenuOption | LegacyContextMenuOption>) {
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
	}
};