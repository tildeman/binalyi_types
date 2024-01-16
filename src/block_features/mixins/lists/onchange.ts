import { Events } from "blockly";
import { isBlockMove } from "../../../utilities/event_filter.js";
import { ListBlock } from "../../types/list_block.js";

export type ListOnChangeMixin = typeof listOnChangeMixin;

export const listOnChangeMixin = {
	onchange(this: ListBlock, p1: Events.Abstract) {
		if (isBlockMove(p1) && ((p1.reason?.includes("connect") && p1.newParentId == this.id) || (p1.reason?.includes("disconnect") && p1.oldParentId == this.id))) {
			this.updateType();
		}
	}
};