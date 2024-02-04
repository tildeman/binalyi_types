import { Events } from "blockly";
import { DataConstructorChangeReturn } from "../events/dc_change.js";
import { DataConstructorDelete } from "../events/dc_delete.js";

export function isBlockChange(event: Events.Abstract): event is Events.BlockChange {
	return event.type == Events.BLOCK_CHANGE;
}

export function isBlockCreate(event: Events.Abstract): event is Events.BlockCreate {
	return event.type == Events.BLOCK_CREATE;
}

export function isBlockMove(event: Events.Abstract): event is Events.BlockMove {
	return event.type == Events.BLOCK_MOVE;
}

export function isBlockDelete(event: Events.Abstract): event is Events.BlockDelete {
	return event.type == Events.BLOCK_DELETE;
}

export function isDataConsChange(event: Events.Abstract): event is DataConstructorChangeReturn {
	return event.type == "dc_change";
}

export function isDataConsDelete(event: Events.Abstract): event is DataConstructorDelete {
	return event.type == "dc_delete";
}