import { ParentTypeBlock } from "../../../types/block_variants.js";
import { PlaceholderBlock } from "../../types/placeholder_block.js";

export type PlaceholderUpdateTypeMixin = typeof placeholderUpdateTypeMixin;

export const placeholderUpdateTypeMixin = {
	updateType(this: PlaceholderBlock, newValue: string) {
		this.getModel()?.setName(newValue);

		// Blockly's types are stupid
		const parentBlock: ParentTypeBlock = this.getParent() as any;
		parentBlock?.updateType();
	}
};