import { globalBaseModels } from "../../models/observable_type_model.js";
import { ForceCapitalize } from "../../utilities/force_capitalize.js";
import { PlaceholderBlock } from "../types/placeholder_block.js";

export type PlaceholderTypes = ForceCapitalize<keyof typeof globalBaseModels>;
export type PlaceholderUpdateTypeMixin = typeof placeholderUpdateTypeMixin;

export const placeholderUpdateTypeMixin = {
	updateType(this: PlaceholderBlock, newValue: string) {
		this.getModel()?.setName(newValue);
	}
};