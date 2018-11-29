// const mongoose = require('mongoose');

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'mortgage'
  },
  pool: { min: 0, max: 7 }
});

module.exports = {
  create: () => {
    console.log('Create route hit');
  },
  read: async (...houseId) => {
    const record = await knex('house').where('_id', houseId);
    console.log(record)
    return record;
  },
  update: () => {
    console.log('Update route hit');
  },
  delete: () => {
    console.log('Delete route hit');
  }
}

// const houseSchema = new mongoose.Schema({
//   _id: String,
//   address: String,
//   city: String,
//   zip: Number,
//   zestimate: [Number],
//   beds: Number,
//   baths: Number,
//   sqFt: Number,
//   status: String,
//   taxAssessment: Number,
// });

// const House = mongoose.model('House', houseSchema);

// module.exports = House;
