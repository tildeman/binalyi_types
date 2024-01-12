import { ObservableDataConstructorModel } from "../../models/observable_data_constructor_model.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { DataConstructorBlock } from "../types/dc_def_block.js";
import { Events, Procedures } from "blockly";

/**
 * An extension to set up the backing model for data constructor definition blocks.
 * @param this The data constructor block that calls this extension
 */
export function dataConstructorInitalizeModel(this: DataConstructorBlock) {
	// I'm not sure how procedure blocks handle this but basically
	// blocks in the flyout can't have backing data models
	if (this.isInFlyout) return;

	const model = new ObservableDataConstructorModel(
		Procedures.findLegalName(this.getFieldValue('NAME'), this),
		(this.workspace as TypeWorkspace).getDataTypeMap().getTypeMap().get(this.getFieldValue("TYPE")) as ITypeModel,
		[]
	);
	this.model_ = model;

	// Events cannot be fired from instantiation when deserializing or dragging
	// from the flyout. So make this consistent and never fire from instantiation.
	// (note from @blockly/block-shareable-procedures/src/blocks.ts, line 227)

	Events.disable();
	this.workspace.getDataTypeMap().setDataConsMap(model.getId(), model);
	Events.enable();
}