var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const schema = require("./schema");
const cors = require("cors");

var app = express();

app.use(cors());
const users = [{ id: 1, username: "Pasha", age: 28 }];
let CurrentNumSides = 6;

const createUser = (input) => {
  const id = Date.now();
  return {
    id,
    ...input,
  };
};

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

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
  rollDice: (args) => {
    var output = [];
    for (var i = 0; i < args.numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (args.numSides || 6)));
    }
    return output;
  },
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
  },
  setNumSides: ({ numSides }) => {
    CurrentNumSides = numSides;
    return "Current num sides: " + CurrentNumSides;
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
