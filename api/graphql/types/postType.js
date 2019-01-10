// Dependencies
const { GraphQLObjectType, GraphQLString } = require('graphql');

const PostType = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a post',
  fields: () => ({
    _id: {
      type: GraphQLString,
      resolve: post => post._id.toString()
    },
    title: {
      type: GraphQLString
    },
    body: {
      type: GraphQLString
    },
    createdAt: {
      type: GraphQLString,
      resolve: post => new Date(post.createdAt).toString()
    }
  })
});

module.exports = PostType;