import { FlyoutButton, WorkspaceSvg, utils } from "blockly";
import { TypeWorkspace, TypeWorkspaceSvg } from "../types/workspace_extensions.js";
import { ITypeModel } from "../models/interfaces/i_type_model.js";
import { ObservableTypeModel } from "../models/observable_type_model.js";
import { vomitMap } from "./debug_map.js";

function typeFlyoutBlocks(workspace: TypeWorkspace): utils.toolbox.FlyoutItemInfoArray {
	const jsonList: utils.toolbox.FlyoutItemInfoArray = [
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
			"type": "types_tuple",
			"extraState": {
				"itemCount": 3
			},
			"inputs": {
				"ADD0": {
					"block": {
						"type": "types_primitive",
						"fields": {
							"TYPE": "Char"
						}
					}
				},
				"ADD2": {
					"block": {
						"type": "types_primitive",
						"fields": {
							"TYPE": "Bool"
						}
					}
				}
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
		for (const [typeId, typeModel] of typeMap) {
			const typePh = typeModel.getTypePlaceholders();
			jsonList.push({
				"kind": "block",
				"type": "types_type",
				"fields": {
					"TYPENAME": "type " + typeModel.getName() + (typePh.length ? " with:" : "")
				},
				"extraState": {
					"name": typeModel.getName()
				}
			});
		}

		jsonList.push(
			{ "kind": "label", "text": "Data construction" },
			{ "kind": "sep", "gap": "4" },
			{ "kind": "block", "type": "types_dc_def" }
		);
		const dataConsMap = workspace.getDataTypeMap().getDataConsMap();
		for (const [dataConsId, dataConsModel] of dataConsMap) {
			jsonList.push({
				"kind": "block",
				"type": "types_dc_get",
				"fields": {
					"NAME": dataConsModel.getName()
				},
				"extraState": {
					"name": dataConsModel.getName()
				}
			});
		}
	}
	return jsonList;
}

function updateDynamicCategory(workspace: TypeWorkspace): utils.toolbox.FlyoutDefinition {
	let toolbox: utils.toolbox.FlyoutItemInfoArray = [];
	const button: utils.toolbox.ButtonInfo = {
		"kind": "button",
		"text": "Create type...",
		"callbackkey": "DATATYPE"
	};
	toolbox.push(button);

	// Add extra debug button if needed
	const debug: utils.toolbox.ButtonInfo = {
		"kind": "button",
		"text": "Debug models",
		"callbackkey": "DEBUG_TYPES"
	}
	toolbox.push(debug);

	const blockList = typeFlyoutBlocks(workspace);
	toolbox = toolbox.concat(blockList);

	return toolbox;
}

function addTypeCallback(bflyout: FlyoutButton): void {
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

export function typeFlyout(workspace: WorkspaceSvg) {
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