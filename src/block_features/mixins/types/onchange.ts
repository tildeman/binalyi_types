import { Events } from "blockly";
import { isDataConsChange, isDataConsDelete, isTypeDelete } from "../../../utilities/event_filter.js";
import { TypeBlock } from "../../types/type_block.js";

export type TypeGetOnChangeMixin = typeof typeGetOnChangeMixin;

export const typeGetOnChangeMixin = {
	onchange(this: TypeBlock, p1: Events.Abstract) {
		if (isTypeDelete(p1) && p1.type_.getId() === this.getTypeModel()?.getId()) {
			this.isolate();
			this.dispose(false);
		}
		if ((isDataConsChange(p1) || isDataConsDelete(p1)) && p1.datacons.getParentType().getId() === this.getTypeModel()?.getId()) {
			this.updateShape_(this.getTypeModel()?.getName() || "");
		}
	}
};