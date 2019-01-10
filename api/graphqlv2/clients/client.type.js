// Dependencoes
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const AuthorType = require('./../authors').type;
const { Author } = require('./../../models')

const ClientType = new GraphQLObjectType({
  name: 'Clients',
  description: 'This represents a client',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: parent => parent._id.toString()
    },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    photoURI: { type: GraphQLString },
    about: { type: GraphQLString },
    key: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    authors: { 
      type: new GraphQLList(AuthorType),
      resolve: parent => Author.find({client: parent._id})
    }
  })
});

module.exports = ClientType