import process, { stdout } from 'process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const textFile = fs.createReadStream(
  path.resolve(__dirname, 'text.txt'),
  'utf-8'
);

let textData = '';

textFile.on('data', data => (textData += data));
textFile.on('end', () => stdout.write(textData));
textFile.on('error', error => console.log('Error', error.message));
