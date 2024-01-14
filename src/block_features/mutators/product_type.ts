import { BlockWithValueConnection } from "../../types/block_variants.js";
import { Block, Connection, WorkspaceSvg, inputs } from "blockly";

type ProductTypeBlock = Block & IProductTypeMutator;
interface IProductTypeMutator extends ProductTypeMutatorType {}
type ProductTypeMutatorType = typeof ProductTypeMutator;

export const ProductTypeMutator = {
	itemCount_: 2,

	saveExtraState: function(this: ProductTypeBlock) {
		return {
			"itemCount": this.itemCount_
		};
	},

	loadExtraState: function(this: ProductTypeBlock, state: any) {
		this.itemCount_ = state["itemCount"];
		this.updateShape_()
	},

	decompose: function(this: ProductTypeBlock, workspace: WorkspaceSvg) {
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

	compose: function(this: ProductTypeBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock("STACK");
		if (!itemBlock) return;
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
			const connection = this.getInput("ADD" + i)?.connection?.targetConnection || null;
			if (connection && connections.indexOf(connection) === -1) {
				connection.disconnect();
			}
		}
		this.itemCount_ = connections.length;
		this.updateShape_()

		for (let i = 0; i < this.itemCount_; ++i) {
			connections[i]?.reconnect(this, "ADD" + i);
		}
	},

	saveConnections: function(this: ProductTypeBlock, containerBlock: Block) {
		let itemBlock = containerBlock.getInputTargetBlock("STACK") as BlockWithValueConnection | null;
		let i = 0;
		while (itemBlock) {
			if (itemBlock.isInsertionMarker()) {
				itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
				continue;
			}
			const input = this.getInput("ADD" + i);
			itemBlock.valueConnection_ = (input && input.connection?.targetConnection) || null;
			itemBlock = itemBlock.getNextBlock() as BlockWithValueConnection | null;
			i++;
		}
	},

	updateShape_: function(this: ProductTypeBlock) {
		if (this.itemCount_ && this.getInput("EMPTY")) {
			this.removeInput("EMPTY");
			this.setTooltip("A product type of different things.");
		}
		else if (!this.itemCount_ && !this.getInput("EMPTY")) {
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
	}
};