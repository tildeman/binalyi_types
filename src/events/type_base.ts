/**
 * @license
 * Copyright 2024 tildeman
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly';
import { ITypeModel } from '../models/interfaces/i_type_model.js';

/**
 * The base event for an event associated with a type.
 */
export abstract class TypeBase extends Blockly.Events.Abstract {
	static readonly TYPE: string = 'dc_base';

	/** A string used to check the type of the event. */
	type = TypeBase.TYPE;

	isBlank = false;

	/**
	 * Constructs the base type event.
	 *
	 * @param workspace The workspace the type model exists in.
	 * @param type_ The type model associated with this event.
	 */
	constructor(
		workspace: Blockly.Workspace,
		readonly type_: ITypeModel,
	) {
		super();
		this.workspaceId = workspace.id;
	}

	/**
	 * Encode the event as JSON.
	 *
	 * @returns JSON representation.
	 */
	toJson(): TypeBaseJson {
		const json = super.toJson() as TypeBaseJson;
		json.typeId = this.type_.getId();
		return json;
	}
}

export interface TypeBaseJson extends Blockly.Events.AbstractEventJson {
	typeId: string;
}