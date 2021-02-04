import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    me: User!
  }

  type Mutation {
    register(email: String!, name: String, password: String!): String
    login(email: String!, password: String!): String
    devCreateTable: String
  }

  type User {
    id: ID!
    email: String!
    name: String!
  }
`
