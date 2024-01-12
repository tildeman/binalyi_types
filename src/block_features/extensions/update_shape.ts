import { Block } from "blockly";

export function updateShapeExtension(this: Block & { updateShape_: () => void }) {
	this.updateShape_();
}