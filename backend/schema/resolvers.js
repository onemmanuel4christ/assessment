const { CustomerList } = require("../UserList")

const resolvers = {
    Query: {
     users: () => {
      return CustomerList;
     }
    }
  }
  module.exports = { resolvers };