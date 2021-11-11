"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMemoryGrowTimestamp = exports.getInstance = void 0;
const load_1 = require("./load");
let inst = null;
let HEAP32 = new Int32Array();
const clock_gettime = (clk_id, tp) => {
    const now = Date.now();
    HEAP32[tp >> 2] = (now / 1e3) | 0;
    HEAP32[(tp + 4) >> 2] = ((now % 1e3) * 1e3 * 1e3) | 0;
    return 0;
};
let lastGrowTimestamp = 0;
const emscripten_notify_memory_growth = (idx) => {
    if (lastGrowTimestamp) {
        console.info('zbar.wasm: Memory Grow: ', inst.memory.buffer.byteLength);
    }
    lastGrowTimestamp = Date.now();
    HEAP32 = new Int32Array(inst.memory.buffer);
};
const importObj = {
    env: {
        clock_gettime,
        emscripten_notify_memory_growth
    }
};
let instPromise = (async () => {
    const res = await load_1.loadWasmInstance(importObj);
    if (!res) {
        throw Error('WASM was not loaded');
    }
    inst = res.exports;
    emscripten_notify_memory_growth(0);
    return inst;
})();
exports.getInstance = async () => {
    return await instPromise;
};
exports.getMemoryGrowTimestamp = () => {
    return lastGrowTimestamp;
};
//# sourceMappingURL=instance.js.map