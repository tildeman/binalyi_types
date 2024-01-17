import { Events } from "blockly";
import { isPlaceholderBlock } from "../../../utilities/blocktype_filter.js";
import { isBlockChange } from "../../../utilities/event_filter.js";
import { PlaceholderBlock } from "../../types/placeholder_block.js";

export type PlaceholderOnChangeMixin = typeof placeholderOnChangeMixin;

export const placeholderOnChangeMixin = {
	onchange(this: PlaceholderBlock, p1: Events.Abstract) {
		if (!isBlockChange(p1)) return;
		if (p1.blockId != this.id) return; // Block went into bitbucket
		const typeName = p1.newValue as string;
		this.updateType(typeName);
	}
};