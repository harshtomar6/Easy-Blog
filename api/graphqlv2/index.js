// Dependencies
const { GraphQLSchema, GraphQLObjectType } = require('graphql');
const author = require('./authors');
const client = require('./clients');
const post = require('./posts');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This contains all the READ endpoints of this API V2',
  fields: () => ({
    authors: author.queries.getAllAuthors,
    clients: client.queries.getAllClients,
    client: client.queries.getClient,
    posts: post.queries.getPosts
  })
})

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This contains all the WRITE endpoints of this API V2',
  fields: () => ({
    addClient: client.mutation.addClient,
    loginClient: client.mutation.loginClient,
    updateClient: client.mutation.updateClient,
    loginAuthor: author.mutations.loginAuthor,
    addPost: post.mutations.addPost,
    updatePost: post.mutations.updatePost,
    publishPost: post.mutations.publishPost
  })
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

module.exports = Schema;