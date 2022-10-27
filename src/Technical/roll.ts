export const rollDice = (dice: number) => {
  const max = dice + 1;
  return Math.floor(Math.random() * (max - 1) + 1);
}