import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
  type Query {
    users: [User!]!
    educations: [Education!]!
    positionChilds:[PositionChild!]!
    positionChild(positionChildId:ID!):PositionChild!
    positions: [Position!]!
    education(educationId: ID!): Education!
    position(positionId: ID!): Position!
    user(userId: ID!): User!
    carier(carierId: ID!): Carier!
    cariers:[Carier!]!
    login(email: String!, password: String!): AuthData!
    searchCarier(carierText: String!): [Carier!]!
    searchComplexCarier(carierText: CarierSearch): [Carier!]!
    searchEducation(educationText: String!): [Education!]!
    searchPositions(positionText: String!): [Position!]!
  }
  type Mutation {
    createPositionChild(positionChildInput: PositionChildInput): PositionChild!
    updateChildPosition(PositionChildId: ID!, updatePositionChild: UpdatePositionChild): PositionChild!
    createPosition(positionInput: PositionInput): Position!
    updatePosition(PositionId: ID!, updatePosition: UpdatePosition): Position!
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
    positionAdded:Position
    positionChildAdded:PositionChild
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
    education: String!
    location: String!
    description: String
    createdAt: String!
    updatedAt: String!
  }
  type Education{
    _id: ID!
    education:String!
  }
  type Position{
    _id: ID!
    position_parent:String!
    position_child_id:[PositionChild!]!
  }
  type PositionChild{
    _id: ID!
    position_child:String!
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
  input CarierSearch{
    name_organization: String
    salary: String
    title: String
    position: String
    education:String
  }
  input EducationInput{
    education:String! 
  }
  input PositionInput{
    position_parent:String! 
    position_child_id:String!
  }
  input UpdateUser {
    email: String
    name: String
    password: String
  }
  input UpdateEducation{
    education:String! 
  }
  input UpdatePosition{
    position_parent:String! 
    position_child_id:String!
  }
  input UpdateCarier {
    name_organization: String
    salary: String
    title: String
    position: String
    description: String
  }
  input UpdatePositionChild {
    position_child: String!
  }
  input PositionChildInput {
    position_child: String! 
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