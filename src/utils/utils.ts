export const removeDuplicates = <T>(arr: T[]): T[] => {
  const uniqueSet = new Set(arr);
  return Array.from(uniqueSet);
};
