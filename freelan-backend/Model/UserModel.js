const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        FirstName:{type:String,required:[true,"FirstName is Required"]},
        LastName:{type:String,required:[true,"LastName is Required"]},
        Email: {
            type: String,
            required: [true, "Email is required"],
            unique: true, 
            message: "Email already in use", 
        },

        Password: { type: String, 
            required: true, 
            minlength: [6, "Password must not be less than 6 characters"]
         },
},

{timestamps:true}
)

let userModel = mongoose.model("UserModel",userSchema)

module.exports = userModel