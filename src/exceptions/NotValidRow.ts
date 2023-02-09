const NOT_VALID_ID = "You must provide id";
const NOT_VALID_ARRAY = "You must provide Array in JSON";
const EMPTY_ARRAY = "You provided an empty array";
const NOT_VALID_ARRAY_ITEM = "One of the array items of invalid form.";
const ARRAY_IS_NOT_SQUARE = `You can't build a square from an array. Please enter the number of elements from which the square root can be taken
  Example:
    ================
    id,json
    1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
    2,"[1, 2, 3, 4]"
    ================
    `;
const NOT_VALID_JSON = `You must provide second column as valid JSON

      Example:
	    ================
	    id,json
	    1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
	    2,"[1, 2, 3, 4]"
	    ================
      `;
export class NotValidRow extends Error {
  static readonly NOT_VALID_ID: string = NOT_VALID_ID;
  static readonly NOT_VALID_JSON: string = NOT_VALID_JSON;
  static readonly NOT_VALID_ARRAY: string = NOT_VALID_ARRAY;
  static readonly NOT_VALID_ARRAY_ITEM: string = NOT_VALID_ARRAY_ITEM;
  static readonly EMPTY_ARRAY: string = EMPTY_ARRAY;
  static readonly ARRAY_IS_NOT_SQUARE: string = ARRAY_IS_NOT_SQUARE;

  constructor(message: string | undefined) {
    super(message);
  }
}
