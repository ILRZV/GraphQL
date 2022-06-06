const { buildSchema } = require("graphql");

var schema = buildSchema(`

  type User {
    id: ID
    username: String
    age: String
    posts: [Post]
  }
  type Post {
    id: ID 
    title: String
    content: String
  }

  input UserInput {
    id: ID
    username: String!
    age: String!
    posts: [PostInput]
  }
  input PostInput {
    id: ID 
    title: String!
    content: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
  }

  type Mutation {
    createUser(input: UserInput): User
  }
`);

module.exports = schema;