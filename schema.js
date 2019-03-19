const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');
const axios = require('axios');

const JSON_SERVER_HOST = 'http://localhost:3000';


// Customer Type
const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLInt },
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
        id: { type: GraphQLInt },
      }, 
      resolve(parentValue, args) {
        const requestUri = `${JSON_SERVER_HOST}/customers/${args.id}`
        return axios.get(requestUri)
          .then((res) => {
            console.log(res);
            return res.data
          }); // TODO: Why res.data?
      }
    },
    customers: {
      type: new GraphQLList(CustomerType),
      resolve(parentValue, args) {
        const requestUri = `${JSON_SERVER_HOST}/customers`
        return axios.get(requestUri)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});