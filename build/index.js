"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utilities/logger"));
const app = (0, express_1.default)();
const port = 3000;
//routes
app.get('/continents', logger_1.default, (req, res) => {
    res.send('continents!');
});
app.get('/countries', logger_1.default, (req, res) => {
    res.send('countries!');
});
app.get('/oceans', (req, res) => {
    res.send('oceans!');
});
// start the Express server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
