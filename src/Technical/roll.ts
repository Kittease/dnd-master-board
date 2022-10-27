const rollDice = (dice: number) => {
  const max = dice + 1;
  return Math.floor(Math.random() * (max - 1) + 1);
}

export const rollDices = (count: number, dice: number) => {
    const rolls = []
    for (let i = 0; i < count; i++) {
        rolls.push(rollDice(dice))
    }
    return rolls.reduce((acc, a) => acc + a, 0)
}

export const getRandomAbilityScore = () => {
    const rolls = [...Array(4)].map((_) => rollDice(6));
    rolls
        .sort((a, b) => {
            return a - b;
        })
        .shift();
    return rolls.reduce((acc, a) => acc + a, 0);
};