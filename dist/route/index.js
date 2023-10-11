"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controller/user");
const express_1 = __importDefault(require("express"));
const routerUser = express_1.default.Router();
routerUser.get('/', user_1.getUser);
exports.default = routerUser;
//# sourceMappingURL=index.js.map