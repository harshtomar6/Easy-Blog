// Dependencies
const { GraphQLObjectType, GraphQLList, GraphQLString,
  GraphQLNonNull } = require('graphql');
const { PostType } = require('./../types');
const { Posts } = require('./../../models');


const getAllPosts = {
  type: new GraphQLList(PostType),
  resolve: () => Posts.find()
}

const getPost = {
  type: PostType,
  args: {
    _id: {
      name: '_id',
      type: GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, args) => Posts.findById(args._id)
}

module.exports = {
  getAllPosts,
  getPost
}