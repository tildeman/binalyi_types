import {
	BlockWithValueConnection,
	GetModelBlock,
} from "../../types/block_variants.js";
import { Block, Connection, WorkspaceSvg, inputs } from "blockly";
import { TupleBlock } from "../types/tuple_block.js";
import { isPlaceholderBlock } from "../../utilities/blocktype_filter.js";
import { globalBaseModels } from "../../models/observable_type_model.js";

export type TupleTypeMutatorType = typeof TupleTypeMutator;

export const TupleTypeMutator = {
	itemCount_: 2,

	saveExtraState: function (this: TupleBlock) {
		return {
			itemCount: this.itemCount_,
		};
	},

	loadExtraState: function (this: TupleBlock, state: any) {
		this.itemCount_ = state["itemCount"];
		this.updateShape_();
	},

	decompose: function (this: TupleBlock, workspace: WorkspaceSvg) {
		const containerBlock = workspace.newBlock("types_mutator_container");
		containerBlock.initSvg();
		const stackInput = containerBlock.getInput("STACK");
		if (!stackInput) return;
		let connection = stackInput.connection;
		for (let i = 0; i < this.itemCount_; ++i) {
			const itemBlock = workspace.newBlock("types_mutator_item");
			itemBlock.initSvg();
			connection?.connect(itemBlock.previousConnection);
			connection = itemBlock.nextConnection;
		}
		return containerBlock;
	},

	compose: function (this: TupleBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock("STACK");
		if (!itemBlock) return;
		const connections: (Connection | null)[] = [];
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock();
				continue;
			}
			connections.push((itemBlock as BlockWithValueConnection | null)?.valueConnection_ || null);
			itemBlock = itemBlock.getNextBlock();
		}

		for (let i = 0; i < this.itemCount_; ++i) {
			const connection = this.getInput("ADD" + i)?.connection?.targetConnection || null;
			if (connection && connections.indexOf(connection) === -1) {
				connection.disconnect();
			}
		}
		this.itemCount_ = connections.length;
		this.updateShape_();

		for (let i = 0; i < this.itemCount_; ++i) {
			connections[i]?.reconnect(this, "ADD" + i);
		}
	},

	saveConnections: function (this: TupleBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock(
			"STACK"
		) as BlockWithValueConnection | null;
		let i = 0;
		const sourceBlocks: (GetModelBlock | null)[] = [];
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
				continue;
			}
			const input = this.getInput("ADD" + i);
			itemBlock.valueConnection_ = input?.connection?.targetConnection || null;
			sourceBlocks.push((input?.connection?.targetConnection?.getSourceBlock() || null) as GetModelBlock | null);
			itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
			i++;
		}

		this.updateType(sourceBlocks);
	},

	updateShape_: function (this: TupleBlock) {
		if (this.itemCount_ && this.getInput("EMPTY")) {
			this.removeInput("EMPTY");
			this.setTooltip("A product type of different things.");
		} else if (!this.itemCount_ && !this.getInput("EMPTY")) {
			this.appendDummyInput("EMPTY").appendField("Unit");
			this.setTooltip("The unit type (aka null, nil, none, etc.).");
		}

		for (let i = 0; i < this.itemCount_; ++i) {
			if (!this.getInput("ADD" + i)) {
				const input = this.appendValueInput("ADD" + i)
					.setAlign(inputs.Align.RIGHT)
					.setCheck("Type");
				if (i === 0) {
					input.appendField("Tuple of");
				}
			}
		}

		for (let i = this.itemCount_; this.getInput("ADD" + i); ++i) {
			this.removeInput("ADD" + i);
		}
	},
};
