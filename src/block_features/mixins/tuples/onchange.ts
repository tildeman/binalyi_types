import { Events } from "blockly";
import { isBlockMove } from "../../../utilities/event_filter.js";
import { TupleBlock } from "../../types/tuple_block.js";
import { parseInputName } from "../../../utilities/mutator_input_name_parser.js";
import { GetModelBlock } from "../../../types/block_variants.js";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { isPlaceholderBlock } from "../../../utilities/blocktype_filter.js";

export type TupleOnChangeMixin = typeof tupleOnChangeMixin;

export const tupleOnChangeMixin = {
	onchange(this: TupleBlock, p1: Events.Abstract) {
		if (isBlockMove(p1)) {
			if (!p1.blockId) return; // Not the response we want
			const model = this.getModel();
			if (!model) return; // Model is not initialized
			const targetBlock = this.workspace.getBlockById(p1.blockId) as GetModelBlock;
			const tupleModelData = model.getTupleElementTypes() || [];
			if (p1.reason?.includes("connect") && p1.newParentId == this.id) {
				const modelIndex = parseInputName(p1.newInputName || "", "ADD");
				if (!isNaN(modelIndex)) {
					tupleModelData[modelIndex] = targetBlock.getModel();
					targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
						model.addTypePlaceholder(value);
					});
				}
			}
			else if (p1.reason?.includes("disconnect") && p1.oldParentId == this.id) {
				const modelIndex = parseInputName(p1.oldInputName || "", "ADD");
				if (!isNaN(modelIndex)) {
					tupleModelData[modelIndex] = globalBaseModels.UNIT;
					targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
						model.removeTypePlaceholder(value);
					});
				}
			}
		}

		this.updateParent();
	}
};