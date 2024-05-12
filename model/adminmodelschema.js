const mongoose =require("mongoose")

const adminSchema=new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    email:{
        type:String,
        unique:true,
        lowercase:true,
        require:"Email Address is required"
    },
    address:{type:String},
    phoneNumber:{
        type:Number,
        unique:true
        ,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }    
    },
    dateOfBirth:{
        type:Date,
       
    },
    age:{type:Number},
    parents_Info:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"parents"
    },
    added_by:{
        type: mongoose.Schema.Types.ObjectId
    }

})
const adminmodel= mongoose.model("admin",adminSchema)
module.exports= adminmodel