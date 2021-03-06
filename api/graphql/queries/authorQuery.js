// Dependencies
const { GraphQLList } = require('graphql');
const { AuthorType } = require('./../types')
const { Author } = require('./../../models')

const getAllAuthors = {
  type: new GraphQLList(AuthorType),
  description: "Retrives all authors",
  resolve: () => Author.find()
}

module.exports = {
  getAllAuthors
}