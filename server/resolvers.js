const House = require('./database/House.js');

const resolvers = {
  Query: {
    async allHouses() {
      return await House.find();
    },
    async getSome(dummy, numObj) {
      // return await House.find({ _id: { $in: numObj.num } });
      return await House.read(numObj.num);
    }
  },
  Mutation: {
    // Add update and delete
    async insertHouse(dummy, { info }) {
      return await House.create(info);
    }
  }
};

module.exports = resolvers;
