const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './text.txt'), (err, data) => {
  const lines = data.toString();
  console.log(lines);
});
