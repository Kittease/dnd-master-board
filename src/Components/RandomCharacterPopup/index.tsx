import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import { getRandomAbilityScore } from "../../Technical/roll";
import { getFemaleName, getMaleName } from "../../Types/Names";

interface RandomCharacterPopupProps {
    title: string;
    isMale: boolean;
    isOpen: boolean;
    handleClose: () => void;
}

const RandomCharacterPopup = ({
    title,
    isMale,
    isOpen,
    handleClose,
}: RandomCharacterPopupProps) => {
    const characterHasASoul = () => {
        return Math.random() <= 0.1;
    };

    const name = isMale ? getMaleName() : getFemaleName();

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="h1" id="random-character-name">
                        {name}
                    </Typography>

                    <Typography paragraph>
                        Has a soul: <b>{characterHasASoul() ? "Yes" : "No"}</b>
                    </Typography>

                    <Box id="random-character-abilities">
                        <Box className="random-character-ability">
                            <Typography variant="h1">DEX</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                        <Box className="random-character-ability">
                            <Typography variant="h1">STR</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                        <Box className="random-character-ability">
                            <Typography variant="h1">CON</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                        <Box className="random-character-ability">
                            <Typography variant="h1">INT</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                        <Box className="random-character-ability">
                            <Typography variant="h1">WIS</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                        <Box className="random-character-ability">
                            <Typography variant="h1">CHA</Typography>
                            <Typography variant="h2">
                                {getRandomAbilityScore()}
                            </Typography>
                        </Box>
                    </Box>
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

export default RandomCharacterPopup;
