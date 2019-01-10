const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers');
const { Types } = require('mongoose');

// const typeDefs = `

// type Post {
//   _id: String!,
//   title: String!,
//   body: String,
//   createdAt: String
// }

// type Query {
//   posts: [Post]
//   post(id: String!): Post
// }

// input postInput {
//   title: String!,
//   body: String!
// }

// type Mutation {
//   addPost(input: postInput) : Post
// }
// `;

// const Schema = makeExecutableSchema({
//   typeDefs,
//   resolvers
// });

// module.exports = Schema;

const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const { postQueries, clientQueries, authorQueries } = require('./queries');
const { clientMutation } = require('./mutations')

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ endpoints of this API',
  fields: () => ({
    posts: postQueries.getAllPosts,
    post: postQueries.getPost,
    clients: clientQueries.getAllClients,
    client: clientQueries.getClient,
    authors: authorQueries.getAllAuthors
  })
})

const RootMutation = new GraphQLObjectType({
  name: 'rootMutations',
  description: 'This is the root mutation which holds all possible WRITE endpoints of this API',
  fields: () => ({
    addClient: clientMutation.addClient,
    updateClient: clientMutation.updateClient,
    loginClient: clientMutation.loginClient
  })
})

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});

module.exports = Schema;
