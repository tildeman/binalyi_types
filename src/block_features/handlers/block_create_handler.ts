import { Block, Events, common } from "blockly";
import * as blockFilters from "../../utilities/blocktype_filter.js";
import { traverseState } from "../../utilities/traverse_state.js";
import { isBlockCreate } from "../../utilities/event_filter.js";
import { enumerateInputState } from "../../utilities/mutator_input_enumerator.js";
import { globalBaseModels } from "../../models/observable_type_model.js";

function castGetModel(block: Block | null) {
	if (blockFilters.isGetModelBlock(block)) return block;
	return null;
}

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
		const blockState = blockInfo.get(blockID);
		if (!block) continue; // Block went into bitbucket
		if (blockFilters.isPrimitiveBlock(block)) {
			block.updateType(blockState?.fields?.TYPE || "Int");
		}
		else if (blockFilters.isPlaceholderBlock(block)) {
			block.updateType(blockState?.fields?.NAME || "");
		}
		else if (blockFilters.isListBlock(block)) {
			const targetBlockID: string | undefined = blockState?.inputs?.SUBTYPE?.block?.id;
			const targetBlock = workspace.getBlockById(targetBlockID || "");
			if (blockFilters.isGetModelBlock(targetBlock)) {
				block.updateType(targetBlock);
			}
			// else, do nothing.
		}
		else if (blockFilters.isTupleBlock(block)) {
			const itemCount: number = blockState?.extraState.itemCount || 2; // Hardcoded default, will change
			const blockIDs: (string | undefined)[] = [];
			for (let i = 0; i < itemCount; i++) blockIDs.push(undefined);
			const inputs = blockState?.inputs;
			if (inputs) {
				const enumList = enumerateInputState(inputs, "ADD");
				blockIDs.splice(0, enumList.length, ...enumList);
			}
			const childBlocks = blockIDs.map(id => id ? castGetModel(workspace.getBlockById(id)) : null);

			block.updateType(childBlocks);
		}
		else if (blockFilters.isDataConstructorBlock(block)) {
			console.log(state.extraState);
			block.getDataConstructorModel()?.setArgTypes(globalBaseModels.UNIT, globalBaseModels.UNIT);
		}
		else if (blockFilters.isDataConstructorGetBlock(block)) {
			console.log(state.extraState);
		}
		else if (blockFilters.isTypeBlock(block)) {
			console.log(state.extraState);
		}
	}
}