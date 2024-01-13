/**
 * @fileoverview Core functionality for types.
 */

import * as Blockly from "blockly";
import { ButtonInfo, FlyoutItemInfo, FlyoutItemInfoArray } from "blockly/core/utils/toolbox.js";

import { TypeWorkspace, TypeWorkspaceSvg } from "./types/workspace_extensions.js";
import { ITypeModel, TypeKind } from "./models/interfaces/i_type_model.js";
import { ObservableTypeModel } from "./models/observable_type_model.js";
import { vomitMap } from "./utilities/debug_map.js";

import { DataConstructorGetBlock } from "./block_features/types/dc_get_block.js";
import { DataConstructorBlock } from "./block_features/types/dc_def_block.js";
import { TypeBlock } from "./block_features/types/type_block.js";

// Some more type guards, and we're good to go!

function isTypeBlock(block: Blockly.Block): block is TypeBlock {
	return "isolate" in block &&
		"typeName_" in block &&
		"updateShape_" in block;
}

function isDataConstructorBlock(block: Blockly.Block): block is DataConstructorBlock {
	return "isolate" in block &&
		"renameDataConstructor" in block &&
		"updateShape_" in block;
}

function isDataConstructorGetBlock(block: Blockly.Block): block is DataConstructorGetBlock {
	return "isolate" in block &&
		"dcName_" in block &&
		"updateShape_" in block;
}

// Let's start, shall we?

function typeFlyoutBlocks(workspace: TypeWorkspace): FlyoutItemInfoArray {
	const jsonList: FlyoutItemInfo[] = [
		{
			"kind": "block",
			"type": "types_primitive"
		},
		{
			"kind": "block",
			"type": "types_primitive",
			"fields": {
				"TYPE": "Double"
			}
		},
		{
			"kind": "block",
			"type": "types_primitive",
			"fields": {
				"TYPE": "Bool"
			}
		},
		{
			"kind": "block",
			"type": "types_list"
		},
		{
			"kind": "block",
			"type": "types_list",
			"inputs": {
				"SUBTYPE": {
					"block": {
						"type": "types_primitive",
						"fields": {
							"TYPE": "Char"
						}
					},
					"shadow": undefined
				}
			}
		},
		{
			"kind": "block",
			"type": "types_tuple"
		},
		{
			"kind": "block",
			"type": "types_tuple",
			"extraState": {
				"itemCount": 0
			}
		},
		{
			"kind": "block",
			"type": "types_cast"
		},
		{
			"kind": "block",
			"type": "types_placeholder"
		}
	]
	if (workspace.getDataTypeMap().getTypeMap().size !== 0) {
		// TODO: Remove stub
		jsonList.push(
			{ "kind": "label", "text": "Custom types" },
			{ "kind": "sep", "gap": "4" }
		);
		const typeMap = workspace.getDataTypeMap().getTypeMap();
		for (const typeModel in typeMap) {
			jsonList.push(
		// 		{
		// 			"kind": "block",
		// 			"type": "types_type",
		// 			"extraState": {
		// 				"typeName": typeMap.get(typeModel)!.getName()
		// 			}
		// 		}
				{ "kind": "label", "text": typeMap.get(typeModel)!.getName() }
			);
		}

		jsonList.push(
			{ "kind": "label", "text": "Data construction" },
			{ "kind": "sep", "gap": "4" },
			{ "kind": "block", "type": "types_dc_def" }
		);
		// const dataConsMap = ObservableDataTypeMap.getDataConsMap();
		// for (const dataConsModel in dataConsMap) {
		// 	jsonList.push(
		// 		{
		// 			"kind": "block",
		// 			"type": "types_dc_get",
		// 			"extraState": {
		// 				"dcName": dataConsMap.get(dataConsModel)!.getName()
		// 			}
		// 		}
		// 	);
		// }
	}
	return jsonList;
}

function updateDynamicCategory(workspace: TypeWorkspace): Blockly.utils.toolbox.FlyoutDefinition {
	let toolbox: FlyoutItemInfoArray = [];
	const button: ButtonInfo = {
		"kind": "button",
		"text": "Create type...",
		"callbackkey": "DATATYPE"
	};
	toolbox.push(button);

	// Add extra debug button if needed
	const debug: ButtonInfo = {
		"kind": "button",
		"text": "Debug models",
		"callbackkey": "DEBUG_TYPES"
	}
	toolbox.push(debug);

	const blockList = typeFlyoutBlocks(workspace);
	toolbox = toolbox.concat(blockList);

	return toolbox;
}

function addTypeCallback(bflyout: Blockly.FlyoutButton): void {
	const workspace = bflyout.getTargetWorkspace() as TypeWorkspaceSvg;
	let typeName: string | null;

	while (true) {
		typeName = prompt("New type name:");

		if (!typeName) {
			return; // User probably clicked on it by accident
		}
		if (workspace.getDataTypeMap().getTypeMap().get(typeName)) {
			alert("A type named '" + typeName + "' already exists.");
		}
		else if (workspace.getDataTypeMap().getDataConsMap().get(typeName)) {
			alert("A data constructor named '" + typeName + "' already exists.");
		}
		else break;
	}

	// Add the type to the workspace's type map
	const typeModel: ITypeModel = new ObservableTypeModel(typeName, 4, [])
	workspace.getDataTypeMap().setTypeMap(typeModel.getId(), typeModel);

	// Update the dynamic category to include the new type
	const toolbox = workspace.getToolbox();
	if (toolbox) toolbox.refreshSelection();
}

