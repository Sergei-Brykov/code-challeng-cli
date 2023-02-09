import * as path from "path";
import { app } from "./app";

const filePatch = process.argv[2];

if (!filePatch) {
  throw new Error("Please pass file path as first argument");
}

// ../ because dev-cli.js in path ./src
const inputFilePatch = path.join(__dirname, "../", filePatch);

app(inputFilePatch);
