/**
 * @license
 * Copyright 2024 tildeman
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { DataConstructorBase, DataConstructorBaseJson } from './dc_base.js';
import { IDataConstructorModel } from '../models/interfaces/i_data_constructor_model.js';
import { TypeWorkspace } from '../index.js';

/**
 * Notifies listeners that a data constructor's return type/status has changed.
 */
export class DataConstructorChange extends DataConstructorBase {
	static readonly TYPE = 'dc_change';

	/** A string used to check the type of the event. */
	type = DataConstructorChange.TYPE;

	/**
	 * Constructs the data constructor change event.
	 *
	 * @param workpace The workspace this change event is associated with.
	 * @param data constructor The model this change event is associated with.
	 * @param oldTypes The type(s) the data constructor's return was set to before it
	 *     changed.
	 */
	constructor(
		workpace: Blockly.Workspace,
		data: IDataConstructorModel,
		readonly oldTypes: string[] | null,
	) {
		super(workpace, data);
		// And then proceed to do absolutely nothing
	}

	/**
	 * Replays the event in the workspace.
	 *
	 * @param forward if true, play the event forward (redo), otherwise play it
	 *     backward (undo).
	 */
	run(forward: boolean) {
		// I can't really replicate this tbh
	}

	/**
	 * Encode the event as JSON.
	 *
	 * @returns JSON representation.
	 */
	toJson(): DataConstructorChangeJson {
		const json = super.toJson() as DataConstructorChangeJson;
		json['oldTypes'] = this.oldTypes;
		return json;
	}

	/**
	 * Deserializes the JSON event.
	 *
	 * @param json The JSON representation of a data constructor change event.
	 * @param workspace The workspace to deserialize the event into.
	 * @returns The new data constructor change return event.
	 * @internal
	 */
	static fromJson(
		json: DataConstructorChangeJson,
		workspace: TypeWorkspace,
	): DataConstructorChange {
		const model = workspace.getDataTypeMap().getDataConsMap().get(json['dataConsId']);
		if (!model) {
			throw new Error(
				'Cannot deserialize data constructor change return event because the ' +
					'target data constructor does not exist',
			);
		}
		return new DataConstructorChange(workspace, model, json['oldTypes']);
	}
}

export interface DataConstructorChangeJson extends DataConstructorBaseJson {
	oldTypes: string[] | null;
}

Blockly.registry.register(
	Blockly.registry.Type.EVENT,
	DataConstructorChange.TYPE,
	DataConstructorChange,
);