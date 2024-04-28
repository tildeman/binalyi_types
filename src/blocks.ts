import { Extensions, common } from "blockly";

import { blockDefs as BLOCK_DEFINITIONS   } from "./block_features/block_definitions.js";
import { updateShapeExtension             } from "./block_features/extensions/update_shape.js";
import { disconnectBlocksMixin            } from "./block_features/mixins/disconnect_blocks.js";
import { cascadeUpdatesMixin              } from "./block_features/mixins/cascade_updates.js";
import { getTargetWorkspaceMixin          } from "./block_features/mixins/get_target_workspace.js";
import { getModelMixin                    } from "./block_features/mixins/get_type_model.js";
import { debugTypeMenuMixin               } from "./block_features/mixins/contextmenu.js";

import { primitiveTooltips                } from "./block_features/extensions/primitive_tooltips.js";
import { primitiveInitialize              } from "./block_features/extensions/primitive_initialize.js";
import { primitiveOnChangeMixin           } from "./block_features/mixins/primitives/onchange.js";
import { primitiveUpdateTypeMixin         } from "./block_features/mixins/primitives/updatetype.js";

import { placeholderInitialize            } from "./block_features/extensions/ph_initialize.js";
import { placeholderOnChangeMixin         } from "./block_features/mixins/placeholders/onchange.js";
import { placeholderUpdateTypeMixin       } from "./block_features/mixins/placeholders/updatetype.js";

import { listInitialize                   } from "./block_features/extensions/list_initialize.js";
import { listOnChangeMixin                } from "./block_features/mixins/lists/onchange.js";
import { listUpdateTypeMixin              } from "./block_features/mixins/lists/updatetype.js";

import { tupleInitialize                  } from "./block_features/extensions/tuple_initialize.js";
import { tupleOnChangeMixin               } from "./block_features/mixins/tuples/onchange.js";
import { tupleUpdateTypeMixin             } from "./block_features/mixins/tuples/updatetype.js";

import { dataConstructorUpdateShape       } from "./block_features/extensions/dc_updateshape.js";
import { dataConstructorInitalizeModel    } from "./block_features/extensions/dc_initializemodel.js";
import { dataConstructorDefGetDefMixin    } from "./block_features/mixins/data_constructors/getdef.js";
import { dataConstructorContextMenuMixin  } from "./block_features/mixins/data_constructors/contextmenu.js";
import { dataConstructorUpdateTypeMixin   } from "./block_features/mixins/data_constructors/updatetype.js";
import { dataConstructorOnChangeMixin     } from "./block_features/mixins/data_constructors/onchange.js";
import { dataConstructorRenameMixin       } from "./block_features/mixins/data_constructors/rename.js";
import { dataConstructorCallerGetDefMixin } from "./block_features/mixins/dc_getters/getdef.js";
import { dataConstructorGetOnChangeMixin  } from "./block_features/mixins/dc_getters/onchange.js";

import { typeRefGetDefMixin               } from "./block_features/mixins/types/getdef.js";
import { typeGetOnChangeMixin             } from "./block_features/mixins/types/onchange.js";
import { typeContextMenuMixin             } from "./block_features/mixins/types/contextmenu.js";

import { TupleTypeMutator                 } from "./block_features/mutators/product_type.js";
import { DataConstructorMutator           } from "./block_features/mutators/dc_def.js";
import { DataConstructorGetMutator        } from "./block_features/mutators/dc_get.js";
import { TypeDefMutator                   } from "./block_features/mutators/type.js";

export const blocks = common.createBlockDefinitionsFromJsonArray(BLOCK_DEFINITIONS);
const builtTooltips = Extensions.buildTooltipForDropdown("TYPE", primitiveTooltips);

// Common
Extensions.register     ("types_post_initialization" , updateShapeExtension            );
Extensions.registerMixin("disconnect_blocks_mixin"   , disconnectBlocksMixin           );
Extensions.registerMixin("cascade_updates_mixin"     , cascadeUpdatesMixin             );
Extensions.registerMixin("get_target_workspace_mixin", getTargetWorkspaceMixin         );
Extensions.registerMixin("get_type_model_mixin"      , getModelMixin                   );
Extensions.registerMixin("debug_type_menu"           , debugTypeMenuMixin              );
// Primitives
Extensions.register     ("primitive_tooltip"         , builtTooltips                   );
Extensions.register     ("primitive_initialize"      , primitiveInitialize             );
Extensions.registerMixin("primitive_onchange"        , primitiveOnChangeMixin          );
Extensions.registerMixin("primitive_updatetype"      , primitiveUpdateTypeMixin        );
// Placeholders
Extensions.register     ("placeholder_initialize"    , placeholderInitialize           );
Extensions.registerMixin("placeholder_onchange"      , placeholderOnChangeMixin        );
Extensions.registerMixin("placeholder_updatetype"    , placeholderUpdateTypeMixin      );
// Lists
Extensions.register     ("list_initialize"           , listInitialize                  );
Extensions.registerMixin("list_onchange"             , listOnChangeMixin               );
Extensions.registerMixin("list_updatetype"           , listUpdateTypeMixin             );
// Tuples
Extensions.register     ("tuple_initialization"      , tupleInitialize                 );
Extensions.registerMixin("tuple_onchange"            , tupleOnChangeMixin              );
Extensions.registerMixin("tuple_updatetype"          , tupleUpdateTypeMixin            );
// Data constructors
Extensions.register     ("dc_initialization"         , dataConstructorUpdateShape      );
Extensions.register     ("dc_initialize_model"       , dataConstructorInitalizeModel   );
Extensions.registerMixin("dc_def_get_def_mixin"      , dataConstructorDefGetDefMixin   );
Extensions.registerMixin("dc_context_menu_mixin"     , dataConstructorContextMenuMixin );
Extensions.registerMixin("dc_updatetype_mixin"       , dataConstructorUpdateTypeMixin  );
Extensions.registerMixin("dc_onchange_mixin"         , dataConstructorOnChangeMixin    );
Extensions.registerMixin("dc_rename_mixin"           , dataConstructorRenameMixin      );
Extensions.registerMixin("dc_caller_get_def_mixin"   , dataConstructorCallerGetDefMixin);
Extensions.registerMixin("dc_get_onchange_mixin"     , dataConstructorGetOnChangeMixin );
// Types
Extensions.registerMixin("type_ref_get_def_mixin"    , typeRefGetDefMixin              );
Extensions.registerMixin("type_onchange_mixin"       , typeGetOnChangeMixin            );
Extensions.registerMixin("type_menu_mixin"           , typeContextMenuMixin            );
// (Mutator UI for blocks)
Extensions.registerMutator("tuple_type_mutator"   , TupleTypeMutator         , undefined, ["types_mutator_item"]);
Extensions.registerMutator("data_cons_mutator"    , DataConstructorMutator   , undefined, ["types_mutator_item"]);
Extensions.registerMutator("data_cons_get_mutator", DataConstructorGetMutator, undefined, []                    );
Extensions.registerMutator("type_mutator"         , TypeDefMutator           , undefined, []                    );