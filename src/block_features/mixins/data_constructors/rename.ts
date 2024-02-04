import { Events } from "blockly";
import { DataConstructorBlock } from "../../types/dc_def_block.js";
import { DataConstructorChangeReturn } from "../../../events/dc_change.js";

export type DataConstructorRenameMixin = typeof dataConstructorRenameMixin;

/** Mixin for renaming models in data constructors. */
export const dataConstructorRenameMixin = {
	renameDataConstructor: function(this: DataConstructorBlock, oldName: string, newName: string) {
		const model = this.getDataConstructorModel();
		if (!model) return;
		if (oldName === this.getFieldValue("NAME")) {
			model.setName(newName);
			Events.fire(new DataConstructorChangeReturn(this.workspace, model, null));
		}
	}
};