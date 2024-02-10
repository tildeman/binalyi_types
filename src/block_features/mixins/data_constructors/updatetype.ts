import { globalBaseModels } from "../../../models/observable_type_model.js";
import { DataConstructorChangeReturn } from "../../../events/dc_change.js";
import { ForceCapitalize } from "../../../utilities/force_capitalize.js";
import { isGetModelBlock } from "../../../utilities/blocktype_filter.js";
import { DataConstructorBlock } from "../../types/dc_def_block.js";
import { GetModelBlock } from "../../../types/block_variants.js";
import { Events } from "blockly";

export type DataConstructorTypes = ForceCapitalize<keyof typeof globalBaseModels>;
export type DataConstructorUpdateTypeMixin = typeof dataConstructorUpdateTypeMixin;

export const dataConstructorUpdateTypeMixin = {
	updateType(this: DataConstructorBlock) {
		const targetBlocks: (GetModelBlock | null)[] = [];
		for (let i = 0; i < this.itemCount_; i++) {
			const currentBlock = this.getInputTargetBlock("DATA" + i);
			if (!isGetModelBlock(currentBlock)) targetBlocks.push(null);
			else targetBlocks.push(currentBlock);
		}
		const model = this.getDataConstructorModel();
		if (!model) throw new Error("The model was not initialized properly");
		const typeModel = model.getParentType();
		model.setTypePlaceholders();
		typeModel.setTypePlaceholder();
		model.setArgTypes();

		for (const targetBlock of targetBlocks) {
			if (targetBlock) {
				model.addArgTypes(targetBlock.getModel());
				targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
					model.addTypePlaceholder(value);
					typeModel.addTypePlaceholder(value);
				});
			}
			else {
				model.addArgTypes(globalBaseModels.UNIT);
			}
		}
		Events.fire(new DataConstructorChangeReturn(this.workspace, model, null));
	}
};