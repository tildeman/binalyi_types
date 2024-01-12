import { Workspace, WorkspaceSvg } from "blockly";
import { IDataTypeMap } from "../models/interfaces/i_data_type_map.js"

type WorkspaceExtensions = {
    dataTypeMap: IDataTypeMap;
    /** Returns an object containing the maps of all types and of all data constructors on the workspace. */
    getDataTypeMap(): IDataTypeMap;
};

export type TypeWorkspace = Workspace & WorkspaceExtensions;

export type TypeWorkspaceSvg = WorkspaceSvg & WorkspaceExtensions;