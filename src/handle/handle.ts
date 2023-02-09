import { parse } from "@fast-csv/parse";
import { format } from "@fast-csv/format";
import fs from "fs";
import { rowHandler } from "./rowHandler";
import { errorHandler } from "./errorHandler";

export const handleCsv = (streamFileCsv: fs.ReadStream) => {
  const outStream = format({
    headers: true,
    quoteColumns: {
      json: true,
    },
    quoteHeaders: {
      json: false,
    },
  });
  outStream.on("end", () => process.exit());

  const endHandler = () => outStream.end();
  streamFileCsv.pipe(
    parse({ headers: true })
      .on("error", errorHandler)
      .on("data", (row) => rowHandler(row, outStream))
      .on("end", endHandler)
  );

  return outStream;
};
