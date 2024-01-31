/**
 * @license
 * Copyright 2024 tildeman
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { DataConstructorBase, DataConstructorBaseJson } from './dc_base.js';
import { TypeWorkspace } from '../index.js';

/**
 * Notifies listeners that a data constructor data model has been deleted.
 */
export class DataConstructorDelete extends DataConstructorBase {
	static readonly TYPE = 'dc_delete';

	/** A string used to check the type of the event. */
	type = DataConstructorDelete.TYPE;

	/**
	 * Replays the event in the workspace.
	 *
	 * @param forward if true, play the event forward (redo), otherwise play it
	 *     backward (undo).
	 */
	run(forward: boolean) {
		// I can't really replicate this tbh
		const workspace = this.getEventWorkspace_() as TypeWorkspace;
		const dataConsMap = workspace.getDataTypeMap().getDataConsMap();
		if (forward) {
			if (!dataConsMap.get(this.datacons.getId())) return;
			dataConsMap.delete(this.datacons.getId());
		}
		else {
			if (dataConsMap.get(this.datacons.getId())) return;
			dataConsMap.set(this.datacons.getId(), this.datacons);
		}
	}

	/**
	 * Encode the event as JSON.
	 *
	 * @returns JSON representation.
	 */
	toJson(): DataConstructorDeleteJson {
		return super.toJson() as DataConstructorDeleteJson;
	}

	/**
	 * Deserializes the JSON event.
	 *
	 * @param json The JSON representation of a data constructor delete event.
	 * @param workspace The workspace to deserialize the event into.
	 * @returns The new data constructor delete return event.
	 * @internal
	 */
	static fromJson(
		json: DataConstructorDeleteJson,
		workspace: TypeWorkspace,
	): DataConstructorDelete {
		const model = workspace.getDataTypeMap().getDataConsMap().get(json['dataConsId']);
		if (!model) {
			throw new Error(
				'Cannot deserialize data constructor delete return event because the ' +
					'target data constructor does not exist',
			);
		}
		return new DataConstructorDelete(workspace, model);
	}
}

export interface DataConstructorDeleteJson extends DataConstructorBaseJson {
	oldTypes: string[] | null;
}

Blockly.registry.register(
	Blockly.registry.Type.EVENT,
	DataConstructorDelete.TYPE,
	DataConstructorDelete,
);