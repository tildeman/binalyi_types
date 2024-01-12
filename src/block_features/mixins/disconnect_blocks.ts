import { Block } from "blockly";

export type DisconnectBlocksMixin = typeof disconnectBlocksMixin;

export const disconnectBlocksMixin = {
	isolate: function(this: Block) {
		for (let i = 0; this.getInput("DATA" + i); ++i) {
			if (this.getInput("DATA" + i)?.connection?.targetConnection) {
				this.getInput("DATA" + i)!.connection!.disconnect();
			}
		}
	}
};