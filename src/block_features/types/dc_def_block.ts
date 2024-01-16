import { Block } from "blockly";
import { DisconnectBlocksMixin } from "../mixins/disconnect_blocks.js";
import { DataConstructorDefGetDefMixin } from "../mixins/data_constructors/getdef.js";
import { DataConstructorMutatorType } from "../mutators/dc_def.js";
import { DataConstructorRenameMixin } from "../mixins/data_constructors/rename.js";
import { TypeWorkspace } from "../../types/workspace_extensions.js";

export type DataConstructorBlock = Block & IDataConstructorMutator;

interface IDataConstructorMutator extends DataConstructorMutatorType, DataConstructorDefGetDefMixin, DisconnectBlocksMixin, DataConstructorRenameMixin {
	workspace: TypeWorkspace; // We can safely assume that the workspace has extra methods for types
}