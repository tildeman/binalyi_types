import { GetModelBlock, ParentTypeBlock } from "../../types/block_variants.js";
import { globalBaseModels } from "../../models/observable_type_model.js";
import { ListBlock } from "../types/list_block.js";

export type ListUpdateTypeMixin = typeof listUpdateTypeMixin;

export const listUpdateTypeMixin = {
	updateType(this: ListBlock, optTargetBlock?: GetModelBlock) {
		const targetBlock = optTargetBlock || this.getInputTargetBlock("SUBTYPE") as GetModelBlock | null;
		if (targetBlock) {
			this.getModel()?.setListElementType(targetBlock.getModel());
		}
		else {
			this.getModel()?.setListElementType(globalBaseModels.UNIT);
		}

		const parentBlock: ParentTypeBlock = this.getParent() as any;
		parentBlock?.updateType();
	}
};