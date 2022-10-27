import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton } from "@mui/material";
import {
    DataGrid,
    GridCallbackDetails,
    GridCellEditCommitParams,
    GridColDef,
    MuiBaseEvent,
    MuiEvent,
} from "@mui/x-data-grid";
import React from "react";
import { EncounterCharacter } from "../Types/Encounter";

interface EncounterProps {
    encounterCharacters: EncounterCharacter[];
    setEncounterCharacters: (encounterCharacters: EncounterCharacter[]) => void;
    setUnsavedChanges: (state: boolean) => void;
    handleEncounterPopupOpening: (event: React.MouseEvent<HTMLElement>) => void;
}

const Encounter = ({
    encounterCharacters,
    setEncounterCharacters,
    setUnsavedChanges,
    handleEncounterPopupOpening,
}: EncounterProps) => {
    const columns: GridColDef[] = [
        {
            field: "name",
            headerName: "Name",
            width: 200,
            editable: true,
            sortable: false,
        },
        {
            field: "isPlayer",
            type: "boolean",
            hide: true,
        },
        {
            field: "initiative",
            headerName: "Initiative",
            type: "number",
            width: 120,
            headerAlign: "center",
            align: "center",
            editable: true,
        },
        {
            field: "armorClass",
            headerName: "Armor Class",
            type: "number",
            width: 120,
            headerAlign: "center",
            align: "center",
            editable: true,
            sortable: false,
        },
        {
            field: "health",
            headerName: "Health",
            type: "number",
            width: 120,
            headerAlign: "center",
            align: "center",
            editable: true,
            sortable: false,
        },
        {
            field: "maxHealth",
            headerName: "Max Health",
            type: "number",
            width: 120,
            headerAlign: "center",
            align: "center",
            editable: true,
            sortable: false,
        },
        {
            field: "delete",
            headerName: "Delete",
            headerAlign: "center",
            align: "center",
            sortable: false,
            renderCell: (params) => {
                const deleteRow = (e: React.MouseEvent<HTMLButtonElement>) => {
                    setUnsavedChanges(true);
                    setEncounterCharacters(
                        encounterCharacters.filter(
                            (char: EncounterCharacter) => {
                                return char.id !== params.id;
                            }
                        )
                    );
                };

                return (
                    <IconButton onClick={deleteRow} aria-label="delete">
                        <ClearIcon fontSize={"small"} />
                    </IconButton>
                );
            },
        },
    ];

    const updateRow = (
        params: GridCellEditCommitParams,
        event: MuiEvent<MuiBaseEvent>,
        details: GridCallbackDetails
    ) => {
        setUnsavedChanges(true);
        encounterCharacters.map((row: EncounterCharacter) => {
            if (row.id === params.id) {
                const newRow: EncounterCharacter = row;
                const field: string = params.field;
                (newRow as any)[field] = params.value;
                return newRow;
            }
            return row;
        });
    };

    return (
        <Box
            sx={{
                "& .player div:nth-of-type(1) div": {
                    color: "green",
                    fontWeight: "bold",
                },
                "& .enemy div:nth-of-type(1) div": {
                    color: "red",
                    fontWeight: "bold",
                },
            }}
            id="encounter"
            className="block no-padding"
        >
            <Box className="controls">
                <IconButton
                    onClick={handleEncounterPopupOpening}
                    aria-label="add"
                >
                    <AddIcon />
                </IconButton>
            </Box>

            <DataGrid
                className="no-border"
                columns={columns}
                rows={encounterCharacters}
                disableColumnMenu
                hideFooter
                initialState={{
                    sorting: {
                        sortModel: [{ field: "initiative", sort: "desc" }],
                    },
                }}
                onCellEditCommit={updateRow}
                getRowClassName={(params) =>
                    params.row.isEnemy ? "enemy" : "player"
                }
            />
        </Box>
    );
};

export default Encounter;
