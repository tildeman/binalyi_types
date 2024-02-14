import { TypeWorkspace, TypeWorkspaceSvg } from "./types/workspace_extensions.js";
import { ObservableDataTypeMap } from "./models/observable_data_type_map.js";
import { IFlyout, WorkspaceSvg } from "blockly";
import { typeFlyout } from "./utilities/flyout_layout.js";
import { blockCreateListener } from "./block_features/handlers/block_create_handler.js";
import { blockDeleteListener } from "./block_features/handlers/block_delete_handler.js";

export function initialize(workspace: WorkspaceSvg) {
	workspace.registerToolboxCategoryCallback(
		"DATATYPE",
		typeFlyout
	);
	workspace.addChangeListener(blockCreateListener);
	workspace.addChangeListener(blockDeleteListener);

	const flyout: IFlyout | null = workspace.getFlyout();
	if (!flyout) return;
	const extendwsp = workspace as TypeWorkspaceSvg
	const dataTypeMap = new ObservableDataTypeMap();
	extendwsp.dataTypeMap = dataTypeMap;
	extendwsp.getDataTypeMap = function(this: TypeWorkspace) {
		return dataTypeMap;
	}
}