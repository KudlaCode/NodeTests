const api = require('api.js');

const mult = api.myFirstFunction(2,2);

console.log('Hello world!');
console.log(mult);

process.on('exit', (code) => {
    console.log(`exit event with code: ${code}`);
  });