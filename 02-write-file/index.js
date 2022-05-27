import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { createReadStream, createWriteStream } from 'node:fs';
import * as path from 'node:path';
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

console.log(
  'Hello! Please write down the things you want to include in the file and enter exit or press Ctrl+C to end the program: '
);

const rl = readline.createInterface({ input, output });
const writeFile = createWriteStream(path.resolve(__dirname, 'output.txt'), {
  flags: 'a'
});

rl.on('line', line => {
  if (line == 'exit') rl.close();
  else writeFile.write(line + '\n');
});

rl.on('close', () => console.log('Bye'));
