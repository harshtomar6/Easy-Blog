
const types = `
  type Author{
    _id: String,
    name: String,
    email: String,
    password: String,
    createdAt: String,
    description: String,
    client: Client,
    posts: [Post]
  }

  type AuthorAuthPayload{
    token: String!,
    user: Author
  }
`;

const queries = `
  """Retrieve all Authors"""
  getAllAuthors: [Author]
`;

const mutations = `
  """Logins an Author by returning a JSON token"""
  loginAuthor(email: String!, password: String!): AuthorAuthPayload
`

module.exports = {
  types,
  queries,
  mutations
}