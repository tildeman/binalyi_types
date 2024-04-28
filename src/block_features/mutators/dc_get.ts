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
	itemCount_: null as (null | number),

	createInputs(this: DataConstructorGetBlock, itemCount: number, name: string) {
		console.log("ci", name, this.getFieldValue("NAME"));
		for (let i = 0; i < itemCount; ++i) {
			const input = this
				.appendValueInput("DATA" + i)
				.setAlign(inputs.Align.RIGHT);
		}
	},

	saveExtraState: function(this: DataConstructorGetBlock) {
		console.log("save", this.getFieldValue("NAME"), this.itemCount_);
		const state = Object.create(null);
		const model = this.getDataConstructorModel();
		if (!model) {
			state.name = this.getFieldValue("NAME");
			state.itemCount = this.itemCount_;
		}
		else {
			state.name = model.getName();
			state.itemCount = model.getArgTypes().length;
		}
		return state;
	},

	loadExtraState: function(this: DataConstructorGetBlock, state: any) {
		// console.log("load", state.itemCount);
		if (!this.model_) this.model_ = this.findDataConsModel(state.name);
		if (!this.getDataConstructorModel()) this.createInputs(state.itemCount, state.name);
		else this.updateShape_(state.name);
	},

	updateShape_: function(this: DataConstructorGetBlock, newName?: string) {
		const argumentTypes = this.getDataConstructorModel()?.getArgTypes() || [];
		const name = newName || this.getFieldValue("NAME");
		this.setFieldValue(name, "NAME");

		for (let i = 0; i < argumentTypes.length; ++i) {
			let input = this.getInput("DATA" + i);
			if (!input) {
				input = this
					.appendValueInput("DATA" + i)
					.setAlign(inputs.Align.RIGHT);
			}
			input.setCheck(identifyModelParams(argumentTypes[i]));
		}

		for (let i = argumentTypes.length; this.getInput("DATA" + i); ++i) {
			this.removeInput("DATA" + i);
		}

		this.itemCount_ = argumentTypes.length;
	}
}