import { Events } from "blockly";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { GetModelBlock } from "../../../types/block_variants.js";
import { isBlockMove } from "../../../utilities/event_filter.js";
import { ListBlock } from "../../types/list_block.js";
import { isGetModelBlock } from "../../../utilities/blocktype_filter.js";

export type ListOnChangeMixin = typeof listOnChangeMixin;

export const listOnChangeMixin = {
	onchange(this: ListBlock, p1: Events.Abstract) {
		if (isBlockMove(p1)) {
			if (!p1.blockId) return; // Not the response we want
			const targetBlock = this.workspace.getBlockById(p1.blockId);
			const model = this.getModel();
			if (!model) return; // Model is not yet available
			if (!isGetModelBlock(targetBlock)) {
				model.setListElementType(globalBaseModels.UNIT);
				this.updateParent();
				return;
			}
			if (p1.reason?.includes("connect") && p1.newParentId == this.id) {
				const targetModel = targetBlock.getModel();
				model.setListElementType(targetModel);
				targetModel.getTypePlaceholders().forEach(function(value) {
					model.addTypePlaceholder(value);
				});
			}
			else if (p1.reason?.includes("disconnect") && p1.oldParentId == this.id) {
				model.setListElementType(globalBaseModels.UNIT);
				model.setTypePlaceholder();
			}
		}

		this.updateParent();
	}
};