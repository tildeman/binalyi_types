import { Events } from "blockly";
import { isDataConsChange, isTypeDelete } from "../../../utilities/event_filter.js";
import { TypeBlock } from "../../types/type_block.js";

export type TypeGetOnChangeMixin = typeof typeGetOnChangeMixin;

export const typeGetOnChangeMixin = {
	onchange(this: TypeBlock, p1: Events.Abstract) {
		const model = this.getModel();
		if (this.disposed || this.workspace.isFlyout) return;
		if (!model) return;
		if (isTypeDelete(p1) && p1.type_.getId() === model.getId()) {
			this.isolate();
			this.dispose(false);
		}
		if (isDataConsChange(p1) && p1.datacons.getParentType().getId() === model.getId()) {
			this.updateShape_(model.getName() || "");
		}
	}
};