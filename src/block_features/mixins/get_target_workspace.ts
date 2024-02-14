import { Block } from "blockly";
import { TypeWorkspace, TypeWorkspaceSvg } from "../../types/workspace_extensions.js";

export type GetTargetWorkspaceMixin = typeof getTargetWorkspaceMixin;

export const getTargetWorkspaceMixin = {
	getTargetWorkspace_(this: Block) {
		if (this.workspace.isFlyout) {
			return (this.workspace as TypeWorkspaceSvg).targetWorkspace as TypeWorkspace | null;
		}
		return this.workspace as TypeWorkspace;
	}
};