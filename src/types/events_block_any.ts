// Workarounds for Blockly's suboptimal type declarations

import { Events } from "blockly";
import { BlockChange } from "blockly/core/events/events_block_change.js";
import { BlockCreate } from "blockly/core/events/events_block_create.js";
import { BlockDelete } from "blockly/core/events/events_block_delete.js";
import { BlockDrag } from "blockly/core/events/events_block_drag.js";
import { BlockMove } from "blockly/core/events/events_block_move.js";

// Don't give a f*** about event types, just pretend it's anything
// - nerd on a TypeScript conversion deadline
// See google/blockly#6920
export type BlockAny =
	(BlockChange & { type: typeof Events.BLOCK_CHANGE }) |
	(BlockCreate & { type: typeof Events.BLOCK_CREATE }) |
	(BlockDelete & { type: typeof Events.BLOCK_DELETE }) |
	(BlockDrag & { type: typeof Events.BLOCK_DRAG }) |
	(BlockMove & { type: typeof Events.BLOCK_MOVE });