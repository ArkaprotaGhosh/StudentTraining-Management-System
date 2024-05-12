const parentsService=require("../service/parentsservice")
const model=require("../model/parentsmodelschema")


//--------------create parent data--------------\\
exports.createParentController= async(req,res)=>{
    try{
        const body=req.body
        const createParentData=await parentsService.createdata(body)
        return res.send({
            success:true,
            status:200,
            message:"the parent data added successfully",
            data:createParentData

        })
    }catch(err){
     return res.send({
        success:false,
        status:500,
        message:"Internal Error",
        error:err.message
     })       
    }
}


//-------------get one parent data---------------\\
exports.getOneParentController=async(req,res)=>{
    try{
        const id=req.params.id
        const getOneParentData=await parentsService.getParentsData(id)
        return res.send({
            status:200,
            message:"Find Parent Data Successfully",
            data:getOneParentData
        })
    }catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}

//---------update one parent data--------------\\

exports.updateOneParentController=async(req,res)=>{
    try{
        const id=req.params.id
        const body=req.body
        const updateOneParentData=await parentsService.updataOneParentsData(id,body)
        return res.send({
            success:true,
            status:200,
            message:"Parent Data Updated Successfully",
            data:updateOneParentData
        })
    }catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}

//--------------delete one parent data-----------\\

exports.deleteOneParent=async (req,res)=>{
    try{
        const id= req.params.id
        const deleteOneParentData= await parentsService.deleteOneParentData(id)
        return res.send({
            success:true,
            status:200,
            message:"parent data deleted successfully",
            data:deleteOneParentData
        })
    }catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}


//------------get all parent data------------\\
exports. getAllParentsData=async(req,res)=>{

    const result =await model.find({})
    console.log("result====>",result);
    return res.send({
        success:true,
        status:200,
        message:"Get All Student Data Sucessfully",
        data:result
    })

}