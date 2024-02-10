import { Events } from "blockly";
import { DataConstructorGetBlock } from "../../types/dc_get_block.js";
import { isDataConsChange, isDataConsDelete, isTypeDelete } from "../../../utilities/event_filter.js";

export type DataConstructorGetOnChangeMixin = typeof dataConstructorGetOnChangeMixin;

export const dataConstructorGetOnChangeMixin = {
	onchange(this: DataConstructorGetBlock, p1: Events.Abstract) {
		const dataConsId = this.getDataConstructorModel()?.getId();
		const typeId = this.getDataConstructorModel()?.getParentType().getId();
		if ((isDataConsDelete(p1) && p1.datacons.getId() === dataConsId) || (isTypeDelete(p1) && p1.type_.getId() === dataConsId)) {
			this.isolate();
			this.dispose(false);
		}
		if (!isDataConsChange(p1)) return; // Not the event we want
		if (p1.datacons.getId() === dataConsId) {
			this.updateShape_(p1.datacons.getName());
		}
	}
};