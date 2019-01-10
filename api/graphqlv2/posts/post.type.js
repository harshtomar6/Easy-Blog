// Dependencies
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { Author } = require('./../../models');

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: parent => parent._id.toString()
    },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: { 
      type: require('./../authors').type,
      resolve: parent => Author.findById(parent.author)
    },
    createdAt: { type: GraphQLString },
    status: { type: GraphQLString }
  })
})

module.exports = PostType;