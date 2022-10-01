import { useEffect, useRef, useState } from "react";
import { getMonster, getMonsters } from "./Services/api";
import Encounter from "./Components/Encounter";
import { EncounterCharacter, Monster } from "./Types/Encounter";
import { male_names, female_names, family_names } from "./Types/Names";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    FormControlLabel,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import SaveIcon from "@mui/icons-material/Save";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import "./App.css";

const GetMaleName = () => {
    const first_name_index = Math.floor(Math.random() * male_names.length);
    const family_name_index = Math.floor(Math.random() * family_names.length);
    return `${male_names[first_name_index]} ${family_names[family_name_index]}`;
};

const GetFemaleName = () => {
    const first_name_index = Math.floor(Math.random() * female_names.length);
    const family_name_index = Math.floor(Math.random() * family_names.length);
    return `${female_names[first_name_index]} ${family_names[family_name_index]}`;
};

const App = () => {
    const [popupTitle, setPopupTitle] = useState("");
    const [popupData, setPopupData] = useState("");
    const [popupOpen, setPopupOpen] = useState(false);

    const handlePopupOpening = (title: string, data: string) => {
        setPopupTitle(title);
        setPopupData(data);
        setPopupOpen(true);
    };

    const handlePopupClosing = () => {
        setPopupOpen(false);
    };

    const notesRef = useRef<HTMLPreElement>(null);
    const [notes, setNotes] = useState<string>("");

    const [monsters, setMonsters] = useState<Monster[]>([]);

    const [encounterCharacters, setEncounterCharacters] = useState<
        EncounterCharacter[]
    >([]);

    const [encounterPopupOpen, setEncounterPopupOpen] = useState(false);

    const handleEncounterPopupOpening = () => {
        setEncounterPopupOpen(true);
    };

    const handleEncounterPopupClosing = () => {
        setEncounterPopupOpen(false);
    };

    const handleEncounterPopupSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setUnsavedChanges(true);

        const monsterName = (
            event.currentTarget.elements.namedItem(
                "monstersSearchBar"
            ) as HTMLInputElement
        ).value;

        if (monsterName) {
            const monsterId = monsters.filter(
                (value: Monster) => value.name === monsterName
            )[0].id;

            getMonster(monsterId).then((data) => {
                setEncounterCharacters([
                    ...encounterCharacters,
                    ...[
                        {
                            id: encounterCharacters.length + 1,
                            name: data.name,
                            isEnemy: true,
                            initiative: 10,
                            armorClass: data.armor_class,
                            health: data.health,
                            maxHealth: data.health,
                            speed: data.speed,
                            strength: data.abilities.strength as number,
                            dexterity: data.abilities.dexterity as number,
                            constitution: data.abilities.constitution as number,
                            intelligence: data.abilities.intelligence as number,
                            wisdom: data.abilities.wisdom as number,
                            charisma: data.abilities.charisma as number,
                        },
                    ],
                ]);
            });
        } else {
            const name = (
                event.currentTarget.elements.namedItem(
                    "name"
                ) as HTMLInputElement
            ).value;
            const isPlayer = (
                event.currentTarget.elements.namedItem(
                    "isPlayer"
                ) as HTMLInputElement
            ).checked;
            console.log(isPlayer);
            const health = (
                event.currentTarget.elements.namedItem(
                    "health"
                ) as HTMLInputElement
            ).value;
            const armorClass = (
                event.currentTarget.elements.namedItem(
                    "armorClass"
                ) as HTMLInputElement
            ).value;
            const speed = (
                event.currentTarget.elements.namedItem(
                    "speed"
                ) as HTMLInputElement
            ).value;
            const strength = (
                event.currentTarget.elements.namedItem(
                    "strength"
                ) as HTMLInputElement
            ).value;
            const dexterity = (
                event.currentTarget.elements.namedItem(
                    "dexterity"
                ) as HTMLInputElement
            ).value;
            const constitution = (
                event.currentTarget.elements.namedItem(
                    "constitution"
                ) as HTMLInputElement
            ).value;
            const intelligence = (
                event.currentTarget.elements.namedItem(
                    "intelligence"
                ) as HTMLInputElement
            ).value;
            const wisdom = (
                event.currentTarget.elements.namedItem(
                    "wisdom"
                ) as HTMLInputElement
            ).value;
            const charisma = (
                event.currentTarget.elements.namedItem(
                    "charisma"
                ) as HTMLInputElement
            ).value;

            setEncounterCharacters([
                ...encounterCharacters,
                ...[
                    {
                        id: encounterCharacters.length + 1,
                        name: name,
                        isEnemy: !isPlayer,
                        initiative: 10,
                        armorClass: parseInt(armorClass),
                        health: parseInt(health),
                        maxHealth: parseInt(health),
                        speed: parseInt(speed),
                        strength: parseInt(strength),
                        dexterity: parseInt(dexterity),
                        constitution: parseInt(constitution),
                        intelligence: parseInt(intelligence),
                        wisdom: parseInt(wisdom),
                        charisma: parseInt(charisma),
                    },
                ],
            ]);
        }
    };

    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    const loadData = () => {
        if (localStorage.getItem("notes") !== null)
            setNotes(localStorage.getItem("notes") as string);
        else setNotes("Your notes");

        if (localStorage.getItem("encounter") !== null)
            setEncounterCharacters(
                JSON.parse(localStorage.getItem("encounter") as string)
            );

        setUnsavedChanges(false);
    };

    const saveData = () => {
        if (notesRef.current)
            localStorage.setItem("notes", notesRef.current.innerText);

        localStorage.setItem("encounter", JSON.stringify(encounterCharacters));

        setUnsavedChanges(false);
    };

    const handleNoteChanges = () => {
        setUnsavedChanges(true);
    };

    window.onbeforeunload = function (e) {
        if (unsavedChanges) {
            var dialogText = "You have unsaved changes";
            e.returnValue = dialogText;
            return dialogText;
        }
        return;
    };

    useEffect(() => {
        getMonsters().then((data) => setMonsters(data));
        loadData();
    }, []);

    const filterOptions = createFilterOptions({
        matchFrom: "any",
        stringify: (option: Monster) => option.name,
    });

    return (
        <>
            <Box id="header">
                <IconButton
                    className="large-button"
                    aria-label="load"
                    onClick={() =>
                        handlePopupOpening(
                            "Random Male Character",
                            GetMaleName()
                        )
                    }
                >
                    <CasinoIcon fontSize="large" />
                    <ManIcon fontSize="large" />
                </IconButton>

                <IconButton
                    className="large-button"
                    aria-label="save"
                    onClick={() =>
                        handlePopupOpening(
                            "Random Female Character",
                            GetFemaleName()
                        )
                    }
                >
                    <CasinoIcon fontSize="large" />
                    <WomanIcon fontSize="large" />
                </IconButton>

                <IconButton aria-label="load" onClick={loadData}>
                    <CloudDownloadIcon fontSize="large" />
                </IconButton>

                <IconButton aria-label="save" onClick={saveData}>
                    <SaveIcon fontSize="large" />
                </IconButton>
            </Box>

            <Box id="grid">
                <pre
                    id="notes"
                    ref={notesRef}
                    className="block"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={handleNoteChanges}
                >
                    {notes}
                </pre>

                <Encounter
                    encounterCharacters={encounterCharacters}
                    setEncounterCharacters={setEncounterCharacters}
                    setUnsavedChanges={setUnsavedChanges}
                    handleEncounterPopupOpening={handleEncounterPopupOpening}
                />

                <Box id="map" className="block">
                    map
                </Box>
            </Box>

            <Dialog
                open={popupOpen}
                onClose={handlePopupClosing}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {popupData}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePopupClosing} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={encounterPopupOpen}
                onClose={handleEncounterPopupClosing}
            >
                <form onSubmit={handleEncounterPopupSubmit}>
                    <DialogTitle style={{ marginBottom: "10px" }}>
                        Add a Character
                    </DialogTitle>

                    <DialogContent>
                        <Autocomplete
                            id="monstersSearchBar"
                            options={monsters}
                            getOptionLabel={(option) => option.name}
                            filterOptions={filterOptions}
                            renderOption={(props, option) => (
                                <Box key={option.id} component="li" {...props}>
                                    <p style={{ margin: 0 }}>
                                        {option.name}
                                        <br />
                                        {option.size} {option.type} (CR{" "}
                                        {option.challenge})
                                    </p>
                                </Box>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Monsters" />
                            )}
                        />

                        <Divider style={{ margin: "30px 0" }}>or</Divider>

                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Name"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                style={{
                                    textAlign: "right",
                                    alignSelf: "center",
                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="isPlayer"
                                            defaultChecked
                                        />
                                    }
                                    label="PC"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField
                                    margin="dense"
                                    id="health"
                                    label="Health"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    margin="dense"
                                    id="armorClass"
                                    label="Armor Class"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    margin="dense"
                                    id="speed"
                                    label="Speed"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <TextField
                                    margin="dense"
                                    id="strength"
                                    label="STR"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="dexterity"
                                    label="DEX"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="constitution"
                                    label="CON"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="intelligence"
                                    label="INT"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="wisdom"
                                    label="WIS"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="charisma"
                                    label="CHA"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleEncounterPopupClosing}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleEncounterPopupClosing}
                            type="submit"
                        >
                            Add character
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

export default App;
