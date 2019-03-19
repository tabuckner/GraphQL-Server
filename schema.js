const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

// Hardcoded Test Data
const customers = [
  { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
  { id: '2', name: 'Jane Doe', email: 'janed@gmail.com', age: 34 },
  { id: '3', name: 'Tom Thumb', email: 'tthumb@gmail.com', age: 77 },
]

// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      }, 
      resolve(parentValue, args) {
        for(let customer of customers) {
          if (customer.id === args.id) {
            return customer;
          }
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});