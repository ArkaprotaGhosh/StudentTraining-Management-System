const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: {
        type: String,

    },
    address: { type: String },
    phoneNumber: {
        type: Number,
        unique: true
        ,
        validate:{
            validator: function(v){
                return /d{10}/.test(v)
            },
            message: '{VALUE} is not valid'
        }
    },
    dateOfBirth: { type: Date },
    age:{type:Number},
    gender: { type: String },
    class: { type: String },
    parentName: { type: String }


})

const studentModel = mongoose.model("student", studentSchema)
module.exports = studentModel