import { BlockSvg, Connection } from "blockly";

export type BlockWithValueConnection = BlockSvg & {
	valueConnection_: Connection | null;
};