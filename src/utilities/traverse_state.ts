import { serialization } from "blockly";

type State = serialization.blocks.State;

function traverseStateRec(current: State, ref: Map<string, State>) {
	ref.set(current.id || "", current);

	// Rarely used.
	const nextBlock = current.next?.block;
	if (nextBlock) traverseStateRec(nextBlock, ref);

	const inputRecord = current.inputs || {};
	for (const name in inputRecord) {
		const valueBlock = inputRecord[name].block;
		if (valueBlock) traverseStateRec(valueBlock, ref);
	}
}

export function traverseState(state: State) {
	const ret = new Map<string, State>();
	traverseStateRec(state, ret);
	return ret;
}