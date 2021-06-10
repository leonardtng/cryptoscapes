export const roundDecimals = (num: number, places: number = 2) => {
  return Math.round(num * 10**places) / 10**places
};