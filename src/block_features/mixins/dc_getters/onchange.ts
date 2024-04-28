import { Events } from "blockly";
import { DataConstructorGetBlock } from "../../types/dc_get_block.js";
import { isBlockCreate, isDataConsChange, isFinishedLoading } from "../../../utilities/event_filter.js";

export type DataConstructorGetOnChangeMixin = typeof dataConstructorGetOnChangeMixin;

export const dataConstructorGetOnChangeMixin = {
	evtCreatingThisAsPaste(this: DataConstructorGetBlock, event: Events.Abstract) {
		return (
			isBlockCreate(event) &&
			(event.blockId === this.id || event.ids?.indexOf(this.id) !== -1) &&
			// Record undo makes sure this is during paste.
			event.recordUndo
		);
	},

	onchange(this: DataConstructorGetBlock, p1: Events.Abstract) {
		const dataConsId = this.getDataConstructorModel()?.getId();
		if (isDataConsChange(p1) && p1.datacons.getId() === dataConsId) {
			this.updateShape_(p1.datacons.getName());
		}
		if (isFinishedLoading(p1) || this.evtCreatingThisAsPaste(p1)) {
			if (this.getDataConstructorModel()) return;
		}
	}
};