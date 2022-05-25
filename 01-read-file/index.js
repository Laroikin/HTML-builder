const path = require('path');
const fs = require('fs');
const { stdout } = require('process');

const textFile = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8'
);

let textData = '';

textFile.on('data', data => (textData += data));
textFile.on('end', () => stdout.write(textData));
