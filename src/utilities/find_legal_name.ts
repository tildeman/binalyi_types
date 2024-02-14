import { TypeWorkspace } from "../index.js";
import { Block } from "blockly";

function nameIsUsed(name: string, workspace: TypeWorkspace, opt_exclude?: Block) : boolean {
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

function nameIsLegal(name: string, workspace: TypeWorkspace, opt_exclude?: Block): boolean {
	return !nameIsUsed(name, workspace, opt_exclude);
}

export function findLegalName(name: string, block: Block): string {
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