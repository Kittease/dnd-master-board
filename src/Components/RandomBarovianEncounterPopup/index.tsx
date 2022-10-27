import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Typography,
    DialogActions,
    Button,
} from "@mui/material";
import React from "react";
import { rollDices } from "../../Technical/roll";

const getDaytimeEncounter = (index: number) => {
    switch (index) {
        case 2:
            return `${rollDices(3, 6)} Barovian commoners`;
        case 3:
            return `${rollDices(1, 6)} Barovian scouts`;
        case 4:
            return "Hunting trap";
        case 5:
            return "Grave";
        case 6:
            return "False trail";
        case 7:
            return `${rollDices(1, 4) + 1} Vistani bandits`;
        case 8:
            return "Skeletal rider";
        case 9:
            return "Trinket";
        case 10:
            return "Hidden bundle";
        case 11:
            if (Math.random() <= 0.5)
                return `${rollDices(1, 4)} swarms of ravens`;
            return "Wereraven";
        case 12:
            return `${rollDices(1, 6)} dire wolves`;
        case 13:
            return `${rollDices(3, 6)} wolves`;
        case 14:
            return `${rollDices(1, 4)} berserkers`;
        case 15:
            return "Corpse";
        case 16:
            return `${rollDices(1, 6)} werewolves in human form`;
        case 17:
            return `1 druid with ${rollDices(2, 6)} twig blights`;
        case 18:
            return `${rollDices(2, 4)} needle blights`;
        case 19:
            return `${rollDices(1, 6)} scarecrows`;
        case 20:
            return "1 revenant";
    }
};

const getNighttimeEncounter = (index: number) => {
    switch (index) {
        case 2:
            return "1 ghost";
        case 3:
            return "Hunting trap";
        case 4:
            return "Grave";
        case 5:
            return "Trinket";
        case 6:
            return "Corpse";
        case 7:
            return "Hidden bundle";
        case 8:
            return "Skeletal rider";
        case 9:
            return `${rollDices(1, 8)} swarms of bats`;
        case 10:
            return `${rollDices(1, 6)} dire wolves`;
        case 11:
            return `${rollDices(3, 6)} wolves`;
        case 12:
            return `${rollDices(1, 4)} berserkers`;
        case 13:
            return `1 druid with ${rollDices(2, 6)} twig blights`;
        case 14:
            return `${rollDices(2, 4)} needle blights`;
        case 15:
            return `${rollDices(1, 6)} werewolves in wolf form`;
        case 16:
            return `${rollDices(3, 6)} zombies`;
        case 17:
            return `${rollDices(1, 6)} scarecrows`;
        case 18:
            return `${rollDices(1, 8)} Strahd zombies`;
        case 19:
            return "1 will-o'-wisp";
        case 20:
            return "1 revenant";
    }
};

interface RandomBarovianEncounterPopupProps {
    daytime: boolean;
    isOpen: boolean;
    handleClose: () => void;
}

const RandomBarovianEncounterPopup = ({
    daytime,
    isOpen,
    handleClose,
}: RandomBarovianEncounterPopupProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Barovian Encounter
            </DialogTitle>

            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="h1" id="random-character-name">
                        {daytime
                            ? getDaytimeEncounter(
                                  rollDices(1, 12) + rollDices(1, 8)
                              )
                            : getNighttimeEncounter(
                                  rollDices(1, 12) + rollDices(1, 8)
                              )}
                    </Typography>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RandomBarovianEncounterPopup;
