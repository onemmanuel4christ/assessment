const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
        id: ID!
        name: String!
        type: String!
        status: String!
        date: String
  }

  input UsersInputFilter {
    status: String
    name: String
  }

  type Query {
    users(input: UsersInputFilter): [User]
  }
`

module.exports ={ typeDefs }