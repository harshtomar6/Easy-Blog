
const types = `
  """
    This represents a Client
  """
  type Client{
    _id: String,
    name: String,
    email: String,
    password: String,
    createdAt: String,
    key: String,
    about: String,
    photoURI: String,
    authors: [Author]
  }

  type AuthPayload{
    token: String!,
    user: Client
  }
`;

const queries = `
  """Retrieves all Clients"""
  getAllClients: [Client]
  
  """Returns a particular client"""
  getClient(_id: String!): Client
`;

const mutations = `
  """Creates a new client"""
  addClient(name: String!, email: String!, password: String!, about: String, photoURI: String): Client,
  
  """Updates an exiting client! Token is needed"""
  updateClient(name: String, about: String, photoURI: String): Client,
  
  """Logins a client by returning a JSON token"""
  loginClient(email: String!, password: String!): AuthPayload
`;

module.exports = {
  types,
  queries,
  mutations
}