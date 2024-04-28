import { inputs } from "blockly";
import { TypeBlock } from "../types/type_block.js";
import { ObservableTypeModel } from "../../models/observable_type_model.js";

export type TypeMutatorType = typeof TypeDefMutator;

export const TypeDefMutator = {
	saveExtraState: function(this: TypeBlock) {
		const state = Object.create(null);
		const model = this.getModel();
		if (!model) state.name = this.getFieldValue("TYPENAME");
		else state.name = model.getName();
		return state;
	},

	loadExtraState: function(this: TypeBlock, state: any) {
		if (!this.model_) this.model_ = this.findTypeModel(state.name);
		this.updateShape_(state.name);
	},

	updateShape_: function(this: TypeBlock, name: string) {
		const typeModel = this.getModel();
		const typePlaceholders = typeModel?.getTypePlaceholders() || [];
		const empty = Boolean(this.getInput("EMPTY"));
		const tpLength = typePlaceholders.length;

		if (tpLength && empty) this.removeInput("EMPTY");
		else if (!(tpLength || empty)) {
			this.appendDummyInput("EMPTY").appendField("type " + name, "TYPENAME");
		}

		for (let i = 0; i < tpLength; ++i) {
			if (!this.getInput("DATA" + i)) {
				const input = this.appendValueInput("DATA" + i)
					  .setAlign(inputs.Align.RIGHT)
					  .setCheck("Type");
				if (i === 0) input.appendField("type " + name + " with:", "TYPENAME");
				input.appendField(typePlaceholders[i], "NAME" + i);
			}
			else this.setFieldValue(typePlaceholders[i], "NAME" + i);
		}

		for (let i = tpLength; this.getInput("DATA" + i); ++i) this.removeInput("DATA" + i);
	}
};