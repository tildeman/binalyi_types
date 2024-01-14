import { TypeWorkspace, TypeWorkspaceSvg } from "./types/workspace_extensions.js";
import { ObservableDataTypeMap } from "./models/observable_data_type_map.js";
import { IFlyout, WorkspaceSvg } from "blockly";
import { typeFlyout } from "./core.js";
import { blockCreateListener } from "./block_features/block_create_handler.js";

export function initialize(workspace: WorkspaceSvg) {
	workspace.registerToolboxCategoryCallback(
		"DATATYPE",
		typeFlyout
	);
	workspace.addChangeListener(blockCreateListener);

	const flyout: IFlyout | null = workspace.getFlyout();
	if (!flyout) return;
	const extendwsp = workspace as TypeWorkspaceSvg
	const flyoutwsp = flyout.getWorkspace() as TypeWorkspaceSvg;
	const dataTypeMap = new ObservableDataTypeMap();
	extendwsp.dataTypeMap = flyoutwsp.dataTypeMap = dataTypeMap;
	extendwsp.getDataTypeMap = flyoutwsp.getDataTypeMap = function(this: TypeWorkspace) {
		return dataTypeMap;
	}
}