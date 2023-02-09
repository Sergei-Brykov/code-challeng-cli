import { NotValidRow } from "../exceptions/NotValidRow";

export const checkIsSquare = (length: number) => {
  const edgeLength = Math.sqrt(length);
  const isSquare = Number.isInteger(edgeLength);

  return { isSquare, edgeLength };
};

export const calculateEdgeLength = (length: number) => {
  const { isSquare, edgeLength } = checkIsSquare(length);
  if (!isSquare) {
    throw new NotValidRow(NotValidRow.ARRAY_IS_NOT_SQUARE);
  }
  return edgeLength;
};
