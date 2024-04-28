import { Block } from "blockly";
import { DataConstructorGetMutatorType } from "../mutators/dc_get.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { DisconnectBlocksMixin } from "../mixins/disconnect_blocks.js";
import { DataConstructorCallerGetDefMixin } from "../mixins/dc_getters/getdef.js";
import { GetTargetWorkspaceMixin } from "../mixins/get_target_workspace.js";
import { DataConstructorGetOnChangeMixin } from "../mixins/dc_getters/onchange.js";

export type DataConstructorGetBlock = Block & IDataConstructorGetMutator;
interface IDataConstructorGetMutator
	extends DataConstructorGetMutatorType,
			DisconnectBlocksMixin,
			DataConstructorCallerGetDefMixin,
			DataConstructorGetOnChangeMixin,
			GetTargetWorkspaceMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}