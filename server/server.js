require('newrelic');
const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const path = require('path');
const app = express();
const redis = require('redis');
const client = redis.createClient();

import schema from './schema.js';

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

app.use(cors());
app.use(express.static(`${__dirname}/../public`));

const getHouse = (req, res) => {
  let houseId = req.params.urlId;
  knex('house').where('_id', houseId)
    .then(data => {
      client.set(houseId, data, 'EX', 3600);
      res.send(data); 
    })
    .catch(err => console.log('Error sending data to client: ', err))
}

const getCache = (req, res) => {
  let houseId = req.params.urlId;
  client.get(houseId, (err, result) => {
    if (result) {
      res.send(result);
    } else {
      getHouse(req, res);
    }
  });
}

app.get('/:urlId', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../public/index.html`));
});

app.get('/homes/:urlId', getCache);

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  }),
);

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));
