"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./utilities/logger"));
const fs_1 = require("fs");
const csvtojson_1 = __importDefault(require("csvtojson"));
const resize_1 = __importDefault(require("./utilities/resize"));
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
            if (item.phone === '') {
                phone = 'missing data';
            }
            return { first, last, phone };
        });
        fs_1.promises.writeFile(outputFile, JSON.stringify(newData));
    });
});
app.get('/images', logger_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // res.send(
        //   'filename: ' + req.query.filename + '\n' +
        //   'width: ' + req.query.width + '\n' +
        //   'height: ' + req.query.height + '\n'
        // );
        //res.sendFile(path.join(__dirname,'./../assets/full/' + req.query.filename + '.jpg'));
        res.sendFile(yield resize_1.default.resize(req.query.filename, Number(req.query.width), Number(req.query.height)));
    }
    catch (e) {
        console.log(e);
    }
}));
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
