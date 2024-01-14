import { FBlockDefinition } from "../types/blockdefs.js";

/**
 * Define suitable blocks
 */
export const blockDefs: FBlockDefinition[] = [
	{
		"type": "types_cast",
		"message0": "cast %1 to %2",
		"args0": [
			{
				"type": "input_value",
				"name": "VALUE"
			},
			{
				"type": "input_value",
				"name": "TYPE",
				"check": "Type"
			}
		],
		"output": null,
		"style": "loop_blocks",
		"tooltip": "Cast a value into a type.",
		"inputsInline": true,
		"helpUrl": ""
	},
	{
		"type": "types_list",
		"message0": "List of %1",
		"args0": [
			{
				"type": "input_value",
				"name": "SUBTYPE",
				"check": "Type"
			}
		],
		"output": "Type",
		"style": "loop_blocks",
		"tooltip": "The list of whatever type.",
		"helpUrl": ""
	},
	{
		"type": "types_tuple",
		"output": "Type",
		"style": "loop_blocks",
		"tooltip": "A product type of different things.",
		"mutator": "tuple_type_mutator",
		"extensions": [
			"types_post_initialization"
		],
		"helpUrl": ""
	},
	{
		"type": "types_maybe",
		"message0": "Maybe %1",
		"args0": [
			{
				"type": "input_value",
				"name": "TYPE",
				"check": "Type"
			}
		],
		"output": "Type",
		"style": "loop_blocks",
		"tooltip": "The anonymous error type.",
		"helpUrl": ""
	},
	{
		"type": "types_primitive",
		"message0": "%1",
		"args0": [
			{
				"type": "field_dropdown",
				"name": "TYPE",
				"options": [
					[
						"Big integer",
						"Integer"
					],
					[
						"Integer",
						"Int"
					],
					[
						"Big decimal",
						"Double"
					],
					[
						"Decimal",
						"Float"
					],
					[
						"Character",
						"Char"
					],
					[
						"Truth",
						"Bool"
					]
				]
			}
		],
		"output": "Type",
		"style": "loop_blocks",
		"extensions": [
			"types_tooltip",
			"primitive_dgd",
			"primitive_onchange",
			"primitive_updatetype",
			"primitive_contextmenu"
		],
		"helpUrl": ""
	},
	{
		"type": "types_mutator_container",
		"message0": "types %1 %2",
		"args0": [
			{
				"type": "input_dummy"
			},
			{
				"type": "input_statement",
				"name": "STACK"
			}
		],
		"style": "loop_blocks",
		"tooltip": "Add, remove, or reorder sections to reconfigure this type block.",
		"helpUrl": ""
	},
	{
		"type": "types_mutator_item",
		"message0": "type",
		"previousStatement": null,
		"nextStatement": null,
		"style": "loop_blocks",
		"tooltip": "Add a type to the product",
		"helpUrl": ""
	},
	{
		"type": "types_placeholder",
		"message0": "%1",
		"args0": [
			{
				"type": "field_input",
				"name": "NAME",
				"text": "a"
			}
		],
		"output": "Type",
		"style": "loop_blocks",
		"tooltip": "A type placeholder to be used in templates.",
		"helpUrl": ""
	},
	{
		"type": "types_dc_def",
		"message0": "data %1 of %2",
		"args0": [
			{
				"type": "field_input",
				"name": "NAME",
				"text": "Something"
			},
			{
				"type": "input_dummy",
				"name": "META"
			}
		],
		"extensions": [
			"data_constructor_def_get_def_mixin",
			"data_constructor_initialization",
			"data_constructor_initalize_model",
			"dc_context_menu_mixin",
			"disconnect_blocks_mixin",
			"dc_rename_mixin"
		],
		"mutator": "data_cons_mutator",
		"style": "loop_blocks",
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "types_type",
		"output": "Type",
		"style": "loop_blocks",
		"extensions": [
			"disconnect_blocks_mixin",
			"type_menu_mixin",
			"type_ref_get_def_mixin"
		],
		"mutator": "type_mutator",
		"tooltip": "",
		"helpUrl": ""
	},
	{
		"type": "types_dc_get",
		"output": "Type",
		"style": "loop_blocks",
		"extensions": [
			"disconnect_blocks_mixin"
		],
		"mutator": "data_cons_get_mutator",
		"tooltip": "",
		"helpUrl": ""
	},
];