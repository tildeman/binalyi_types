import { DataConstructorBlock } from "../block_features/types/dc_def_block.js";
import { DataConstructorGetBlock } from "../block_features/types/dc_get_block.js";
import { TypeBlock } from "../block_features/types/type_block.js";
import { TypeWorkspace } from "../types/workspace_extensions.js";

export function removeType(workspace: TypeWorkspace, typeId: string): void {
	// Step 1: dissociate all type blocks of the chosen type
	const typeBuildList = workspace.getBlocksByType("types_type", false) as TypeBlock[];
	for (const typeBuildBlock of typeBuildList) {
		if (typeBuildBlock.getModel()?.getId() === typeId) {
			typeBuildBlock.isolate();
			typeBuildBlock.dispose(false);
		}
	}
	
	// Step 2: dissociate all data constructor defintions of the chosen type
	const dataConstructorBuildList = workspace.getBlocksByType("types_dc_def", false) as DataConstructorBlock[];
	for (const dataConstructorBuildBlock of dataConstructorBuildList) {
		if (dataConstructorBuildBlock.getDataConstructorModel()?.getParentType().getId() === typeId) {
			dataConstructorBuildBlock.isolate();
			dataConstructorBuildBlock.dispose(false);
		}
	}
	
	// Step 3: dissociate all data constructor blocks of the chosen type
	const dataConstructorGetterBuildList = workspace.getBlocksByType("types_dc_get", false) as DataConstructorGetBlock[];
	for (const dataConstructorGetterBuildBlock of dataConstructorGetterBuildList) {
		if (dataConstructorGetterBuildBlock.getDataConstructorModel()?.getParentType().getId() === typeId) {
			dataConstructorGetterBuildBlock.isolate();
			dataConstructorGetterBuildBlock.dispose(false);
		}
	}

	// Step 4: remove the entries within the model
	workspace.getDataTypeMap().getTypeMap().delete(typeId);
}