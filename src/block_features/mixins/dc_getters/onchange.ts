import { Events } from "blockly";
import { DataConstructorGetBlock } from "../../types/dc_get_block.js";
import { isDataConsChange } from "../../../utilities/event_filter.js";

export type DataConstructorGetOnChangeMixin = typeof dataConstructorGetOnChangeMixin;

export const dataConstructorGetOnChangeMixin = {
	onchange(this: DataConstructorGetBlock, p1: Events.Abstract) {
		const dataConsId = this.getDataConstructorModel()?.getId();
		if (!isDataConsChange(p1)) return; // Not the event we want
		if (p1.datacons.getId() === dataConsId) {
			this.updateShape_(p1.datacons.getName());
		}
	}
};