const path = require("path");
const { app } = require("./dist/index");

const filePatch = process.argv[2];

if (!filePatch) {
	throw new Error("Please pass file path as first argument");
}

const inputFilePatch = path.join(__dirname, filePatch);

app(inputFilePatch);
