const process = require('process');
const fs = require('fs');
const path = require('path');

console.log(
  'Hello! Please write down the things you want to include in the file or enter exit to end the program: '
);

function dataHandler(data) {
  data = data.toString();
  if (data.trim() == 'exit') {
    process.exit();
  }

  writeStream.write(data);
}

const writeStream = fs.createWriteStream(
  path.resolve(__dirname, 'output.txt'),
  {
    flags: 'a',
    encoding: 'utf-8'
  }
);

process.stdin.on('data', dataHandler);

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () => console.log('Bye!'));

writeStream.on('error', error => console.log(error));
