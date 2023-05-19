const { gql } = require("apollo-server");
const userSchema = require("./userSchema");
const productSchema = require("./productSchema");

const linkSchema = gql`
scalar DateTime
    type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }
`;

module.exports = [
  linkSchema,
  userSchema,
  productSchema,
];