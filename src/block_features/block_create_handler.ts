import { Events, common } from "blockly";
import { isPrimitiveBlock, isPlaceholderBlock, isListBlock, isTupleBlock } from "../utilities/blocktype_filter.js";
import { traverseState } from "../utilities/traverse_state.js";
import { isBlockCreate } from "../utilities/event_filter.js";
import { GetModelBlock } from "../types/block_variants.js";
import { enumerateInputState } from "../utilities/mutator_input_enumerator.js";

export function blockCreateListener(e: Events.Abstract) {
	const workspace = common.getWorkspaceById(e.workspaceId || "");
	if (!workspace) return; // Event doesn't have a workspace
	if (!isBlockCreate(e)) return; // Ignore other events
	if (!e.ids) return; // Malformed event
	const state = e.json;
	if (!state) return; // Event has nothing useful to offer
	const blockInfo = traverseState(state);
	for (const blockID of e.ids) {
		const block = workspace.getBlockById(blockID);
		if (!block) continue; // Block went into bitbucket
		if (isPrimitiveBlock(block)) {
			block.updateType(blockInfo.get(blockID)?.fields?.TYPE || "Int");
		}
		else if (isPlaceholderBlock(block)) {
			block.updateType(blockInfo.get(blockID)?.fields?.NAME || "");
		}
		else if (isListBlock(block)) {
			const targetBlockID: string | undefined = blockInfo.get(blockID)?.inputs?.SUBTYPE?.block?.id;
			const targetBlock = workspace.getBlockById(targetBlockID || "") as GetModelBlock | null;
			block.updateType(targetBlock);
		}
		else if (isTupleBlock(block)) {
			const blockIDs: (string | undefined)[] = [];
			if (state.inputs) blockIDs.push(...enumerateInputState(state.inputs, "ADD"));
			const childBlocks = blockIDs.map(id => id ? workspace.getBlockById(id) : null);

			block.updateType(childBlocks as (GetModelBlock | null)[]);
		}
	}
}