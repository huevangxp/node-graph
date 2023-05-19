var mongoose = require("mongoose");

var _productSchema = mongoose.Schema({
    productName : String,
    price:Number,
    amout:Number,
    detail:String
});

var productModel =  mongoose.model('product',_productSchema);
module.exports = productModel;
