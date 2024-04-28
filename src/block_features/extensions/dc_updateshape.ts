import { DataConstructorBlock } from "../types/dc_def_block.js";
import { Field, FieldDropdown, MenuGenerator } from "blockly";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { findLegalName } from "../../utilities/find_legal_name.js";

function rename(this: Field, name: string): string {
	const block = this.getSourceBlock() as DataConstructorBlock | null;
	if (!block) return "";

	// Strip leading and trailing whitespace.  Beyond this, all names are legal.
	// Later in the code I'd have to enforce the first letter being capitalized.
	name = name.trim();

	const legalName = findLegalName(name, block);
	const oldName = this.getValue();
	if (oldName !== name && oldName !== legalName) {
		block.renameDataConstructor(oldName, legalName);
	}
	return legalName;
}

// Blockly developers call this a factory, so you can call this retrieveTypeListFactory
function retrieveTypeList(workspace: TypeWorkspace): MenuGenerator {
	return function() {
		const menu: [string, string][] = [];
		for (const [key, value] of workspace.getDataTypeMap().getTypeMap()) {
			menu.push([value.getName(), key]);
		}
		return menu.length ? menu : [["Undefined", "Undefined"]];
	}
}

export function dataConstructorUpdateShape(this: DataConstructorBlock) {
	const input = this.getInput("META");
	const workspace = this.getTargetWorkspace_();
	if (!workspace) return;
	input?.appendField(
		(new FieldDropdown(retrieveTypeList(workspace)) as Field<string | undefined>),
		"TYPE");
	const nameField = this.getField("NAME");
	if (nameField) nameField.setValidator(rename);
	this.updateShape_();
}