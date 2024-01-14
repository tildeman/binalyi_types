import { Block, Events } from "blockly";
import { PrimitiveBlock } from "../types/primitive_block.js";
import { PrimitiveTypes } from "./primitive_updatetype.js";

export type PrimitiveOnChangeMixin = typeof primitiveOnChangeMixin;

function isBlockChange(event: Events.Abstract): event is Events.BlockChange {
	return event.type == Events.BLOCK_CHANGE;
}

function isBlockCreate(event: Events.Abstract): event is Events.BlockCreate {
	return event.type == Events.BLOCK_CREATE;
}

function isPrimitiveBlock(block: Block): block is PrimitiveBlock {
	return block.type == "types_primitive";
}

export const primitiveOnChangeMixin = {
	onchange(this: PrimitiveBlock, p1: Events.Abstract) {
		if (isBlockChange(p1)) {
			const block = this.workspace.getBlockById(p1.blockId || "");
			if (!block) return; // Block went into bitbucket
			if (!isPrimitiveBlock(block)) return; // Not the block we want
			const typeName = p1.newValue as PrimitiveTypes;
			block.updateType(typeName);
		}
		else if (isBlockCreate(p1)) {
			if (!p1.ids) return; // Malformed event
			for (const blockID of p1.ids) {
				const block = this.workspace.getBlockById(blockID);
				if (!block) continue; // Block went into bitbucket
				if (!isPrimitiveBlock(block)) continue; // Not the block we want
				if (!p1.json) continue; // No attached JSON, assume garbage
				block.updateType(p1.json.fields?.TYPE || "Int");
			}
		}
	}
};