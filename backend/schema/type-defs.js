const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
        id: ID!
        name: String!
        type: String!
        status: String!
        date: String
  }

   type Query {
    users: [User!]!
  }
`

module.exports ={ typeDefs }