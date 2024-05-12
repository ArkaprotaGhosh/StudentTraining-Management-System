const mongoose = require("mongoose")
const model = require("../model/adminmodelschema")
//---------create Data--------\\
const createAdmin=async (body)=>{
    const createUserAdmin=new model({...body})
    return await createUserAdmin.save()
}
//----------get users by id---------\\
const getAdminById=async (id)=>{
    const getAdminData= await model.findById(id)
    return getAdminData
}

//-------------get all user list-----------\\
const getAdminList=async()=>{
    return await model.find({})
}
//--------------update one user by id-------------\\
const updateOneAdmin=async(id,body)=>{
    return await model.findByIdAndUpdate(id,body,{new:true})
}
//--------------update all user--------------------\\
const updateAllAdmin=async (ids,body)=>{
    const updateData=await model.updateMany({_id:{$id:ids}},{$set:body})
    return updateData
}
//---------delete one byb id---------------\\
const deleteOneAdmin=async (id)=>{
    return await model.findByIdAndDelete(id)
}
//------------delete many----------------\\
const deleteManyAdmin=async (ids)=>{
    return await model.deleteMany({_id:{$id:ids}})
}

//--------Populate--------------\\
const getAdminByIdPopulate=async (id)=>{
    const getAdminData= await model.findById(id).populate("parents_Info")
    return getAdminData
}

//----------$lookup---------------\\
const getAdminByIdLookup=async (id)=>{
    
    const getAdminData=await model.aggregate([
        {
            $match:{
                _id : new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from : "parents",
                localField: "added_by",
                foreignField: "_id",
                as:"parent_Info"
            }
        },{
            $limit:1
        }
    ])
    return getAdminData; 
}
module.exports={createAdmin,getAdminById,getAdminList,updateOneAdmin,updateAllAdmin,deleteOneAdmin,deleteManyAdmin,getAdminByIdPopulate,getAdminByIdLookup}