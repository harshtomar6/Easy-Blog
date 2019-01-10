// Dependencies
const { Clients, Author } = require('./../../models');
const { validateClient } = require('./../utils');
const { generateToken } = require('./../../../globals');

// Create a new client
const addClient = async(parent, args) => {
  let client = new Clients(args);
  client.key = client.generateClientKey();
  let savedClient = await client.save();

  let author = new Author({
    name: args.name,
    email: args.email,
    password: args.password,
    client: savedClient._id
  });
  await author.save();
  return savedClient
}

// Update an existing client
const updateClient = async (parent, args, context) => {
  let user = await validateClient(context);
  return Clients.findOneAndUpdate({ _id: user._id }, args, { new: true });
}

const loginClient = async (parent, args, context) => {
  let client = await Clients.findOne({ email: args.email });

  if (!client)
    throw new Error("No User Exists");

  if (client.compareHash(args.password)) {
    return generateToken(client);
  } else
    throw new Error("Invalid Password");
}

const resolvers = {
  Query: {
    getAllClients() {
      return Clients.find();
    },
    getClient(parent, args) {
      return Clients.findById(args._id);
    }
  },
  Mutation: {
    addClient,
    updateClient,
    loginClient
  },
  Client: {
    _id: (parent) => parent._id.toString(),
    authors: parent => Author.find({ client: parent._id })
  }

}

module.exports = resolvers;