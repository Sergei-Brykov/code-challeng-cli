import { NotValidRow } from "../exceptions/NotValidRow";
import chunk from "../helpers/chunk";
import { calculateEdgeLength } from "../helpers/calculateEdgeLength";
import { createEmptyResultTable } from "./createEmptyResultTable";
import { rotateSquareAroundPerimeter } from "./rotateSquareAroundPerimeter";

type TableValue = string | number;

export type TableData = TableValue[][];

export class Table {
  edgeLength: number;
  private isTableHaveSingularity: boolean;
  numberOfInternalPerimeters: number;
  table: TableData;
  private emptyTableForRotate: TableData;
  constructor(input: TableValue[]) {
    if (input.length === 0) {
      // You should always validate data before sending it to this function!
      throw new NotValidRow(NotValidRow.EMPTY_ARRAY);
    }
    this.edgeLength = calculateEdgeLength(input.length);
    this.isTableHaveSingularity = !Number.isInteger(this.edgeLength / 2);
    this.numberOfInternalPerimeters = Math.floor(this.edgeLength / 2);

    this.table = chunk(input, this.edgeLength);
    const emptyTableForRotate = createEmptyResultTable(input, this.edgeLength);
    if (this.isTableHaveSingularity) {
      this.addCenterElement(emptyTableForRotate);
    }
    this.emptyTableForRotate = emptyTableForRotate;
  }

  private addCenterElement(newTable: TableData) {
    const centerIndex = Math.floor(this.edgeLength / 2);

    newTable[centerIndex][centerIndex] = this.table[centerIndex]![centerIndex];
  }

  rotate(clockwiseDirection: "counter-clockwise" | "clockwise" = "clockwise") {
    const resultTable: TableData = [...this.emptyTableForRotate];

    const dto = {
      resultTable,
      inputTable: this.table,
      edgeLength: this.edgeLength,
      innerSquareDepth: 0,
      clockwiseDirection,
    };
    for (let index = 0; index < this.numberOfInternalPerimeters; index++) {
      dto.innerSquareDepth = index;
      rotateSquareAroundPerimeter(dto);
    }
    this.table = resultTable;
  }

  toArray() {
    return this.table.flat();
  }
}
