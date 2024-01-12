import { Block, Events } from "blockly";
import { PrimitiveBlock } from "../types/primitive_block.js";
import { PrimitiveTypes } from "./primitive_updatetype.js";

export type PrimitiveOnChangeMixin = typeof primitiveOnChangeMixin;

function isBlockChange(event: Events.Abstract): event is Events.BlockChange {
	return event.type == Events.BLOCK_CHANGE;
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
			const typeName: PrimitiveTypes = block.getFieldValue("TYPE");
			block.updateType(typeName);
		}
	}
};