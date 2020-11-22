"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.status = void 0;
var status;
(function (status) {
    status[status["active"] = 0] = "active";
    status[status["inactive"] = 1] = "inactive";
    status[status["suspended"] = 2] = "suspended";
})(status = exports.status || (exports.status = {}));
