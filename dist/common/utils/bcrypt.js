"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptPassword = encryptPassword;
exports.comparePassword = comparePassword;
const bcrypt = require("bcrypt");
async function encryptPassword(password) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}
async function comparePassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}
//# sourceMappingURL=bcrypt.js.map