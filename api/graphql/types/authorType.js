// Depenedncies
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { Clients } = require('./../../models');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'This represents an Author',
  fields: () => ({
    _id: { 
      type: GraphQLString,
      resolve: (parent) => parent._id.toString() 
    },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    description: { type: GraphQLString },
    client: { 
      type: require('./clientType'),
      resolve: parent => Clients.findById(parent.client)
    }
  })
});

module.exports = AuthorType;