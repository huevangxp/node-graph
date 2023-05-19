var mongoose = require("mongoose");
var _userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    phone: String,
    username:String,
    password:String,
    role: {
        type: String,
        enum: ["ADMIN","USER"],
        default: "USER"
    },
    
},{ timestamps: true }
);

var userModel = mongoose.model("user", _userSchema);
module.exports = userModel;