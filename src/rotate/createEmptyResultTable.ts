import chunk from "../helpers/chunk";

export const createEmptyResultTable = (input: any[], edgeLength: number) => {
  const emptyResult = [...input].fill(null);
  return chunk(emptyResult, edgeLength);
};
