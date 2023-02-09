import { NotValidCsvFile } from "../exceptions/NotValidCsvFile";
import { NotValidRow } from "../exceptions/NotValidRow";
import { validateRow } from "./validateRow";

describe("validateRow should throw an error if the headers are wrong", () => {
  const errorHeaders_case_1 = { id_error: "ids", json_error: "json_error" };
  const errorHeaders_case_2 = { ids: "ids", jsons: "json_error" };
  try {
    validateRow(errorHeaders_case_1);
  } catch (e) {
    expect(e).toBeInstanceOf(NotValidCsvFile);
  }
  try {
    validateRow(errorHeaders_case_2);
  } catch (e) {
    expect(e).toBeInstanceOf(NotValidCsvFile);
  }
});

describe("validateRow should return invalid state...", () => {
  it("...when id is empty", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.NOT_VALID_ID,
    };
    expect(validateRow({ id: "", json: "[]" })).toEqual(expectState);
    expect(validateRow({ id: null, json: "[]" })).toEqual(expectState);
  });

  it("...when json is broken or empty", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.NOT_VALID_JSON,
    };
    expect(validateRow({ id: "1", json: "[, " })).toEqual(expectState);
    expect(validateRow({ id: 1, json: true })).toEqual(expectState);
    expect(validateRow({ id: 1, json: 1 })).toEqual(expectState);
    expect(validateRow({ id: 1, json: "" })).toEqual(expectState);
  });

  it("...when json object is not array", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.NOT_VALID_ARRAY,
    };

    const rowCase_1 = { id: 1, json: JSON.stringify(new Map()) };
    const rowCase_2 = { id: 1, json: JSON.stringify({}) };
    expect(validateRow(rowCase_1)).toEqual(expectState);
    expect(validateRow(rowCase_2)).toEqual(expectState);
  });

  it("...when array is empty", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.EMPTY_ARRAY,
    };

    const rowCase_1 = { id: 1, json: JSON.stringify([]) };

    expect(validateRow(rowCase_1)).toEqual(expectState);
  });

  it("...when array is empty", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.EMPTY_ARRAY,
    };

    const rowCase_1 = { id: 1, json: JSON.stringify([]) };

    expect(validateRow(rowCase_1)).toEqual(expectState);
  });

  it("...when array is not square", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.ARRAY_IS_NOT_SQUARE,
    };

    const rowCase_1 = { id: 1, json: JSON.stringify(Array(3).fill(1)) };
    const rowCase_2 = { id: 1, json: JSON.stringify(Array(2).fill(1)) };
    const rowCase_3 = { id: 1, json: JSON.stringify(Array(7).fill(1)) };

    expect(validateRow(rowCase_1)).toEqual(expectState);
    expect(validateRow(rowCase_2)).toEqual(expectState);
    expect(validateRow(rowCase_3)).toEqual(expectState);
  });

  it("...when array is not valid one of array item", () => {
    const expectState = {
      is_valid: false,
      error_message: NotValidRow.NOT_VALID_ARRAY_ITEM,
    };

    const validArray = [1, 2, "4"];
    const rowCase_1 = {
      id: 1,
      json: JSON.stringify([...validArray, {}]),
    };
    const rowCase_2 = {
      id: 1,
      json: JSON.stringify([...validArray, []]),
    };
    const rowCase_3 = {
      id: 1,
      json: JSON.stringify([...validArray, true]),
    };

    expect(validateRow(rowCase_1)).toEqual(expectState);
    expect(validateRow(rowCase_2)).toEqual(expectState);
    expect(validateRow(rowCase_3)).toEqual(expectState);
  });
});

describe("validateRow return valid state", () => {
  const expectState = {
    is_valid: true,
    error_message: null,
  };

  it("1 item ", () => {
    const rowCase = {
      id: 1,
      json: JSON.stringify([5]),
    };
    expect(validateRow(rowCase)).toEqual(expectState);
  });
  it("4 item ", () => {
    const rowCase = {
      id: 1,
      json: JSON.stringify([1, 2, 3, 4]),
    };
    expect(validateRow(rowCase)).toEqual(expectState);
  });
  it("9 item ", () => {
    const rowCase = {
      id: 1,
      json: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    };
    expect(validateRow(rowCase)).toEqual(expectState);
  });
  it("144 item ", () => {
    const rowCase = {
      id: 1,
      json: JSON.stringify(
        Array(144)
          .fill(0)
          .map((_, index) => ++index)
      ),
    };
    expect(validateRow(rowCase)).toEqual(expectState);
  });
});
