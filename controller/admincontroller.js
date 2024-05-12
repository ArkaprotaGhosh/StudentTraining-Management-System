const nodeMailer=require("nodemailer")
const multer=require("multer")
const service=require("../service/adminservice")


//-----create admin----\\
const createAdminController=async (req,res)=>{
    try
    {const body=req.body
    const createAdminData=await service.createAdmin(body)
    return res.send({
        success:true,
        status:200,
        message:"the Admin is added successfully",
        data:createAdminData
    })}catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}

//---------get one admin-----------\\
const getOneAdminController=async(req,res)=>{
    try{const id=req.params.id
    const getAdminDataID= await service.getAdminById(id)
    return res.send({
        success:true,
        status:200,
        message:"the data get by id has Successful",
        data: getAdminDataID
    })}catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}


//------------get many admin---------------\\
const getManyAdminDataController=async (req,res)=>{
    try {
        const getAdminData=await service.getAdminList()
        return res.send({
            success:true,
            status:200,
            message:"get all admin data successfull",
            data:getAdminData
        })
    } catch (error) {
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:error.message
        })
        
    }
}


//------------get many admin using populate------------\\
const getManyAdminDataControllerPopulate=async (req,res)=>{
    try {
        const id=req.params.id
        const getAdminData=await service.getAdminByIdPopulate(id)
        return res.send({
            success:true,
            status:200,
            message:"get all admin data successfull",
            data:getAdminData
        })
    } catch (error) {
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:error.message
        })
        
    }
}


//-----------update one admin--------------\\
const updateOneAdminDataController=async (req,res)=>{
    try {
        const id=req.params.id
        const body=req.body
        const updateAnminDataId=await service.updateOneAdmin(id,body)
        return res.send({
            success:true,
            status:200,
            message:"Admin One Data has Successful",
            data:updateAnminDataId
        })

    } catch (error) {
        return req.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:error.message
        })
    }
}

//---------------update many admin---------------\\
const updateManyAdminData=async (req,res)=>{
    try{const ids=req.body._id
    const {_id,...body}=ids
    const updateAllAdminData= await service.updateAllAdmin(_id,body)
    return req.send({
        success:true,
        status:200,
        message:"Update All Data Successfully",
        data:updateAllAdminData
    })}catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}


//-------------delete many admin-----------\\
const deleteManyAdmin=async (req,res)=>{
    try{const ids=req.body._id
    const deleteMany=await service.deleteManyAdmin(ids)
    return res.send({
        success:true,
        status:200,
        message:"Data deleted successfilly",
        data:deleteMany
    })}catch(error){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}


//---------------delete one admin------------\\
const deleteOneAdminController=async (req,res)=>{
    try{
        const id=req.params.id
        const deleteAdminData= await service.deleteOneAdmin(id)
        return res.send({
            success:true,
            status:200,
            message:"Data Deleted Successfully",
            data:deleteAdminData
        })
    }catch(error){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:error.message

        })
    }
}
//-----------------$lookup---------------------\\
const getOneAdminControllerLookup=async(req,res)=>{
    try{
        const newid=req.params.id
    const getAdminDataID= await service.getAdminByIdLookup(newid)
    return res.send({
        success:true,
        status:200,
        message:"the data get by id has Successful",
        data: getAdminDataID
    })}catch(err){
        return res.send({
            success:false,
            status:500,
            message:"Internal Error",
            error:err.message
        })
    }
}
//-------------------using nodemailder mailsend-------------------\\
const transport=nodeMailer.createTransport({
    service:"gmail",
    auth:{
        user:"arko62903@gmail.com",
        pass:"jybzftgomwusdhuq"
    }
})

const sendMail=(req,res)=>{
    const {to,subject,text,html}=req.body
    const mailSender={
        from:"arko62903@gmail.com",
        to:to,
        subject:subject,
        text:text,
        html:html
    }
    transport.sendMail(mailSender,(error,information)=>{
        if(error){
            console.log(error);
            res.status(500).send("Error on Sending Email")
        }else{
            console.log("Email Sent:"+information.response);
            res.status(200).send("Email Send Successfully")
        }
    })
    
}

//------------------file upload---------------------\\

const storage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'upload');
    },
    filename:function(req,file,callback){
        callback(null, Date.now()+ "-" +file.originalname  )
    }
})

const upload=multer({storage:storage})

const uploadFile=(req,res)=>{
    upload.array("file")(req,res,function(err){
        if(err){
            return res.send({
                success:false,
                status:500,
                message:"Internal Error",
                error:err.message
            })
        }
        res.send({
            success:true,
            status:200,
            message:"file Uploaded Successfully"
        })
    })
}
module.exports={createAdminController,getOneAdminController,getManyAdminDataController,updateOneAdminDataController,updateManyAdminData,deleteManyAdmin,deleteOneAdminController,getManyAdminDataControllerPopulate,getOneAdminControllerLookup,sendMail,uploadFile}