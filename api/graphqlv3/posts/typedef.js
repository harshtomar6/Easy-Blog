const types = `
  type Post{
    _id: String,
    title: String,
    body: String,
    status: String,
    createdAt: String,
    author: Author,
    next: Post,
    prev: Post
  }

  """This represents an Enum type. It can take one of the following value"""
  enum PostOwner{
    AUTHOR
    CLIENT
    ALL
  }

  """This represents an Enum type. It can take one of the following value"""
  enum StatusType{
    PUBLISHED
    DRAFT
    ALL
  }
`;

const queries = `
  """Retrives Posts according to filter"""
  getPosts(owner: PostOwner=ALL, status: StatusType=PUBLISHED, authorId: String): [Post]
`;

const mutations = `
  """Creates a new Post"""
  addPost(title: String!, body: String!): Post
  
  """Modifies an existing post"""
  updatePost(postId: String!, title: String, body: String): Post

  """Publishes a post"""
  publishPost(postId: String!): Post
`;

module.exports = {
  types,
  queries,
  mutations
}