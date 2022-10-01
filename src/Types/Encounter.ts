interface Abilities {
    strength: number | null;
    dexterity: number | null;
    constitution: number | null;
    intelligence: number | null;
    wisdom: number | null;
    charisma: number | null;
}

export interface EncounterCharacter {
    id: number;
    name: string;
    isEnemy: boolean;
    enemyId?: number;
    initiative: number;
    armorClass: number;
    health: number;
    maxHealth: number;
    speed: number;
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}

export interface Monster {
    id: number;
    name: string;
    challenge: number;
    type: string;
    size: string;
    armor_class: number;
    health: number;
    alignement: string;
}

export interface MonsterDetails {
    id: number;
    name: string;
    type: string;
    alignement: string;
    challenge: number;
    armor_class: number;
    armor_type: string;
    health: number;
    health_formula: string;
    speed: number;
    speed_other: string[];
    abilities: Abilities;
    skills: string[];
    saving_throws: Abilities;
    damage_vulnerabilities: string[];
    damage_resistances: string[];
    damage_immunities: string[];
    condition_immunities: string[];
    languages: string[];
    passives: {string: string};
    actions: {string: string};
    image: string;
    source: string;
    // size: string;
}