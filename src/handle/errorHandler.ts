import { NotValidCsvFile } from "../exceptions/NotValidCsvFile";

export const errorHandler = (error: Error) => {
  if (error instanceof NotValidCsvFile) {
    throw error;
  }
  throw new NotValidCsvFile(error.message);
};
