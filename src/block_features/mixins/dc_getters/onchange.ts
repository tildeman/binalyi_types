import { Events } from "blockly";
import { DataConstructorGetBlock } from "../../types/dc_get_block.js";
import { isDataConsChange, isDataConsDelete } from "../../../utilities/event_filter.js";

export type DataConstructorGetOnChangeMixin = typeof dataConstructorGetOnChangeMixin;

export const dataConstructorGetOnChangeMixin = {
	onchange(this: DataConstructorGetBlock, p1: Events.Abstract) {
		if (isDataConsDelete(p1)) {
			this.isolate();
			this.dispose(false);
		}
		if (!isDataConsChange(p1)) return; // Not the event we want
		if (p1.datacons.getId() === this.getDataConstructorModel()?.getId()) {
			this.updateShape_(p1.datacons.getName());
		}
	}
};