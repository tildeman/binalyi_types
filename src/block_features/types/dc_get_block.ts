import { Block } from "blockly";
import { DataConstructorGetMutatorType } from "../mutators/dc_get.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";
import { DisconnectBlocksMixin } from "../mixins/disconnect_blocks.js";

export type DataConstructorGetBlock = Block & IDataConstructorGetMutator;
interface IDataConstructorGetMutator extends DataConstructorGetMutatorType, DisconnectBlocksMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}