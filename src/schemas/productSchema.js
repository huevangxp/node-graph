const { gql } = require("apollo-server");

module.exports = gql`
  type product {
    id: ID
    productName: String
    price: Float
    amout: Int
    detail: String
  }

  input productInput {
    productName: String
    price: Float
    amout: Int
    detail: String
  }

  input productID {
    id: ID!
  }

  type productData {
    total:Int
    data:[product]
  }

  extend type Query {
    getProduct(where:productID!):product!
    getAllProduct(where:productInput):productData
  }

  extend type Mutation {
    createProduct(data: productInput!):product!
    updateProduct(data: productInput!, where:productID!):product
    deleteProduct(where:productID!):product
  }
`;
