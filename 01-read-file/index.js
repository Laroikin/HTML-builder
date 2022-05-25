const path = require('path');
const fs = require('fs');
const process = require('process');

const textFile = fs.createReadStream(path.resolve(__dirname, 'text.txt'));

textFile.on('data', data => process.stdout.write(data.toString()));
