const express=require("express")
const model=require("../model/parentsmodelschema")

//--------create data----------\\
const createdata=async(body)=>{
    return await model({...body}).save()
}
//---------get user by id-------\\
const getParentsData=async(id)=>{
    return await model.findById(id)
}
//-------update one data---------\\
const updataOneParentsData=async(id,body)=>{
    return await model.findByIdAndUpdate(id,body,{new:true})
}

//---------delete one data-------\\
const deleteOneParentData=async(id)=>{
    return await model.findByIdAndDelete(id)
}
module.exports={createdata,getParentsData,updataOneParentsData,deleteOneParentData}