// Dependencies
const { GraphQLNonNull, GraphQLString } = require('graphql');
const { Posts } = require('./../../models');
const { validateAuthor } = require('./../utils'); 
const PostType = require('./post.type');

// Creates a new Post
const addPost = {
  type: PostType,
  description: 'Adds a new Post',
  args: {
    title: {
      name: 'title',
      type: new GraphQLNonNull(GraphQLString)
    },
    body: {
      name: 'body',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (parent, args, context) => {
    let author = await validateAuthor(context);

    let post = new Posts(args);
    post.author = author._id;

    return post.save();
  }
}

// Update an existing post
const updatePost = {
  type: PostType,
  description: 'Modifies an existing post',
  args: {
    postId: {
      name: 'postId',
      type: new GraphQLNonNull(GraphQLString)
    },
    title: {
      name: 'title',
      type: GraphQLString
    },
    body: {
      name: 'body',
      type: GraphQLString
    }
  },
  resolve: async (parent, args, context) => {
    let author = await validateAuthor(context);

    let updatedPost = await Posts.findOneAndUpdate({_id: args.postId, author: author._id }, args, 
      { new: true });
    
    if(!updatedPost)
      throw new Error("No Post Exists");

    return updatedPost
  }
}

// Pusblish a post
const publishPost = {
  type: PostType,
  description: 'Publishes a Post',
  args: {
    postId: {
      title: 'postId',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (parent, args, context) => {
    let author = await validateAuthor(context);

    let updatedPost = await Posts.findOneAndUpdate({_id: args.postId, author: author._id}, {
      $set: { status: "PUBLISHED" }
    }, { new: true });

    if(!updatedPost)
      throw new Error("No Post Exists");
    
    return updatedPost
  }
}

module.exports = {
  addPost,
  updatePost,
  publishPost
}