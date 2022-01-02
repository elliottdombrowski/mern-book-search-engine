const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
    }

    type Book {
        _id: ID!
    }

    type Query {
        user: [User]
        books(_id: String): [Books]
    }

    type Mutation {
        createUser(): User
    }
`;