const { Author, Clients, Posts } = require('./../../models');
const { generateToken } = require('./../../../globals');

const resolvers = {
  Query: {
    getAllAuthors(){
      return Author.find()
    }
  },
  Mutation: {
    loginAuthor: async (parent, args) => {
      let author = await Author.findOne({email: args.email});

      if(!author)
        throw new Error('No user Found');

      if(author.compareHash(args.password))
        return generateToken(author)
      else
        throw new Error('Invalid Password') 
    }
  },
  Author: {
    _id: parent => parent._id.toString(),
    client: parent => Clients.findById(parent.client),
    posts: parent => Posts.find({author: parent._id})
  }
}

module.exports = resolvers