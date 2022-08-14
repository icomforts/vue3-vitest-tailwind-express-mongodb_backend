"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const body_parser_1 = __importDefault(require("body-parser"));
const todo_1 = __importDefault(require("./routes/todo"));
const auth_1 = __importDefault(require("./routes/auth"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '30mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '30mb', extended: true }));
//mongo
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    Logging_1.default.info('Mongo connected successfully.');
})
    .catch((error) => Logging_1.default.error(error));
// middleware
// routes
app.use('/todo', todo_1.default);
app.use('/auth', auth_1.default);
app.get('/', async (req, res) => {
    res.send('hello , api server is working!!');
});
// public images folder
//build https://stackoverflow.com/questions/68240921/serve-static-files-with-expressjs-typescript-nodejs
app.use('/images', express_1.default.static('public/images'));
app.listen(config_1.config.server.port, () => {
    console.log(`app listening on port ${config_1.config.server.port}`);
});
