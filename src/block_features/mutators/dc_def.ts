import { BlockWithValueConnection } from "../../types/block_variants.js";
import { ITypeModel } from "../../models/interfaces/i_type_model.js";
import { Block, Connection, WorkspaceSvg, inputs } from "blockly";
import { DataConstructorBlock } from "../types/dc_def_block.js";

export type DataConstructorMutatorType = typeof DataConstructorMutator;

export const DataConstructorMutator = {
	itemCount_: 2,

	saveExtraState: function(this: DataConstructorBlock) {
		return { "itemCount": this.itemCount_ };
	},

	loadExtraState: function(this: DataConstructorBlock, state: any) {
		this.itemCount_ = state["itemCount"];
		this.updateShape_();
	},

	decompose: function(this: DataConstructorBlock, workspace: WorkspaceSvg) {
		const containerBlock = workspace.newBlock("types_mutator_container");
		containerBlock.initSvg();
		const stackInput = containerBlock.getInput("STACK");
		if (!stackInput) return containerBlock;
		let connection = stackInput.connection;
		for (let i = 0; i < this.itemCount_; ++i) {
			const itemBlock = workspace.newBlock("types_mutator_item");
			itemBlock.initSvg();
			connection?.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}
		return containerBlock;
	},

	compose: function(this: DataConstructorBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock("STACK");
		const connections: (Connection | null)[] = [];
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock();
				continue;
			}
			connections.push(
				(itemBlock as BlockWithValueConnection | null)?.valueConnection_ || null);
			itemBlock = itemBlock.getNextBlock();
		}

		for (let i = 0; i < this.itemCount_; ++i) {
			const connection = this.getInput("DATA" + i)?.connection?.targetConnection;
			if (connection && connections.indexOf(connection) === -1) {
				connection.disconnect();
			}
		}
		this.itemCount_ = connections.length;
		this.updateShape_();

		for (let i = 0; i < this.itemCount_; ++i) {
			connections[i]?.reconnect(this, "DATA" + i);
		}
	},

	saveConnections: function(this: DataConstructorBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock("STACK") as BlockWithValueConnection | null;
		let i = 0;
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
				continue;
			}
			const input = this.getInput("DATA" + i);
			itemBlock.valueConnection_ = input && input.connection?.targetConnection || null;
			itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
			i++;
		}

		this.updateType(); // Let's try
	},

	updateShape_: function(this: DataConstructorBlock) {
		// TODO: Assign new placeholder types
		const argTypesList: ITypeModel[] = this.getDataConstructorModel()?.getArgTypes() || [];
		argTypesList.splice(0);
		for (let i = 0; i < this.itemCount_; ++i) {
			if (!this.getInput("DATA" + i)) {
				const input = this.appendValueInput("DATA" + i)
					  .setAlign(inputs.Align.RIGHT)
					  .setCheck("Type");
				if (i === 0) {
					input.appendField("with");
				}
				const targetBlock = input.connection?.targetBlock();
				if (targetBlock) {
					
				}
			}

		}

		for (let i = this.itemCount_; this.getInput("DATA" + i); ++i) {
			this.removeInput("DATA" + i);
		}
	}
};