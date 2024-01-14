import { Block, Events } from "blockly";
import { isBlockMove } from "../../utilities/event_filter.js";
import { ListBlock } from "../types/list_block.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { globalBaseModels } from "../../models/observable_type_model.js";

export type ListOnChangeMixin = typeof listOnChangeMixin;

export const listOnChangeMixin = {
	onchange(this: ListBlock, p1: Events.Abstract) {
		if (isBlockMove(p1)) {
			if (p1.reason?.includes("connect") && p1.newParentId == this.id) {
				if (!p1.blockId) return; // Malformed response
				const targetBlock = this.workspace.getBlockById(p1.blockId) as Block & { getModel: () => ITypeModel };
				this.getModel()?.setListElementType(targetBlock.getModel());
			}
			else if (p1.reason?.includes("disconnect") && p1.oldParentId == this.id) {
				this.getModel()?.setListElementType(globalBaseModels.UNIT);
			}
		}
	}
};