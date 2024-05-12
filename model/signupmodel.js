const mongoose = require("mongoose");


const userLoginSchema = new mongoose.Schema({
    username: {
        type: String,
        trim:true,
        required:true
    },
    email: {
        type: String,
        trim:true,
        required:true,
        unique:true
    },
    password: {

        type: String,
        trim:true,
        required:true
    },
    verificationCode: {
        type: String
    },
    extraVerificationCode: {
        type: String
    }
})

const UserLoginCollation = mongoose.model("userlogoncollations", userLoginSchema)

module.exports = UserLoginCollation