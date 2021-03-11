const request = require('request');
const fs = require("fs");

const webpage = process.argv[2];
const path = process.argv[3];

request(webpage, (error, response, body) => {
  console.log("error:", error);
  if (response.statusCode === 200) {
    createFile(body);
  } else console.log(`Unable to download webpage due to error ${response.statusCode}, ${response}`)
});

const createFile = (data) => {
  fs.writeFile(path, data, (err) => {
    if (err) throw err;
    fs.stat(path, (err, stats) => {
      if (err) throw err;
      console.log(`Downloaded and saved ${stats.size} bytes to ${path}`);
    });
  });
};

