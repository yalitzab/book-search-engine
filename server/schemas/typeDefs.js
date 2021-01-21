const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: String!
    title: String!
    authors: [String]
    description: String!
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String!
    email: String
    bookCount: Int
    saveBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    user(username: String!): User
  }

  input BookInput {
    authors: [String]
    description: String!
    bookId: String!
    image: String
    link: String
    title: String!
  }

  type Mutation {
    login(email: String!, password: String!): Auth
   
    addUser(username: String!, email: String!, password: String!): Auth
   
    saveBook(bookData: BookInput!): User
   
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;