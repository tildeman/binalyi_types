import { Events } from "blockly";

export function isBlockChange(event: Events.Abstract): event is Events.BlockChange {
	return event.type == Events.BLOCK_CHANGE;
}

export function isBlockCreate(event: Events.Abstract): event is Events.BlockCreate {
	return event.type == Events.BLOCK_CREATE;
}

export function isBlockMove(event: Events.Abstract): event is Events.BlockMove {
	return event.type == Events.BLOCK_MOVE;
}