const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    bookCount: TYPE?
    savedBooks: [Book]!
  }

  type Book {
    bookId: TYPE?
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login:(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String], description: String!, title: String!, bookId: String!, image: String, link: String): User
    // LOOK INTO INPUT TYPE
    removeBook(bookId: String!): User
  }
`;