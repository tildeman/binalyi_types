import * as Blockly from "blockly";
import { dataConstructorInitalizeModel } from "./block_features/extensions/dc_initializemodel.js";
import { dataConstructorUpdateShape } from "./block_features/extensions/dc_updateshape.js";
import { blockDefs as BLOCK_DEFINITIONS } from "./block_features/block_definitions.js";
import { updateShapeExtension } from "./block_features/extensions/update_shape.js";

import { primitiveTooltips as TOOLTIPS_BY_TYPE } from "./block_features/extensions/primitive_tooltips.js";
import { dataConstructorContextMenuMixin } from "./block_features/mixins/data_constructors/contextmenu.js";
import { primitiveContextMenuMixin } from "./block_features/mixins/contextmenu.js";
import { primitiveUpdateTypeMixin } from "./block_features/mixins/primitives/updatetype.js";
import { primitiveOnChangeMixin } from "./block_features/mixins/primitives/onchange.js";
import { disconnectBlocksMixin } from "./block_features/mixins/disconnect_blocks.js";
import { primitiveGetDefMixin } from "./block_features/mixins/primitives/getdef.js";
import { typeContextMenuMixin } from "./block_features/mixins/types/contextmenu.js";
import { dataConstructorDefGetDefMixin } from "./block_features/mixins/data_constructors/getdef.js";
import { dataConstructorRenameMixin } from "./block_features/mixins/data_constructors/rename.js";
import { typeRefGetDefMixin } from "./block_features/mixins/types/getdef.js";

import { DataConstructorGetMutator } from "./block_features/mutators/dc_get.js";
import { TupleTypeMutator } from "./block_features/mutators/product_type.js";
import { DataConstructorMutator } from "./block_features/mutators/dc_def.js";
import { TypeDefMutator } from "./block_features/mutators/type.js";
import { placeholderGetDefMixin } from "./block_features/mixins/placeholders/getdef.js";
import { placeholderUpdateTypeMixin } from "./block_features/mixins/placeholders/updatetype.js";
import { placeholderOnChangeMixin } from "./block_features/mixins/placeholders/onchange.js";
import { listGetDefMixin } from "./block_features/mixins/lists/getdef.js";
import { listOnChangeMixin } from "./block_features/mixins/lists/onchange.js";
import { listUpdateTypeMixin } from "./block_features/mixins/lists/updatetype.js";
import { listInitialize } from "./block_features/extensions/list_initialize.js";
import { placeholderInitialize } from "./block_features/extensions/ph_initialize.js";
import { tupleInitialize } from "./block_features/extensions/tuple_initialize.js";
import { tupleGetDefMixin } from "./block_features/mixins/tuples/getdef.js";
import { tupleUpdateTypeMixin } from "./block_features/mixins/tuples/updatetype.js";
import { tupleOnChangeMixin } from "./block_features/mixins/tuples/onchange.js";
import { cascadeUpdatesMixin } from "./block_features/mixins/cascade_updates.js";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray(BLOCK_DEFINITIONS);

Blockly.Extensions.register("types_tooltip", Blockly.Extensions.buildTooltipForDropdown("TYPE", TOOLTIPS_BY_TYPE));
Blockly.Extensions.registerMixin("primitive_dgd", primitiveGetDefMixin);
Blockly.Extensions.registerMixin("primitive_onchange", primitiveOnChangeMixin);
Blockly.Extensions.registerMixin("primitive_updatetype", primitiveUpdateTypeMixin);
Blockly.Extensions.registerMixin("primitive_contextmenu", primitiveContextMenuMixin);

Blockly.Extensions.register("placeholder_initialize", placeholderInitialize);
Blockly.Extensions.registerMixin("placeholder_getdef", placeholderGetDefMixin);
Blockly.Extensions.registerMixin("placeholder_updatetype", placeholderUpdateTypeMixin);
Blockly.Extensions.registerMixin("placeholder_onchange", placeholderOnChangeMixin);

Blockly.Extensions.register("list_initialize", listInitialize);
Blockly.Extensions.registerMixin("list_getdef", listGetDefMixin);
Blockly.Extensions.registerMixin("list_onchange", listOnChangeMixin);
Blockly.Extensions.registerMixin("list_updatetype", listUpdateTypeMixin);

Blockly.Extensions.register("tuple_initialization", tupleInitialize);
Blockly.Extensions.registerMixin("tuple_getdef", tupleGetDefMixin);
Blockly.Extensions.registerMixin("tuple_onchange", tupleOnChangeMixin);
Blockly.Extensions.registerMixin("tuple_updatetype", tupleUpdateTypeMixin);
Blockly.Extensions.registerMutator(
	"tuple_type_mutator", TupleTypeMutator,
	undefined, ["types_mutator_item"]
);

Blockly.Extensions.register("types_post_initialization", updateShapeExtension);
Blockly.Extensions.registerMixin("disconnect_blocks_mixin", disconnectBlocksMixin);
Blockly.Extensions.registerMixin("cascade_updates_mixin", cascadeUpdatesMixin);

Blockly.Extensions.register("data_constructor_initialization", dataConstructorUpdateShape);
Blockly.Extensions.register("data_constructor_initalize_model", dataConstructorInitalizeModel);
Blockly.Extensions.registerMixin("data_constructor_def_get_def_mixin", dataConstructorDefGetDefMixin);
Blockly.Extensions.registerMixin("dc_context_menu_mixin", dataConstructorContextMenuMixin);
Blockly.Extensions.registerMixin("dc_rename_mixin", dataConstructorRenameMixin);
Blockly.Extensions.registerMutator(
	"data_cons_mutator", DataConstructorMutator,
	undefined, ["types_mutator_item"]
);
Blockly.Extensions.registerMutator(
	"data_cons_get_mutator", DataConstructorGetMutator,
	undefined, []
);

Blockly.Extensions.registerMixin("type_menu_mixin", typeContextMenuMixin);
Blockly.Extensions.registerMixin("type_ref_get_def_mixin", typeRefGetDefMixin);
Blockly.Extensions.registerMutator(
	"type_mutator", TypeDefMutator,
	undefined, []
);