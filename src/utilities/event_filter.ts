import { Events } from "blockly";
import { DataConstructorChange } from "../events/dc_change.js";

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

export function isFinishedLoading(event: Events.Abstract): event is Events.FinishedLoading {
	return event.type == Events.FINISHED_LOADING;
}

export function isDataConsChange(event: Events.Abstract): event is DataConstructorChange {
	return event.type == "dc_change";
}