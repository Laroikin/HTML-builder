import { readdir } from 'fs/promises';
import process from 'process';
import path from 'path';
import { stat } from 'fs/promises';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertToKilobytes(bytes) {
  return `${bytes / 1024}kb`;
}

try {
  let arr = await readdir(path.resolve(__dirname, 'secret-folder'), {
    withFileTypes: true
  });
  arr.forEach(async entry => {
    if (entry.isFile()) {
      const pathToFile = path.resolve(__dirname, 'secret-folder', entry.name);
      let size = await stat(pathToFile);
      size = convertToKilobytes(size.size);

      let extname = path.extname(pathToFile).slice(1);

      console.log(`${entry.name} - ${extname} - ${size}`);
    }
  });
} catch (err) {
  console.log(err);
}
