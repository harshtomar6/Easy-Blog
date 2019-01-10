const { Post, Author } = require('./../../models');
const { validateAuthor } = require('./../utils')

// Get Posts of an Author
const getPosts = async (parent, args, context) => {
  switch(args.owner){
    case 'ALL':
      return Post.find(args.status === 'ALL' ? {} : {status: args.status}).sort({createdAt: -1})
    case 'AUTHOR':
      if(args.status === "PUBLISHED")
        return Post.find({author: args.authorId, status: "PUBLISHED"}).sort({createdAt: -1})
      else{
        let artist = await validateAuthor(context);

      }
  }
}

// Adds a new post
const addPost = async (parent, args, context) => {
  let author = await validateAuthor(context);

  let post = new Post(args);
  post.author = author._id;

  return post.save();
}

// Update a post
const updatePost = async (parent, args, context) => {
  let author = await validateAuthor(context);

  let updatedPost = await Post.findOneAndUpdate({_id: args.postId, author: author._id}, args, {new: true});

  if(!updatedPost)
    throw new Error("No Posts Exists");

  return updatedPost;
}

// Publish a post
const publishPost = async (parent, args, context) => {
  let author = await validateAuthor(context);

  let updatedPost = await Post.findOneAndUpdate({
    _id: args.postId,
    author: author._id 
  }, {$set: {status: "PUBLISHED"}}, { new: true });

  if(!updatedPost)
    throw new Error("No Posts Exists");

  return updatedPost;
}

const resolvers = {
  Query:{
    getPosts
  },

  Mutation: {
    addPost,
    updatePost,
    publishPost
  },

  Post: {
    _id: parent => parent._id.toString(),
    author: parent => Author.findById(parent.author),
    next: async (parent, args) => {
      let posts, currentIndex;
      switch(args.owner){
        case 'ALL':
          posts = await Post.find().sort({createdAt: -1});
          currentIndex = posts.findIndex(post => post._id.toString() == parent._id);  
          return posts[currentIndex+1];
        case "AUTHOR":
          if(args.status === "PUBLISHED"){
            posts = await Post.find({author: args.authorId, status: "PUBLISHED"}).sort({createdAt: -1})
            currentIndex = posts.findIndex(post => post._id.toString == parent._id);
            return posts[currentIndex+1];
          }
      }
    }
  }
}

module.exports = resolvers;