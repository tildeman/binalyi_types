import { Block } from "blockly";
import { ParentTypeBlock } from "../../types/block_variants.js";

export type CascadeUpdatesMixin = typeof cascadeUpdatesMixin;

export const cascadeUpdatesMixin = {
	updateParent: function(this: Block) {
		const parentBlock = this.getParent() as ParentTypeBlock | null;
		parentBlock?.updateType();
	}
}