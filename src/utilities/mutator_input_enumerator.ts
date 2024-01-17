import { serialization } from "blockly";
import { parseInputName } from "./mutator_input_name_parser.js";

type StateInput = Exclude<serialization.blocks.State["inputs"], undefined>;

export function enumerateInputState(input: StateInput, prefix: string) {
	const ids: (string | undefined)[] = [];
	for (const inputName in input) {
		const followingNumber = parseInputName(inputName, prefix);
		if (!isNaN(followingNumber)) {
			ids[followingNumber] = input[inputName].block?.id;
		}
	}
	return ids;
}