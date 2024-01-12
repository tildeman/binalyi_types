import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { TypeBlock } from "../types/type_block.js";
import { inputs } from "blockly";

export type TypeMutatorType = typeof TypeDefMutator;

export const TypeDefMutator = {
	typeId_: "",

	saveExtraState: function(this: TypeBlock) {
		return {
			typeId: this.typeId_
		}
	},

	loadExtraState: function(this: TypeBlock, state: any) {
		this.typeId_ = state.typeId;
		this.updateShape_();
	},

	updateShape_: function(this: TypeBlock) {
		const typeModel = (this.workspace as TypeWorkspace).getDataTypeMap().getTypeMap().get(this.typeId_);
		const typePlaceholders = typeModel?.getTypePlaceholders() || [];
		if (typePlaceholders.length && this.getInput("EMPTY")) {
			this.removeInput("EMPTY");
		}
		else if (!typePlaceholders.length && !this.getInput("EMPTY")) {
			this.appendDummyInput("EMPTY")
				.appendField("type " + this.typeId_);
		}

		for (let i = 0; i < typePlaceholders.length; ++i) {
			if (!this.getInput("DATA" + i)) {
				const input = this.appendValueInput("DATA" + i)
					  .setAlign(inputs.Align.RIGHT)
					  .setCheck("Type");
				if (i === 0) {
					input.appendField("type " + this.typeId_ + " with:");
				}
				input.appendField(typePlaceholders[i], "NAME" + i);
			}
			else {
				this.setFieldValue(typePlaceholders[i], "NAME" + i);
			}
		}

		for (let i = typePlaceholders.length; this.getInput("DATA" + i); ++i) {
			this.removeInput("DATA" + i);
		}
	}
};