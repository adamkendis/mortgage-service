import seeder from 'knex-csv-seeder';

exports.seed = seed({
  table: 'house',
  file: '../../data1.csv',
  parser: {
    delimiter: ','
  }
});
