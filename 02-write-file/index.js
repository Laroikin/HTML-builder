import process from 'process';
import { createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(
  'Hello! Please write down the things you want to include in the file and enter exit or press Ctrl+C to end the program: '
);

function dataHandler(data) {
  data = data.toString();
  if (data.trim() == 'exit') {
    process.exit();
  }

  writeStream.write(data);
}

const writeStream = createWriteStream(path.resolve(__dirname, 'output.txt'), {
  flags: 'a',
  encoding: 'utf-8'
});

process.stdin.on('data', dataHandler);

process.on('SIGINT', function () {
  process.exit();
});

process.on('exit', () => console.log('Bye!'));

writeStream.on('error', error => console.log(error));
