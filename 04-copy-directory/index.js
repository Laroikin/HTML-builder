import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyDir() {
  fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
    if (err) throw err;
    fs.readdir(path.join(__dirname, 'files-copy'), (_err, copy) => {
      for (let j = 0; j < copy.length; j++) {
        fs.unlink(path.join(__dirname, 'files-copy', copy[j]), err => {
          if (err) throw err;
        });
      }
    });
    fs.readdir(path.join(__dirname, 'files'), (_err, items) => {
      for (let i = 0; i < items.length; i++) {
        fs.copyFile(
          path.join(__dirname, 'files', items[i]),
          path.join(__dirname, 'files-copy', items[i]),
          err => {
            if (err) throw err;
          }
        );
      }
    });
  });
}

await copyDir();
