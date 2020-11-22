"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = __importDefault(require("./App"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var dotenv_1 = require("dotenv");
var config_1 = __importDefault(require("./config/config"));
// config 
require("./config/db.connection");
dotenv_1.config();
App_1.default.set('PORT', config_1.default.PORT);
//Middlewares
App_1.default.use(express_1.default.urlencoded({ extended: false }));
App_1.default.use(express_1.default.json());
App_1.default.use(express_session_1.default({
    secret: config_1.default.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));
App_1.default.use(cookie_parser_1.default(config_1.default.SECRET));
App_1.default.use(morgan_1.default('dev'));
App_1.default.listen(App_1.default.get('PORT'), function () {
    console.log('Server on port ', App_1.default.get('PORT'));
});
