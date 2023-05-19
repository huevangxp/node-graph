const { gql } = require("apollo-server");



module.exports = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    age: Int
    phone: String
    username: String
    password: String
    role: USERROLE
  }

  type admin {
    id: ID
    username: String
    password: String
    role:USERROLE

  }

  input adminInput {
    username: String
    password: String
    role:USERROLE
  }


  enum USERROLE {
    ADMIN
    USER
  }

  input UserInput {
    firstName: String
    lastName: String
    age: Int
    phone: String
    username: String
    password: String
    role: USERROLE
  }

  input userUnique {
    id: ID
  }

  input _checkUser {
    id:ID
    username:String
  }

  type UserAllData {
    total: Int
    data: [User]
  }

  type CreateUser {
    data: User!
    token: String
  }

type createAdmin {
  data:admin!
  token:String
}

  extend type Query {
    user(where: userUnique!): User!
    users(where: UserInput): UserAllData
  }

  extend type Mutation {
    createUser(data: UserInput!):CreateUser
    createAdmin(data: adminInput!,where:_checkUser!): createAdmin
    updateUser(data: UserInput, where: userUnique!): User
    deleteUser(where: userUnique!): User
  }
`;
