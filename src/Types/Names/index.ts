export const female_names = [
    "Alana",
    "Clavdia",
    "Danya",
    "Dezdrelda",
    "Diavola",
    "Dorina",
    "Drasha",
    "Drilvia",
    "Elisabeta",
    "Fatima",
    "Grilsha",
    "Isabella",
    "Ivana",
    "Jarzinka",
    "Kala",
    "Katerina",
    "Kereza",
    "Korina",
    "Lavinia",
    "Magda",
    "Marta",
    "Mathilda",
    "Minodora",
    "Mirabel",
    "Miruna",
    "Nimira",
    "Nyanka",
    "Olivenka",
    "Ruxandra",
    "Serina",
    "Tereska",
    "Valentina",
    "Vasha",
    "Victoria",
    "Wensencia",
    "Zondra",
];

export const male_names = [
    "Alek",
    "Andrej",
    "Anton",
    "Balthazar",
    "Bogan",
    "Boris",
    "Dargos",
    "Darzin",
    "Dragomir",
    "Emeric",
    "Falkon",
    "Frederich",
    "Franz",
    "Gargosh",
    "Gorek",
    "Grygori",
    "Hans",
    "Harkus",
    "Ivan",
    "Jirko",
    "Kobal",
    "Korga",
    "Krystofor",
    "Lazio",
    "Livius",
    "Marek",
    "Miroslav",
    "Nikolaj",
    "Nimir",
    "Oleg",
    "Radovan",
    "Radu",
    "Seraz",
    "Sergei",
    "Stefan",
    "Tural",
    "Valentin",
    "Vasily",
    "Vladislav",
    "Waltar",
    "Yesper",
    "Zsolt",
];

export const family_names = [
    "Alastroi",
    "Antonovich",
    "Antonova",
    "Barthos",
    "Belasco",
    "Cantemir",
    "Dargovich",
    "Dargova",
    "Diavolov",
    "Diminski",
    "Dilisnya",
    "Drazkoi",
    "Garvinski",
    "Grejenko",
    "Groza",
    "Grygorovich",
    "Grygorova",
    "Ivanovich",
    "Ivanova",
    "Janek",
    "Karushkin",
    "Konstantinovich",
    "Konstantinova",
    "Krezkov ",
    "Krezkova",
    "Krykski",
    "Lansten",
    "Lazarescu",
    "Lukresh",
    "Lipsiege",
    "Martikov",
    "Martikova",
    "Mironovich",
    "Mironovna",
    "Moldovar",
    "Nikolovich",
    "Nikolova",
    "Nimirovich",
    "Nimirova",
    "Oronovich",
    "Oronova",
    "Petrovich",
    "Petrovna",
    "Polensky",
    "Radovich",
    "Radova",
    "Rilsky",
    "Stefanovich",
    "Stefanova",
    "Strazni",
    "Swilovich",
    "Swilova",
    "Taltos",
    "Targolov",
    "Targolova",
    "Tyminski",
    "Ulbrek",
    "Ulrich",
    "Vadu",
    "Voltanescu",
    "Zalenski",
    "Zalken",
];

export const getFemaleName = () => {
    const first_name_index = Math.floor(Math.random() * female_names.length);
    const family_name_index = Math.floor(Math.random() * family_names.length);
    return `${female_names[first_name_index]} ${family_names[family_name_index]}`;
};

export const getMaleName = () => {
    const first_name_index = Math.floor(Math.random() * male_names.length);
    const family_name_index = Math.floor(Math.random() * family_names.length);
    return `${male_names[first_name_index]} ${family_names[family_name_index]}`;
};
