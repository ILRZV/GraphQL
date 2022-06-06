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

  type RandomDie {
    rollOnce: Int!
    rollTwice: Int!
    roll(numRolls: Int!): [Int]
  }
  
  type Query {
    getAllUsers: [User]
    getUser(id: ID): User
    rollDice(numDice: Int!, numSides: Int): [Int]
    getDie(numSides: Int): RandomDie
  }

  type Mutation {
    createUser(input: UserInput): User
    setNumSides(numSides: Int): String
  }
`);

module.exports = schema;
