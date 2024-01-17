import { GetModelBlock, ParentTypeBlock } from "../../../types/block_variants.js";
import { isPlaceholderBlock } from "../../../utilities/blocktype_filter.js";
import { globalBaseModels } from "../../../models/observable_type_model.js";
import { TupleBlock } from "../../types/tuple_block.js";

export type TupleUpdateTypeMixin = typeof tupleUpdateTypeMixin;

export const tupleUpdateTypeMixin = {
	updateType(this: TupleBlock, optTargetBlocks?: (GetModelBlock | null)[]) {
		const targetBlocks = optTargetBlocks || [];
		if (optTargetBlocks == undefined) {
			for (let i = 0; i < this.itemCount_; i++) {
				const currentBlock = this.getInputTargetBlock("ADD" + i);
				targetBlocks.push(currentBlock as GetModelBlock);
			}
		}
		const model = this.getModel();
		if (!model) throw new Error("The model was not initialized properly");
		model.setTypePlaceholder();
		model.setTupleElementTypes();

		for (const targetBlock of targetBlocks) {
			if (targetBlock) {
				model.addTupleElementTypes(targetBlock.getModel());
				targetBlock.getModel().getTypePlaceholders().forEach(function(value) {
					model.addTypePlaceholder(value);
				})
			}
			else {
				model.addTupleElementTypes(globalBaseModels.UNIT);
			}
		}

		this.updateParent();
	}
};