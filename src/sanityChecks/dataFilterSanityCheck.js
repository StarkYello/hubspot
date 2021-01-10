// sanity testing
const dataFilter = require('../dataFilter')
const fs = require('fs');

let rawData = fs.readFileSync('./mock.json');
let mockData = JSON.parse(rawData);

console.log(JSON.stringify(dataFilter.filter(mockData)));