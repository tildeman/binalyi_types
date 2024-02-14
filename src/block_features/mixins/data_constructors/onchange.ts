import { Events } from "blockly";
import { isBlockChange, isBlockMove } from "../../../utilities/event_filter.js";
import { parseInputName } from "../../../utilities/mutator_input_name_parser.js";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { DataConstructorChange } from "../../../events/dc_change.js";
import { isGetModelBlock } from "../../../utilities/blocktype_filter.js";
import { DataConstructorBlock } from "../../types/dc_def_block.js";

export type DataConstructorOnChangeMixin = typeof dataConstructorOnChangeMixin;

export const dataConstructorOnChangeMixin = {
	onchange(this: DataConstructorBlock, p1: Events.Abstract) {
		if (isBlockChange(p1) && p1.blockId === this.id && p1.name === "TYPE") {
			const newModel = this.workspace.getDataTypeMap().getTypeMap().get(p1.newValue as string);
			if (newModel) this.getDataConstructorModel()?.setParentType(newModel);
		}
		if (!isBlockMove(p1)) return; // Not the event we want
		if (!p1.blockId) return; // Not the response we want
		const model = this.getDataConstructorModel();
		if (!model) return; // Model is not initialized
		const typeModel = model.getParentType();
		const targetBlock = this.workspace.getBlockById(p1.blockId);
		const dataconstructorModelData = model.getArgTypes() || [];
		const connectCondition = p1.reason?.includes("connect") && p1.newParentId == this.id;
		const disconnectCondition = p1.reason?.includes("disconnect") && p1.oldParentId == this.id;
		if (!(connectCondition || disconnectCondition)) return;
		const inputName = connectCondition ? p1.newInputName : (disconnectCondition ? p1.oldInputName : "");
		const modelIndex = parseInputName(inputName || "", "DATA");
		if (isNaN(modelIndex)) return;
		if (isGetModelBlock(targetBlock)) {
			dataconstructorModelData[modelIndex] = connectCondition ? targetBlock.getModel() : globalBaseModels.UNIT;
			targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
				if (connectCondition) {
					model.addTypePlaceholder(value);
					typeModel.addTypePlaceholder(value);
				}
				else if (disconnectCondition) {
					model.removeTypePlaceholder(value);
					typeModel.removeTypePlaceholder(value);
				}
			});
		}
		else {
			dataconstructorModelData[modelIndex] = globalBaseModels.UNIT;
		}
		Events.fire(new DataConstructorChange(this.workspace, model, null));
	}
};