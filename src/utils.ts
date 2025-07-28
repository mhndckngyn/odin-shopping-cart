export const roundDecimal = (value: number, digits: number) => {
  return Number.parseFloat(value.toFixed(digits));
};
