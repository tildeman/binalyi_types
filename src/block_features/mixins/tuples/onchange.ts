import { Events } from "blockly";
import { parseInputName } from "../../../utilities/mutator_input_name_parser.js";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { isGetModelBlock } from "../../../utilities/blocktype_filter.js";
import { isBlockMove } from "../../../utilities/event_filter.js";
import { TupleBlock } from "../../types/tuple_block.js";

export type TupleOnChangeMixin = typeof tupleOnChangeMixin;

export const tupleOnChangeMixin = {
	onchange(this: TupleBlock, p1: Events.Abstract) {
		if (!isBlockMove(p1)) return;
		if (!p1.blockId) return; // Not the response we want
		const model = this.getModel();
		if (!model) return; // Model is not initialized
		const targetBlock = this.workspace.getBlockById(p1.blockId);
		const tupleModelData = model.getTupleElementTypes() || [];
		const connectCondition = p1.reason?.includes("connect") && p1.newParentId == this.id;
		const disconnectCondition = p1.reason?.includes("disconnect") && p1.oldParentId == this.id;
		const inputName = connectCondition ? p1.newInputName : (disconnectCondition ? p1.oldInputName : "");
		const modelIndex = parseInputName(inputName || "", "ADD");
		if (isNaN(modelIndex)) return;
		if (isGetModelBlock(targetBlock)) {
			tupleModelData[modelIndex] = connectCondition ? targetBlock.getModel() : globalBaseModels.UNIT;
			targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
				if (connectCondition) model.addTypePlaceholder(value);
				else if (disconnectCondition) model.removeTypePlaceholder(value);
			});
		}

		this.updateParent();
	}
};