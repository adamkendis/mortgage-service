// const mongoose = require('mongoose');
// const House = require('./House.js');
// const db = require('./index.js');
const fs = require('fs');
const casual = require('casual');
const csv = require('fast-csv');
var csvStream = csv.createWriteStream({headers: false}),
  writeableStream = fs.createWriteStream('data.csv');

writeableStream.on('finish', () => {
  console.log('done writing');
})

const random = num => Math.ceil(Math.random() * num);
const randomBetween = (min, max) => Math.floor(Math.random() * (max - min - 1) + min);

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
let count = 0;

const seedFunc = () => {
  const id = count;
  count++;

  const zestimate = randomBetween(100000, 500000);

  return {
    _id: id.toString(),
    address: casual.address1,
    city: casual.city,
    zip: 98100 + random(99),
    zestimate,
    beds: 3 + Math.floor(Math.random() * 2.5),
    baths: 2.5 + 0.5 * Math.floor(Math.random() * 3),
    sqFt: 1150 + 10 * random(20),
    status: Math.random() < 0.5 ? 'For Sale' : 'Sold',
    taxAssessment: zestimate * 0.937,
  };
};

const writeCsv = async () => {
  console.time('writeCsv');
  var batches = 2000;
  var count = 0;

  csvStream.pipe(writeableStream);

  while (count < batches) {
    csvStream.cork();
    count++;
    for (var i = 0; i < 5000; i++) {
      await csvStream.write(seedFunc());
    }
    csvStream.uncork()
  }

  await csvStream.end();
  console.timeEnd('writeCsv');
};

writeCsv();

// const seed = seedFunc();
// module.exports = seedFunc;

// const seedDatabase = () => {
//   House.create(seed)
//     .then(() => mongoose.connection.close())
//     .catch(err => console.error(err));
// };

// seedDatabase();
