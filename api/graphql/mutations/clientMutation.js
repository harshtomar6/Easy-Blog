// Dependencies
const { ClientType } = require('./../types');
const { GraphQLString, GraphQLNonNull, GraphQLObjectType } = require('graphql');
const { Clients, Author } = require('./../../models');
const { generateToken } = require('./../../../globals');
const { validateClient } = require('./../utils');

const addClient = {
  type: ClientType,
  description: 'Adds a New Client',
  args: {
    name: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    },
    photoURI: {
      name: 'photoURI',
      type: GraphQLString
    },
    about: {
      name: 'about',
      type: GraphQLString
    }
  },
  resolve: async (parent, args) => {
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
}

const updateClient = {
  type: ClientType,
  description: 'updates an existing client',
  args: {
    name: {
      name: 'name',
      type: GraphQLString
    },
    photoURI: {
      name: 'photoURI',
      type: GraphQLString
    },
    about: {
      name: 'about',
      type: GraphQLString
    }
  },
  resolve: async (parent, args, context) => {
    let user = await validateClient(context);
    return Clients.findOneAndUpdate({_id: user._id}, args, {new: true});    
  }
}

const loginClient = {
  type: new GraphQLObjectType({
    name: 'authPayload',
    fields: () => ({
      token: { type: GraphQLString },
      user: { type: ClientType }
    })
  }),
  description: 'logins a client by generating a JSON Web Token',
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
    let client = await Clients.findOne({email: args.email});

    if(!client)
      throw new Error("No User Found");

    if(client.compareHash(args.password)){
      return generateToken(client);
    }else
      throw new Error("Invalid Password");
  }
}

module.exports = {
  addClient,
  updateClient,
  loginClient
}