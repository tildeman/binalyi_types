import { Events } from "blockly";
import { isPlaceholderBlock } from "../../../utilities/blocktype_filter.js";
import { isBlockChange } from "../../../utilities/event_filter.js";
import { PlaceholderBlock } from "../../types/placeholder_block.js";

export type PlaceholderOnChangeMixin = typeof placeholderOnChangeMixin;

export const placeholderOnChangeMixin = {
	onchange(this: PlaceholderBlock, p1: Events.Abstract) {
		if (!isBlockChange(p1)) return;
		if (p1.element != "field") return; // Not the element to respond to.
		const block = this.workspace.getBlockById(p1.blockId || "");
		if (!block) return; // Block went into bitbucket
		if (!isPlaceholderBlock(block)) return; // Not the block we want
		const typeName = p1.newValue as string;
		block.updateType(typeName);
	}
};