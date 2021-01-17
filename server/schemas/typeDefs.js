const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    title: String
    authors: String
    description: String
    image: String
    link: String
  }

  type User {
    _id: ID
    username: String
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

  type Mutation {
    login(email: String!, password: String!): Auth
   
    addUser(username: String!, email: String!, password: String!): Auth
   
    saveBook(authors: String!, description: String!, title: String!, bookId: String!, image: String!, link: String!): Book
   
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;