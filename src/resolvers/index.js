const userResolver = require("./user/userResolver");
const productResolver = require('./product/')

module.exports = [
    userResolver,
    productResolver,
];