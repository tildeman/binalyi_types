import { Block } from "blockly";
import { DataConstructorGetMutatorType } from "../mutators/dc_get.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";

export type DataConstructorGetBlock = Block & IDataConstructorGetMutator;
interface IDataConstructorGetMutator extends DataConstructorGetMutatorType {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}