export const isEven = (v: number) => v % 2 === 0;
export const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);
