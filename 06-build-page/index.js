import fs, { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fs.rm(path.join(__dirname, 'project-dist'), { recursive: true }, () => {
  fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
    if (err) throw err;

    const readStream = fs.createReadStream(
      path.resolve(__dirname, 'template.html')
    );

    readStream.on('data', data => {
      const regexp = /{{(.+?)\}}/g;
      data = data.toString();
      let compNames = data.match(regexp);
      for (let i = 0; i < compNames.length; i++) {
        const tempReadStream = createReadStream(
          path.resolve(
            __dirname,
            'components',
            compNames[i].slice(2, compNames[i].length - 2).concat('.html')
          )
        );
        tempReadStream.on('data', component => {
          data = data.replace(compNames[i], component.toString());
          const writeStream = createWriteStream(
            path.resolve(__dirname, 'project-dist', 'index.html')
          );
          writeStream.write(data);
        });
      }
    });

    fs.readdir(path.resolve(__dirname, 'styles'), (err, files) => {
      if (err) throw err;

      for (let i = 0; i < files.length; i++) {
        const pathToFile = path.resolve(__dirname, 'styles', files[i]);
        fs.stat(pathToFile, (err, stats) => {
          if (err) throw err;
          if (path.extname(pathToFile) === '.css' && stats.isFile()) {
            const writeStream = fs.createWriteStream(
              path.resolve(__dirname, 'project-dist', 'style.css'),
              { flags: 'a' }
            );
            const readStream = fs.createReadStream(pathToFile);
            readStream.on('data', data => {
              writeStream.write(data + "\n\n");
            });
          }
        });
      }
    });

    fs.mkdir(
      path.join(__dirname, 'project-dist', 'assets'),
      { recursive: true },
      err => {
        if (err) throw err;

        function recursiveCopy(dest) {
          fs.readdir(path.resolve(__dirname, dest), (_err, copy) => {
            for (let i = 0; i < copy.length; i++) {
              fs.stat(path.resolve(__dirname, dest, copy[i]), (err, stats) => {
                if (!stats.isFile()) {
                  fs.mkdir(
                    path.join(__dirname, 'project-dist', dest, copy[i]),
                    { recursive: true },
                    err => {
                      if (err) throw err;
                    }
                  );
                  recursiveCopy(path.join(dest, copy[i]));
                } else {
                  fs.copyFile(
                    path.join(__dirname, dest, copy[i]),
                    path.join(__dirname, 'project-dist', dest, copy[i]),
                    err => {
                      if (err) throw err;
                    }
                  );
                }
              });
            }
          });
        }

        recursiveCopy('assets');
      }
    );
  });
});
