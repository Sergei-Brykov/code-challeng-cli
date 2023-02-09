const NOT_VALID_HEADERS = `
	    Your headers must be "id" and "json".

	    Example:
	    ================
	    id,json
	    1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
	    2,"[1, 2, 3, 4]"
	    ================
      `;

const NOT_VALID_ID = "You must provide id";
const NOT_VALID_JSON = `You must provide second column as valid JSON

      Example:
	    ================
	    id,json
	    1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
	    2,"[1, 2, 3, 4]"
	    ================
      `;
export class NotValidCsvFile extends Error {
  static readonly NOT_VALID_HEADERS: string = NOT_VALID_HEADERS;

  constructor(message: string | undefined) {
    super(message);
  }
}
