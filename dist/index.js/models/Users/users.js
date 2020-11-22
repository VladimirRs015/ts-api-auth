"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var IUsers_1 = require("./IUsers");
var Users = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    status: { enum: IUsers_1.status },
    images: { type: [], required: false },
    profile_img: { type: String, required: false }
}, { timestamps: true });
exports.default = mongoose_1.model('Users', Users);
