import { Events, common } from "blockly";
import { isBlockDelete } from "../../utilities/event_filter.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { DataConstructorGetBlock } from "../types/dc_get_block.js";
import { ObservableDataConstructorModel } from "../../index.js";
import { DataConstructorChange } from "../../events/dc_change.js";

export function blockDeleteListener(e: Events.Abstract) {
	const workspace = common.getWorkspaceById(e.workspaceId || "") as TypeWorkspace;
	if (!workspace) return; // Event doesn't have a workspace
	if (!isBlockDelete(e)) return; // Ignore other events
	if (!e.ids) return; // Malformed event

	if (e.oldJson?.type === "types_dc_def" && (e.oldJson?.fields)) {
		const dcParentTypeId: string = e.oldJson.fields.TYPE;
		const modelId = e.oldJson.extraState.id;
		const dcParentType = workspace.getDataTypeMap().getTypeMap().get(dcParentTypeId);
		if (!dcParentType) return;

		const blocks = workspace.getBlocksByType("types_dc_get") as DataConstructorGetBlock[];
		for (const block of blocks) {
			if (block.getDataConstructorModel()?.getId() === modelId) {
				block.isolate();
				block.dispose(false);
			}
		}

		const dummyModel = new ObservableDataConstructorModel("DUMMY", dcParentType, [], modelId);
		Events.fire(new DataConstructorChange(workspace, dummyModel, null));
	}
}