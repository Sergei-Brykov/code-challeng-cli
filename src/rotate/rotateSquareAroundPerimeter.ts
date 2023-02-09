export const rotateSquareAroundPerimeter = ({
  inputTable,
  resultTable,
  edgeLength,
  innerSquareDepth,
  clockwiseDirection = "clockwise",
}: {
  inputTable: (string | number)[][];
  resultTable: (string | number)[][];
  edgeLength: number;
  innerSquareDepth: number;
  clockwiseDirection?: "counter-clockwise" | "clockwise";
}) => {
  const countOfMovedItem = edgeLength - innerSquareDepth * 2 - 1;
  const firstRowIndex = innerSquareDepth;
  const firstColumnIndex = innerSquareDepth;
  const lastRowIndex = edgeLength - innerSquareDepth - 1;
  const lastColumnIndex = edgeLength - innerSquareDepth - 1;

  rotateSideOfSquare("right");
  rotateSideOfSquare("down");
  rotateSideOfSquare("left");
  rotateSideOfSquare("up");

  function rotateSideOfSquare(direction: "left" | "right" | "up" | "down") {
    for (let index = 0; index < countOfMovedItem; index++) {
      const rowFirstDirections =
        clockwiseDirection === "clockwise"
          ? ["right", "down"]
          : ["left", "down"];
      const columnFirstDirections =
        clockwiseDirection === "clockwise"
          ? ["right", "up"]
          : ["right", "down"];

      const rowIndex = rowFirstDirections.includes(direction)
        ? firstRowIndex
        : lastRowIndex;
      const columnIndex = columnFirstDirections.includes(direction)
        ? firstColumnIndex
        : lastColumnIndex;

      let resultRowIndex = rowIndex;
      let inputRowIndex = rowIndex;

      let resultColumnIndex = columnIndex;
      let inputColumnIndex = columnIndex;

      switch (`${direction}-${clockwiseDirection}`) {
        case "right-clockwise":
          resultColumnIndex += index + 1;
          inputColumnIndex += index;
          break;
        case "down-clockwise":
          resultRowIndex += index + 1;
          inputRowIndex += index;
          break;
        case "left-clockwise":
          resultColumnIndex -= index + 1;
          inputColumnIndex -= index;
          break;
        case "up-clockwise":
          resultRowIndex -= index + 1;
          inputRowIndex -= index;
          break;
        case "right-counter-clockwise":
          resultColumnIndex += 1 + index;
          inputColumnIndex += index;
          break;
        case "down-counter-clockwise":
          resultRowIndex += 1 + index;
          inputRowIndex += index;
          break;
        case "left-counter-clockwise":
          resultColumnIndex -= 1 + index;
          inputColumnIndex -= index;
          break;
        case "up-counter-clockwise":
          resultRowIndex -= 1 + index;
          inputRowIndex -= index;
          break;
      }

      resultTable[resultRowIndex][resultColumnIndex] =
        inputTable[inputRowIndex][inputColumnIndex];
    }
  }
};
