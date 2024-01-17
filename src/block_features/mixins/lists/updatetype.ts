import { isPlaceholderBlock } from "../../../utilities/blocktype_filter.js";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { GetModelBlock } from "../../../types/block_variants.js";
import { ListBlock } from "../../types/list_block.js";
import { isTargetInput } from "blockly/core/browser_events.js";

export type ListUpdateTypeMixin = typeof listUpdateTypeMixin;

export const listUpdateTypeMixin = {
	updateType(this: ListBlock, optTargetBlock?: GetModelBlock | null) {
		const targetBlock = optTargetBlock || this.getInputTargetBlock("SUBTYPE") as GetModelBlock | null;
		const model = this.getModel();
		if (!model) throw new Error("The model was not initialized properly");
		model.setTypePlaceholder();
		if (targetBlock) {
			const targetModel = targetBlock.getModel();
			model.setListElementType(targetModel);
			targetModel.getTypePlaceholders().forEach(function(value) {
				model.addTypePlaceholder(value);
			});
		}
		else {
			model.setListElementType(globalBaseModels.UNIT);
		}

		this.updateParent();
	}
};