import { Block, BlockSvg, Connection } from "blockly";
import { ITypeModel } from "../models/interfaces/i_type_model.js";

export type BlockWithValueConnection = BlockSvg & {
	valueConnection_: Connection | null;
};

export type ParentTypeBlock = Block & {
	updateType: () => void;
}

export type GetModelBlock = Block & {
	getModel: () => ITypeModel;
}