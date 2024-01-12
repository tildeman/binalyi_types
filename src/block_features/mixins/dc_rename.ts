import { DataConstructorBlock } from "../types/dc_def_block.js";

export type DataConstructorRenameMixin = typeof dataConstructorRenameMixin;

/** Mixin for renaming models in data constructors. */
export const dataConstructorRenameMixin = {
	renameDataConstructor: function(this: DataConstructorBlock, oldName: string, newName: string) {
		if (oldName === this.getFieldValue("NAME")) {
			this.getDataConstructorModel()?.setName(newName);
		}
	}
};