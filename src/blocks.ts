import * as Blockly from "blockly";
import { dataConstructorInitalizeModel } from "./block_features/extensions/dc_initializemodel.js";
import { dataConstructorUpdateShape } from "./block_features/extensions/dc_updateshape.js";
import { blockDefs as BLOCK_DEFINITIONS } from "./block_features/block_definitions.js";
import { updateShapeExtension } from "./block_features/extensions/update_shape.js";

import { primitiveTooltips as TOOLTIPS_BY_TYPE } from "./block_features/extensions/primitive_tooltips.js";
import { dataConstructorContextMenuMixin } from "./block_features/mixins/dc_contextmenu.js";
import { primitiveContextMenuMixin } from "./block_features/mixins/primitive_contextmenu.js";
import { primitiveUpdateTypeMixin } from "./block_features/mixins/primitive_updatetype.js";
import { primitiveOnChangeMixin } from "./block_features/mixins/primitive_onchange.js";
import { disconnectBlocksMixin } from "./block_features/mixins/disconnect_blocks.js";
import { primitiveGetDefMixin } from "./block_features/mixins/primitive_getdef.js";
import { typeContextMenuMixin } from "./block_features/mixins/type_contextmenu.js";
import { dataConstructorDefGetDefMixin } from "./block_features/mixins/dc_dgd.js";
import { dataConstructorRenameMixin } from "./block_features/mixins/dc_rename.js";
import { typeRefGetDefMixin } from "./block_features/mixins/type_getdef.js";

import { DataConstructorGetMutator } from "./block_features/mutators/dc_get.js";
import { ProductTypeMutator } from "./block_features/mutators/product_type.js";
import { DataConstructorMutator } from "./block_features/mutators/dc_def.js";
import { TypeDefMutator } from "./block_features/mutators/type.js";
import { placeholderGetDefMixin } from "./block_features/mixins/ph_getdef.js";
import { placeholderUpdateTypeMixin } from "./block_features/mixins/ph_updatetype.js";
import { placeholderOnChangeMixin } from "./block_features/mixins/ph_onchange.js";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray(BLOCK_DEFINITIONS);

Blockly.Extensions.register("types_tooltip", Blockly.Extensions.buildTooltipForDropdown("TYPE", TOOLTIPS_BY_TYPE));
Blockly.Extensions.registerMixin("primitive_dgd", primitiveGetDefMixin);
Blockly.Extensions.registerMixin("primitive_onchange", primitiveOnChangeMixin);
Blockly.Extensions.registerMixin("primitive_updatetype", primitiveUpdateTypeMixin);
Blockly.Extensions.registerMixin("primitive_contextmenu", primitiveContextMenuMixin);

Blockly.Extensions.registerMixin("placeholder_getdef", placeholderGetDefMixin);
Blockly.Extensions.registerMixin("placeholder_updatetype", placeholderUpdateTypeMixin);
Blockly.Extensions.registerMixin("placeholder_onchange", placeholderOnChangeMixin);

Blockly.Extensions.registerMutator(
	"tuple_type_mutator", ProductTypeMutator,
	undefined, ["types_mutator_item"]
);

Blockly.Extensions.register("types_post_initialization", updateShapeExtension);
Blockly.Extensions.registerMixin("disconnect_blocks_mixin", disconnectBlocksMixin);

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