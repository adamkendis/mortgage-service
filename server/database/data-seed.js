
const fs = require('fs');
const casual = require('casual');
const { Readable } = require('stream');

const streams = {
  1: fs.createWriteStream('data1.csv'),
  2: fs.createWriteStream('data2.csv'),
  3: fs.createWriteStream('data3.csv'),
  4: fs.createWriteStream('data4.csv'),
  5: fs.createWriteStream('data5.csv'),
  6: fs.createWriteStream('data6.csv')
};

const random = num => Math.ceil(Math.random() * num);
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

let count = 0;
let records = 2000000;
let stream = 1;

const inStream = new Readable({
  read() {
    let zestimate = randomBetween(100000, 500000)
    this.push(`${count.toString()},${casual.address1},${casual.city},${98100 + random(99)},${zestimate},${3 + Math.floor(Math.random() * 2.5)},${2.5 + 0.5 * Math.floor(Math.random() * 3)},${1150 + 10 * random(20)},${Math.random() < 0.5 ? 'For Sale' : 'Sold'},${zestimate * 0.937}\n`);
    count++;
    if (count === 10050000) {
      this.push(null);
    }
    // if (count === records) {
    //   records += 2000000;
    //   this.pause()
    //   this.unpipe(streams[stream]);
    //   stream++;
    //   this.pipe(streams[stream]);
    //   this.resume()
    // }
  }
});

inStream.pipe(streams[stream]);

// const zestHistory = () => {
//   let total = 300000;
//   const years = 8 + random(2);
//   const months = random(12);
//   let count = 0;
//   const spike = [12, 7, 12, 5, 8, 5, 14, 3, 19, 1000];
//   const slope = [
//     -4000,
//     -3000,
//     -1000,
//     2000,
//     5000,
//     2000,
//     5000,
//     3000,
//     10000,
//     7000,
//     700,
//     -700,
//   ];
//   let moreSlope = 0;

//   return Array.from({ length: years * 12 + months }, () => {
//     count++;
//     if (count % spike[0] === 0) {
//       const rand = random(4);
//       moreSlope = rand > 2 ? 2000 : rand === 2 ? -2000 : 0;
//       if (spike[0] === 14) {
//         moreSlope = 8000;
//       }
//       spike.shift();
//     }
//     total += slope[Math.floor(count / 12)] + moreSlope;

//     return total + random(7000);
//   });
// };

/*
---------------Writes 10mil records in ~2 min, ~3.47gb peak mem usage-------------------

const writeCsv = async () => {
  // console.time('writeCsv');
  var csvStream = csv.createWriteStream({headers: false}),
  writeableStream = fs.createWriteStream('data.csv');

  writeableStream.on('finish', () => {
    console.log('done writing');
  });

  var batches = 200;
  var count = 0;

  csvStream.pipe(writeableStream);

  while (count < batches) {
    // csvStream.cork();
    count++;
    for (var i = 0; i < 5000; i++) {
      let record = seedFunc()
      await csvStream.write(record);
    }
    global.gc();
    // csvStream.uncork()
  }

  await csvStream.end();
  // console.timeEnd('writeCsv');
};

writeCsv();
-----------------------------------------------------------------------------------------
*/