export function identifyModelParams(model: ITypeModel | null) : (string | string[] | null) {
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

// function updateDataConsNames(workspace: Blockly.Workspace, oldName: string, newName: string): void {
// 	const dataConstructorBuildList = workspace.getBlocksByType("types_dc_get", false) as DataConstructorGetBlock[];
// 	for (const dataConstructorBuildBlock of dataConstructorBuildList) {
// 		if (dataConstructorBuildBlock.dcName_ === oldName) {
// 			dataConstructorBuildBlock.dcName_ = newName;
// 			dataConstructorBuildBlock.updateShape_();
// 		}
// 	}
// }

// function removeDataCons(workspace: TypeWorkspace, block: Blockly.serialization.blocks.State) : void {
// 	const fields = block["fields"];
// 	if (!fields) return;
// 	const name = fields["NAME"];
// 	const dataConstructorBuildList =
// 		workspace.getBlocksByType("types_dc_get", false);
// 	if (dataConstructorBuildList.every(isDataConstructorGetBlock)) {
// 		for (const dataConstructorBuildBlock of dataConstructorBuildList) {
// 			if (dataConstructorBuildBlock.dcName_ === name) {
// 				dataConstructorBuildBlock.isolate();
// 				dataConstructorBuildBlock.dispose();
// 			}
// 		}
// 	}
// 	workspace.getDataTypeMap().getDataConsMap().delete(name);
// }

export function removeType(workspace: TypeWorkspace, typeName: string): void {
	// Step 1: dissociate all type blocks of the chosen type
	const typeBuildList = workspace.getBlocksByType("types_type", false) as TypeBlock[];
	if (typeBuildList.every(isTypeBlock)) {
		for (const typeBuildBlock of typeBuildList) {
			if (typeBuildBlock.getTypeModel()?.getName() === typeName) {
				typeBuildBlock.isolate();
				typeBuildBlock.dispose(false);
			}
		}
	}
	
	// Step 2: dissociate all data constructor defintions of the chosen type
	// Step 3: dissociate all data constructor blocks of the chosen type
	const dataConstructorBuildList = workspace.getBlocksByType("types_dc_def", false) as DataConstructorBlock[];
	if (dataConstructorBuildList.every(isDataConstructorBlock)) {
		for (const dataConstructorBuildBlock of dataConstructorBuildList) {
			if (dataConstructorBuildBlock.getFieldValue("TYPE") === typeName) {
				dataConstructorBuildBlock.isolate();
				dataConstructorBuildBlock.dispose(false);
			}
		}
	}

	// Step 4: remove the entries within the model
	workspace.getDataTypeMap().getTypeMap().delete(typeName);
}

export function typeFlyout(workspace: Blockly.WorkspaceSvg) {
	workspace.registerButtonCallback(
		"DATATYPE",
		addTypeCallback
	);

	workspace.registerButtonCallback(
		"DEBUG_TYPES",
		function() {
			const dataTypeMap = (workspace as TypeWorkspaceSvg).getDataTypeMap();
			console.log(vomitMap(dataTypeMap.getTypeMap()));
			console.log(vomitMap(dataTypeMap.getDataConsMap()));
		}
	)

	return updateDynamicCategory(workspace as TypeWorkspaceSvg);
}

export function nameIsUsed(name: string, workspace: TypeWorkspace, opt_exclude?: Blockly.Block) : boolean {
	const dataConstructorBuildList = workspace.getBlocksByType("types_dc_def", false);
	for (const dataConstructorBuildBlock of dataConstructorBuildList) {
		if (dataConstructorBuildBlock.getFieldValue("NAME") === name &&
			dataConstructorBuildBlock != opt_exclude) {
			return true;
		}
	}

	// Checking blocks may be enough, but we need to be sure.
	const dataConstructorMap = workspace.getDataTypeMap().getDataConsMap();
	const excludeModel = opt_exclude &&
		dataConstructorMap.get(opt_exclude.getFieldValue("NAME"));
	for (const model in dataConstructorMap) {
		if (dataConstructorMap.get(model) === excludeModel) continue;
		if (dataConstructorMap.get(model)!.getName() === name) return true;
	}

	// We also don't want data constructor names to collide with type names.
	for (const typeName in workspace.getDataTypeMap().getTypeMap()) {
		if (typeName === name) return true;
	}

	// Then and only then return false.
	return false;
}

function nameIsLegal(name: string, workspace: TypeWorkspace, opt_exclude?: Blockly.Block): boolean {
	return !nameIsUsed(name, workspace, opt_exclude);
}

export function findLegalName(name: string, block: Blockly.Block): string {
	if (block.isInFlyout) {
		// Flyouts can have multiple data constructors called "Something".
		return name;
	}
	name = name || "Something";
	const workspace = block.workspace as TypeWorkspace;
	while (!nameIsLegal(name, workspace, block)) {
		// Collision with another data constructor.
		const r = name.match(/^(.*?)(\d+)$/);
		if (!r) {
			name += "2";
		} else {
			name = r[1] + (parseInt(r[2]) + 1);
		}
	}
	return name;
}