import { NotValidCsvFile } from "../exceptions/NotValidCsvFile";
import { NotValidRow } from "../exceptions/NotValidRow";
import { checkIsSquare } from "../helpers/calculateEdgeLength";
import { ValidationState } from "./ValidState";

export const validateRow = (row: any) => {
  const validationState = new ValidationState();

  if (row.id === undefined || row.json === undefined) {
    throw new NotValidCsvFile(NotValidCsvFile.NOT_VALID_HEADERS);
  }

  if (!row.id) {
    return validationState.setError(NotValidRow.NOT_VALID_ID);
  }

  if (!row.json || typeof row.json !== "string") {
    return validationState.setError(NotValidRow.NOT_VALID_JSON);
  }

  let tableArray: (string | number)[] | null = null;
  try {
    tableArray = JSON.parse(row.json);
  } catch (e) {
    return validationState.setError(NotValidRow.NOT_VALID_JSON);
  }

  const isTableArray = Array.isArray(tableArray);
  if (!isTableArray) {
    return validationState.setError(NotValidRow.NOT_VALID_ARRAY);
  }

  const tableArrayLength = tableArray?.length || 0;

  if (tableArrayLength === 0) {
    return validationState.setError(NotValidRow.EMPTY_ARRAY);
  }
  const { isSquare } = checkIsSquare(tableArrayLength);

  if (!isSquare) {
    return validationState.setError(NotValidRow.ARRAY_IS_NOT_SQUARE);
  }

  const isAllItemInArrayValid = tableArray?.every(
    (item) => typeof item === "string" || typeof item === "number"
  );

  if (!isAllItemInArrayValid) {
    return validationState.setError(NotValidRow.NOT_VALID_ARRAY_ITEM);
  }
  return validationState;
};
