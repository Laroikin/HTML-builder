import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
  if (err) throw err;
  for (let i = 0; i < files.length; i++) {
    const pathToFile = path.resolve(__dirname, 'styles', files[i]);
    if (path.extname(pathToFile) === '.css') {
      const writeStream = fs.createWriteStream(
        path.resolve(__dirname, 'project-dist', 'bundle.css'),
        { flags: 'a' }
      );
      const readStream = fs.createReadStream(pathToFile);
      readStream.on('data', data => writeStream.write(data));
    }
  }
});
