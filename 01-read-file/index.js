const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, './text.txt'), (err, data) => {
  if(err) throw err;
  const lines = data.toString().trim();
  console.log(lines);
});
