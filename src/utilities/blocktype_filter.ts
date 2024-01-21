import { Block } from "blockly";
import { PlaceholderBlock } from "../block_features/types/placeholder_block.js";
import { PrimitiveBlock } from "../block_features/types/primitive_block.js";
import { TupleBlock } from "../block_features/types/tuple_block.js";
import { ListBlock } from "../block_features/types/list_block.js";
import { GetModelBlock } from "../types/block_variants.js";

export function isPrimitiveBlock(block: Block): block is PrimitiveBlock {
	return block.type == "types_primitive";
}

export function isPlaceholderBlock(block: Block): block is PlaceholderBlock {
	return block.type == "types_placeholder";
}

export function isListBlock(block: Block): block is ListBlock {
	return block.type == "types_list";
}

export function isTupleBlock(block: Block): block is TupleBlock {
	return block.type == "types_tuple";
}

export function isGetModelBlock(block: Block | null | undefined): block is GetModelBlock {
	if (!block) return false;
	return ("getModel" in block) && (block.getModel != null) && (block.getModel != undefined);
}