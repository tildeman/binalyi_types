/**
 * @license
 * Copyright 2024 tildeman
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { IDataConstructorModel } from '../models/interfaces/i_data_constructor_model.js';

/**
 * The base event for an event associated with a data constructor.
 */
export abstract class DataConstructorBase extends Blockly.Events.Abstract {
	static readonly TYPE: string = 'dc_base';

	/** A string used to check the type of the event. */
	type = DataConstructorBase.TYPE;

	isBlank = false;

	/**
	 * Constructs the base data constructor event.
	 *
	 * @param workspace The workspace the data constructor model exists in.
	 * @param datacons The data constructor model associated with this event.
	 */
	constructor(
		workspace: Blockly.Workspace,
		readonly datacons: IDataConstructorModel,
	) {
		super();
		this.workspaceId = workspace.id;
	}

	/**
	 * Encode the event as JSON.
	 *
	 * @returns JSON representation.
	 */
	toJson(): DataConstructorBaseJson {
		const json = super.toJson() as DataConstructorBaseJson;
		json.dataConsId = this.datacons.getId();
		return json;
	}
}

export interface DataConstructorBaseJson extends Blockly.Events.AbstractEventJson {
	dataConsId: string;
}