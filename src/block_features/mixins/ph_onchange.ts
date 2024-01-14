import { Block, Events } from "blockly";
import { isBlockChange, isBlockCreate } from "../../utilities/event_filter.js";
import { PlaceholderBlock } from "../types/placeholder_block.js";

export type PlaceholderOnChangeMixin = typeof placeholderOnChangeMixin;

function isPlaceholderBlock(block: Block): block is PlaceholderBlock {
	return block.type == "types_placeholder";
}

export const placeholderOnChangeMixin = {
	onchange(this: PlaceholderBlock, p1: Events.Abstract) {
		if (isBlockChange(p1)) {
			const block = this.workspace.getBlockById(p1.blockId || "");
			if (!block) return; // Block went into bitbucket
			if (!isPlaceholderBlock(block)) return; // Not the block we want
			const typeName = p1.newValue as string;
			block.updateType(typeName);
		}
		else if (isBlockCreate(p1)) {
			if (!p1.ids) return; // Malformed event
			for (const blockID of p1.ids) {
				const block = this.workspace.getBlockById(blockID);
				if (!block) continue; // Block went into bitbucket
				if (!isPlaceholderBlock(block)) continue; // Not the block we want
				if (!p1.json) continue; // No attached JSON, assume garbage
				block.updateType(p1.json.fields?.NAME);
			}
		}
	}
};