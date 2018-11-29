import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers.js';

const typeDefs = `
  type Home {
    _id: Int
    address: String!
    city: String!
    zestimate: Int!
    beds: Int!
    baths: Float!
    sqft: Int!
    status: String!
    taxassessment: Float!
  }

  type Query {
    allHouses: [Home]
    getSome(num: [Int]!): [Home]
  }

  type Mutation {
    insertHouse(id: Int!): Home
  }
  
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
