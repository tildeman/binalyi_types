import { Events } from "blockly";
import { isPrimitiveBlock } from "../../../utilities/blocktype_filter.js";
import { isBlockChange } from "../../../utilities/event_filter.js";
import { PrimitiveBlock } from "../../types/primitive_block.js";
import { PrimitiveTypes } from "./updatetype.js";

export type PrimitiveOnChangeMixin = typeof primitiveOnChangeMixin;

export const primitiveOnChangeMixin = {
	onchange(this: PrimitiveBlock, p1: Events.Abstract) {
		if (!isBlockChange(p1)) return; // Not a block change event
		if (p1.element != "field") return; // Not the element to respond to
		const block = this.workspace.getBlockById(p1.blockId || "");
		if (!block) return; // Block went into bitbucket
		if (!isPrimitiveBlock(block)) return; // Not the block we want
		const typeName = p1.newValue as PrimitiveTypes;
		block.updateType(typeName);
	}
};