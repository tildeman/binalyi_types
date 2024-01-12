import { DataConstructorGetBlock } from "../types/dc_get_block.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { identifyModelParams } from "../../core.js";
import { inputs } from "blockly";

export type DataConstructorGetMutatorType = typeof DataConstructorGetMutator;

export const DataConstructorGetMutator = {
	dcName_: "",

	saveExtraState: function(this: DataConstructorGetBlock) {
		return {
			"dcName": this.dcName_
		}
	},

	loadExtraState: function(this: DataConstructorGetBlock, state: any) {
		this.dcName_ = state["dcName"];
		this.updateShape_();
	},

	updateShape_: function(this: DataConstructorGetBlock) {
		const dataConsModel = (this.workspace as TypeWorkspace).getDataTypeMap().getDataConsMap().get(this.dcName_);
		const argumentTypes = dataConsModel?.getArgTypes() || [];
		if (argumentTypes.length && this.getInput("EMPTY")) {
			this.removeInput("EMPTY");
		}
		else if (!argumentTypes.length) {
			if (!this.getInput("EMPTY")) {
				this.appendDummyInput("EMPTY")
					.appendField(this.dcName_, "NAME");
			}
			else {
				this.setFieldValue(this.dcName_, "NAME");
			}
		}

		for (let i = 0; i < argumentTypes.length; ++i) {
			let input = this.getInput("DATA" + i);
			if (!input) {
				input = this
					.appendValueInput("DATA" + i)
					.setAlign(inputs.Align.RIGHT);
				if (i === 0) {
					input.appendField(this.dcName_, "NAME");
				}
			}
			else {
				this.setFieldValue(this.dcName_, "NAME");
			}
			input.setCheck(identifyModelParams(argumentTypes[i]));
		}

		for (let i = argumentTypes.length; this.getInput("DATA" + i); ++i) {
			this.removeInput("DATA" + i);
		}
	}
}