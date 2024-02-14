import { ITypeModel, TypeKind } from "../../models/interfaces/i_type_model.js";
import { DataConstructorGetBlock } from "../types/dc_get_block.js";
import { inputs } from "blockly";

export type DataConstructorGetMutatorType = typeof DataConstructorGetMutator;

function identifyModelParams(model: ITypeModel | null) : (string | string[] | null) {
	if (!model) return null;
	switch (model.getKind()) {
		case TypeKind.Placeholder:
			return null;
		case TypeKind.Primitive:
			switch (model.getName()) {
				case "Int":
				case "Integer":
				case "Float":
				case "Double":
					return "Number";
				case "Char":
					// I could make a block for a single character, but that would be
					// less than intuitive.
					return "String";
				case "Bool":
					return "Boolean";
			}
		case TypeKind.List:
			// Assuming strings are arrays of characters; this is not always the case.
			return ["Array", "String"]
		case TypeKind.Tuple:
			// Although there is no 1-tuple in Haskell and the fact that this library
			// is primarily designed with Haskell in mind, support for other languages
			// such as Python also exists, plus allowing users to define these is
			// intuitive in some sense.
			return "Tuple"
	}
	return null;
}

export const DataConstructorGetMutator = {
	saveExtraState: function(this: DataConstructorGetBlock) {
		const state = Object.create(null);
		const model = this.getDataConstructorModel();
		if (!model) state.name = this.getFieldValue("NAME");
		else state.name = model.getName();
		return state;
	},

	loadExtraState: function(this: DataConstructorGetBlock, state: any) {
		if (!this.model_) this.model_ = this.findDataConsModel(state.name);
		this.updateShape_(state.name);
	},

	updateShape_: function(this: DataConstructorGetBlock, newName?: string) {
		const argumentTypes = this.getDataConstructorModel()?.getArgTypes() || [];
		const name = newName || this.getFieldValue("NAME");
		const empty = this.getInput("EMPTY")

		this.setFieldValue(name, "NAME");
		if (argumentTypes.length && empty) this.removeInput("EMPTY");
		else if (!argumentTypes.length) {
			if (!empty) this.appendDummyInput("EMPTY").appendField(name, "NAME");
			else this.setFieldValue(name, "NAME");
		}

		for (let i = 0; i < argumentTypes.length; ++i) {
			let input = this.getInput("DATA" + i);
			if (!input) {
				input = this
					.appendValueInput("DATA" + i)
					.setAlign(inputs.Align.RIGHT);
				if (i === 0) input.appendField(name, "NAME");
			}
			input.setCheck(identifyModelParams(argumentTypes[i]));
		}

		for (let i = argumentTypes.length; this.getInput("DATA" + i); ++i) {
			this.removeInput("DATA" + i);
		}
	}
}