// Dependencies
const { GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql');
const { Clients } = require('./../../models');
const ClientType = require('./client.type');

const getAllClients = {
  type: new GraphQLList(ClientType),
  resolve: (parent, args, context) => {
    console.log(context.headers['authorization'])
    return Clients.find()
  }
}

const getClient = {
  type: ClientType,
  args: {
    _id: {
      name: '_id',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (parent, args) => Clients.findById(args._id)
}

module.exports = {
  getClient,
  getAllClients
}