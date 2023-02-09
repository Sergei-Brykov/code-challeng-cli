import { CsvFormatterStream } from "fast-csv";
import { Table } from "../rotate/Table";
import { validateRow } from "../validate/validateRow";
import { parseInputTable, stringifyOutputTable } from "./parseInputTable";

type Row = {
  id: string;
  json: string;
};

export const rowHandler = (
  row: any,
  outputStream: CsvFormatterStream<Row, Row>
) => {
  const { is_valid } = validateRow(row);
  const { json, id } = row as Row;
  if (!is_valid) {
    outputStream.write({ id, json: stringifyOutputTable([]), is_valid });
    return;
  }
  const inputTable = parseInputTable(json);

  const table = new Table(inputTable);
  table.rotate();
  const outputTable = table.toArray();
  outputStream.write({ id, json: stringifyOutputTable(outputTable), is_valid });
};
