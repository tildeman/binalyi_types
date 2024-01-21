import { Block } from "blockly";
import { ParentTypeBlock } from "../../types/block_variants.js";

export type CascadeUpdatesMixin = typeof cascadeUpdatesMixin;

function isParentTypeBlock(block: Block | null): block is ParentTypeBlock {
	if (!block) return false;
	return ("updateType" in block) && (block.updateType != undefined) && (block.updateType != null);
}

export const cascadeUpdatesMixin = {
	updateParent: function(this: Block) {
		const parentBlock = this.getParent();
		if (isParentTypeBlock(parentBlock)) parentBlock.updateType();
	}
}