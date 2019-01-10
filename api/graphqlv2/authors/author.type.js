// Depenedncies
const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const { Clients, Posts } = require('./../../models');
const PostType = require('./../posts').type;

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
      type: require('./../clients').type,
      resolve: parent => Clients.findById(parent.client)
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: parent => Posts.find({author: parent._id})
    }
  })
});

module.exports = AuthorType;