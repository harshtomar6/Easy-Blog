// Dependencies
const { Author } = require('./../../models');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');
const AuthorType = require('./author.type');
const { generateToken } = require('./../../../globals');

const loginAuthor = {
  type: new GraphQLObjectType({
    name: 'AuthPayload',
    description: 'Returns token and user info',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: AuthorType }
    })
  }),
  description: 'Login an Author',
  args: {
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (parent, args) => {
    let author = await Author.findOne({email: args.email});

    if(!author)
      throw new Error('No user Found');

    if(author.compareHash(args.password))
      return generateToken(author)
    else
      throw new Error('Invalid Password')
  }
}

module.exports = {
  loginAuthor
}