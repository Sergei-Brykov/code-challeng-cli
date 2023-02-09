export type InputTable = (string | number)[];
export const parseInputTable = (json: string) => JSON.parse(json) as InputTable;
export const stringifyOutputTable = (array: (string | number)[]) => {
  return "[" + array.join(", ") + "]";
};
