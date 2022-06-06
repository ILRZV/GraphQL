var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const schema = require("./schema");
const cors = require("cors");

var app = express();

app.use(cors());
const users = [{ id: 1, username: "Pasha", age: 28 }];

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};
var root = {
  getAllUsers: () => {
    return users;
  },
  getUser: (data) => {
    const user = users.find((user) => user.id == data.id);
    return user;
  },
  createUser: ({ input }) => {
    const user = createUser(input);
    users.push(user);
    return user;
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
