import fs, { access, unlink } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
  if (err) throw err;

  const tempStream = fs.createWriteStream(
    path.resolve(__dirname, 'project-dist', 'bundle.css')
  );

  tempStream.write('');

  for (let i = 0; i < files.length; i++) {
    const pathToFile = path.resolve(__dirname, 'styles', files[i]);
    fs.stat(pathToFile, (err, stats) => {
      if (err) throw err;
      if (path.extname(pathToFile) === '.css' && stats.isFile()) {
        const writeStream = fs.createWriteStream(
          path.resolve(__dirname, 'project-dist', 'bundle.css'),
          { flags: 'a' }
        );
        const readStream = fs.createReadStream(pathToFile);
        readStream.on('data', data => writeStream.write(data));
      }
    });
  }
});
