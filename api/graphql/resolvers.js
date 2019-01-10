// Dependencies
const { Posts } = require('./../models')

const resolvers = {
  Query: {
    async posts(){  
      return await Posts.find().map(post => post.toJSON())
    },
    async post(root, { id }){
      return await Posts.findById(id).toJSON();
    }
  },
  Mutation: {
    async addPost(root, {input}){
      return await Posts.create(input);
    }
  }
}

module.exports = resolvers;