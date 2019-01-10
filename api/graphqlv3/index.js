// Depenedencies
const { makeExecutableSchema } = require('graphql-tools');
const clients = require('./clients');
const authors = require('./authors');
const posts = require('./posts');
const { merge } = require('lodash');

const typeDefs = `
  ${clients.types}
  ${authors.types}
  ${posts.types}

  """This contains all the READ endpoints of this API"""
  type Query{
    ${clients.queries}
    ${authors.queries}
    ${posts.queries}
  }

  """This contains all the WRITE endpoints of this API"""
  type Mutation{
    ${clients.mutations}
    ${authors.mutations}
    ${posts.mutations}
  }
`

const Schema = makeExecutableSchema({
  typeDefs,
  resolvers: merge(clients.resolvers, authors.resolvers, posts.resolvers)
})

module.exports = Schema;