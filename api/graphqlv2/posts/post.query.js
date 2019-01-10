// Dependencies
const { Posts } = require('./../../models');
const { GraphQLList } = require('graphql');
const PostType = require('./post.type');
const { validateAuthor } = require('./../utils');

const getPosts = {
  type: new GraphQLList(PostType),
  description: 'Get All Posts of a particular author',
  resolve: async (parent, args, context) => {
    let artist = await validateAuthor(context);
    return Posts.find({ author: artist._id });
  }
}

module.exports = {
  getPosts
}