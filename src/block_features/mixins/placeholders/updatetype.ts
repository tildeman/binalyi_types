import { PlaceholderBlock } from "../../types/placeholder_block.js";

export type PlaceholderUpdateTypeMixin = typeof placeholderUpdateTypeMixin;

export const placeholderUpdateTypeMixin = {
	updateType(this: PlaceholderBlock, newValue: string) {
		this.getModel()?.setName(newValue);
		this.getModel()?.setTypePlaceholder(newValue);

		// Blockly's types are stupid
		this.updateParent();
	}
};