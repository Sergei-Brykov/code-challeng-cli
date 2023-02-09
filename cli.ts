import * as path from "path";
import { app } from "./src/app";

const filePatch = process.argv[2];

if (!filePatch) {
	throw new Error("Please pass file path as first argument");
}

const inputFilePatch = path.join(process.cwd(), filePatch);

app(inputFilePatch);
