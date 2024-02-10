/**
 * @license
 * Copyright 2024 tildeman
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { TypeBase, TypeBaseJson } from './type_base.js';
import { TypeWorkspace } from '../index.js';

/**
 * Notifies listeners that a type data model has been deleted.
 */
export class TypeDelete extends TypeBase {
	static readonly TYPE = 'type_delete';

	/** A string used to check the type of the event. */
	type = TypeDelete.TYPE;

	/**
	 * Replays the event in the workspace.
	 *
	 * @param forward if true, play the event forward (redo), otherwise play it
	 *     backward (undo).
	 */
	run(forward: boolean) {
		// I can't really replicate this tbh
		const workspace = this.getEventWorkspace_() as TypeWorkspace;
		const type_Map = workspace.getDataTypeMap().getTypeMap();
		if (forward) {
			if (!type_Map.get(this.type_.getId())) return;
			type_Map.delete(this.type_.getId());
		}
		else {
			if (type_Map.get(this.type_.getId())) return;
			type_Map.set(this.type_.getId(), this.type_);
		}
	}

	/**
	 * Encode the event as JSON.
	 *
	 * @returns JSON representation.
	 */
	toJson(): TypeDeleteJson {
		return super.toJson() as TypeDeleteJson;
	}

	/**
	 * Deserializes the JSON event.
	 *
	 * @param json The JSON representation of a type delete event.
	 * @param workspace The workspace to deserialize the event into.
	 * @returns The new type delete return event.
	 * @internal
	 */
	static fromJson(
		json: TypeDeleteJson,
		workspace: TypeWorkspace,
	): TypeDelete {
		const model = workspace.getDataTypeMap().getTypeMap().get(json.typeId);
		if (!model) {
			throw new Error(
				'Cannot deserialize type delete return event because the ' +
					'target type does not exist',
			);
		}
		return new TypeDelete(workspace, model);
	}
}

export interface TypeDeleteJson extends TypeBaseJson {
	oldTypes: string[] | null;
}

Blockly.registry.register(
	Blockly.registry.Type.EVENT,
	TypeDelete.TYPE,
	TypeDelete,
);