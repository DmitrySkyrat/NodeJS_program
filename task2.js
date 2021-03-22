const fs = require('fs');
const csv = require('csvtojson');

const csvFilePath ='./csv/books.csv';
const readableStream$ = fs.createReadStream(csvFilePath);
const writableStream$ = fs.createWriteStream("./csv/new_books.txt", "utf-8");

let bookPrototype = {};

readableStream$.pipe(
  csv()
  .preFileLine((fileLineString, lineIndex) => {
    const parsedLine = JSON.stringify(convertCsvFile(fileLineString, lineIndex));
    
    return new Promise((resolve, reject) => {
      if (lineIndex > 0) {
        writableStream$.write(`${parsedLine}\n`);
      }

      resolve();
    })
  })
  .on('error', (err) => {
    console.log(err)
  })
);

function convertCsvFile(line, lineIndex) {
  const lineWordsArray = line.split(',');

  if (lineIndex === 0) {
    lineWordsArray.forEach(word => {
      bookPrototype[word.toLowerCase()] = null;
    });

    return bookPrototype;
  } else {
    let i = 0;

    for (let key in bookPrototype) {
      if (key === "price") {
        bookPrototype[key] = +lineWordsArray[i];
      } else {
        bookPrototype[key] = lineWordsArray[i];
      }
      
      i++;
    }

    return bookPrototype;
  }
}
