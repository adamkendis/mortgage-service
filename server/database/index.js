// const cassandra = require('cassandra-driver');
const models = require('express-cassandra');
// const async = require('async');
// const db = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'mortgage'});

models.setDirectory(__dirname + '/models').bind(
  {
    clientOptions: {
      contactPoints: ['127.0.0.1'],
      protocolOptions: { port: 9042 },
      keyspace: 'mortgage',
      queryOptions: { consistency: models.consistencies.one }

    },
    ormOptions: {
      defaultReplicationStrategy: {
        class: 'SimpleStrategy',
        replication_factor: 1
      },
      migration: 'safe',
      createKeyspace: true
    }
  },
  function(err) {
    if (err) {
      throw err;
    }
  }
);

models.import(__dirname + '/data1.csv', function(err) {
  if (err) {
    throw err;
  }
});

// export default db;
