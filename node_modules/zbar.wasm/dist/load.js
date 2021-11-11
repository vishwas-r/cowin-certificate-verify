"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadWasmInstance = void 0;
const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
exports.loadWasmInstance = async (importObj) => {
    const binary = await readFile(__dirname + '/zbar.wasm');
    const output = await WebAssembly.instantiate(binary, importObj);
    return output.instance;
};
//# sourceMappingURL=load.js.map