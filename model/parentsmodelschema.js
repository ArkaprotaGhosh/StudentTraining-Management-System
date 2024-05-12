const mongoose=require("mongoose")

const parentsSchema=new mongoose.Schema({
    firstName:{type:String},
    LastName:{type:String},
    childName:{type:String},
    email:{
        type:String,
        unique:true

    },
    address:{type:String},
    phoneNumber:{
        type:Number,
        unique:true,
        validate:{
            validator: function(v){
                return /d{10/.test(v)},
                message:'{value} is not vadid'
            }
        }
    

})

const parentsModel= mongoose.model("parents",parentsSchema)

module.exports=parentsModel