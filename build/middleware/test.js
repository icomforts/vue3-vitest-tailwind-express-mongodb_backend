"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPermission = void 0;
function checkPermission(req, res, next) {
    console.log("安安");
    next();
}
exports.checkPermission = checkPermission;
