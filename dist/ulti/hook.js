"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorReturn = exports.dataReturn = void 0;
const dataReturn = (data, message) => {
    return {
        status: true,
        data: data,
        message: message
    };
};
exports.dataReturn = dataReturn;
const errorReturn = (message) => {
    return {
        status: false,
        message: message
    };
};
exports.errorReturn = errorReturn;
//# sourceMappingURL=hook.js.map