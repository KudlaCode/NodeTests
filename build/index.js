"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utilities/logger"));
const fs_1 = require("fs");
const csvtojson_1 = __importDefault(require("csvtojson"));
const app = (0, express_1.default)();
const port = 3000;
const inputFile = './users.csv';
const outputFile = 'users.json';
app.get('/convert', logger_1.default, (req, res) => {
    res.send('converting in progress!');
    (0, csvtojson_1.default)()
        .fromFile(inputFile)
        .then((data) => {
        let newData = data.map((item) => {
            let first = item.first_name;
            let last = item.last_name;
            let phone = item.phone;
            if (item.phone === "") {
                phone = "missing data";
            }
            return { first, last, phone };
        });
        fs_1.promises.writeFile(outputFile, JSON.
            stringify(newData));
    });
});
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
