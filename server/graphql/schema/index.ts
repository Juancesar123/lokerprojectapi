import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
  type Query {
    users: [User!]!
    educations: [Education!]!
    education(educationId: ID!): Education!
    user(userId: ID!): User!
    carier(carierId: ID!): Carier!
    cariers:[Carier!]!
    login(email: String!, password: String!): AuthData!
    searchCarier(carierText: String!): [Carier!]!
    searchEducation(educationText: String!): [Education!]!
  }
  type Mutation {
    createEducation(educationInput: EducationInput): Education!
    educationUpdate(EducationId: ID!, updateEducation: UpdateEducation): Education!
    createUser(userInput: UserInput): AuthData!
    updateUser(userId: ID!, updateUser: UpdateUser): AuthData!
    createCarier(carierInput: CarierInput): Carier!
    updateCarier(userId: ID!, updateCarier: UpdateCarier): Carier!
  }
  type Subscription {
    userAdded: User
    carierAdded: Carier
    educationAdded:Education
  }
  type User {
    _id: ID!
    email: String!
    name: String!
    password: String
    createdAt: String!
    updatedAt: String!
  }
  type Carier {
    _id: ID!
    name_organization: String!
    salary: String!
    title: String!
    position: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }
  type Education{
    _id: ID!
    education:String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  input CarierInput {
    name_organization: String!
    salary: String!
    title: String!
    position: String!
    description: String
  }
  input EducationInput{
    education:String! 
  }
  input UpdateUser {
    email: String
    name: String
    password: String
  }
  input UpdateEducation{
    education:String! 
  }
  input UpdateCarier {
    name_organization: String
    salary: String
    title: String
    position: String
    description: String
  }
`;

const schema: ApolloServerExpressConfig = {
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req, connection, payload }: any) => {
    if (connection) {
      return { isAuth: payload.authToken };
    }
    return { isAuth: req.isAuth };
  },
  playground: true
};

export default schema;