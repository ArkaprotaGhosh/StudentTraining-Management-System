// const signupSchema=require("../model/signup")
// const bcrypt = require("bcrypt")
// const jwt=require("jsonwebtoken")


// const signUp=async (req,res)=>{

//     try{
//         // const {username,email,password} =req.body
//         // const existingUser=await signUpModel.findOne({email:email})
//         // console.log("exiting======================",existingUser);
//         // if(existingUser){
//         //     // return res.status(400).send({message:"user already exist"}) //same way
//         //     return res.send({
//         //         status:400,
//         //         message:"user already exist"
//         //     })

//         // }
//         // const hashPassword=await bcrypt.hash(password,10)//salting in password hashing
//         // const result = await signUpModel.create({
//         //     username:username,
//         //     email:email,
//         //     password:hashPassword
//         // })
//         // return res.send({
//         //     data:result
//         // })
//         const body=req.body

//         const data= new signupSchema({
//             ...body
//         })

//         const result = await data.save()
//         return res.send({sucess:true,
//         status:200,
//     masg:"added sucess"})
//     }catch(error){
//         return res.send({
//             status:500,
//             message:"Intenal Server Error",
//             error:error.message
//         })
//     }
// }

// module.exports={signUp}


// // const signUp = async (req, res) => {
// //     // console.log("req====================>",req);
// //     const body = req.body;
// //     console.log("body========>",body)
// //     try {
// //         const existingUser = await signUpModel.findOne({ email: email });
// //         if (existingUser) {
// //             return res.send({
// //                 status: 400,
// //                 message: "User already exists"
// //             });
// //         }

// //         const hashPassword = await bcrypt.hash(password, 10); // Salting in password hashing
// //         const result = await signUpModel.create({
// //             username: username,
// //             email: email,
// //             password: body.hashPassword
// //         });

// //         console.log("result-----------------",result);

// //         return res.send({
// //             status: 200,
// //             data: result,
// //             message: "User registered successfully"
// //         });
// //     } catch (error) {
// //         return res.send({
// //             status: 500,
// //             message: "Internal Server Error",
// //             error: error.message
// //         });
// //     }
// // };

// // module.exports = { signUp };



"use strict";

const userLogin = require("../model/signupmodel")
const bcrypt = require("bcrypt");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "NODE_API"


//--------------sign up------------------\\
exports.sinUp = async (req, res) => {

    // console.log("====",req);



    try {
        const { username, email, password } = req.body
        const existingUser = await userLogin.findOne({ email: email });
        // console.log("=========>",existingUser);
        if (existingUser) {
            return res.send({
                status: 400,
                message: "User Already Exist"
            })
        }



        const hashePassword = await bcrypt.hash(password, 10);
        // console.log("=======>",hashePassword);
        const result = await userLogin.create({
            username: username,
            password: hashePassword,
            email: email
        })
        // console.log("result===>",result);

        // const token=jwt.sign({email:result.email,
        // id:result._id},SECRET_KEY)
        return res.send({
            success: true,
            status: 200,
            message: "SinUp Successfull",
            data: result,
            // token:token
        })


    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Server Error",
            error: error.message
        })

    }
}

//------------------login-----------------\\

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existinguser = await userLogin.findOne({ email: email })
        if (!existinguser) {
            return res.send({
                status: 404,
                message: "user does not found"
            })
        }
        const matchPassword = await bcrypt.compare(password, existinguser.password)
        if (!matchPassword) {
            return res.send({
                status: 400,
                message: "Invalid Password"
            })
        }

        const token = jwt.sign({ email: existinguser.email, id: existinguser._id }, SECRET_KEY)
        return res.send({
            success: true,
            status: 202,
            message: "Login Successfull",
            data: existinguser,
            token: token

        })
    } catch (err) {
        return req.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}


//----------------random string generator--------------------\\

const randomStringGeneratior = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    const charactersLength = characters.length
    let counter = 0

    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
        counter += 1
    }
    return result;

}


//--------------------forget password---------------------------\\
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body
        const existingUser = await userLogin.findOne({ email: email })
        if (existingUser == undefined) throw "Please enter your email"
        if (!existingUser) throw "enter the valid Email Id"
        const response = await userLogin.findOneAndUpdate({ email: email },
            { $set: { verificationCode: randomStringGeneratior(10) }, extraVerificationCode: new Date(new Date().getTime() + 24 * 60 * 60 * 1000) },
            { new: true })

        return res.send({
            success: true,
            status: 200,
            data: response
        })

    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }

}

//-----------verify code-----------------\\

exports.verificationcodeController = async (req, res) => {
    try {
        // const { newPassword, confirmPassword } = req.body
        const verificationCode = req.params.verificationCode
        const verify = await userLogin.findOne({ verificationCode: verificationCode })
        // if (newPassword === confirmPassword) {
        // if (verify == null) throw "Invalid User"
        // if (verify.verificationCode < new Date(new Date().getTime())) throw "Expire Code"
        // const reponse = await userLogin.findOneAndUpdate({ _id: verify._id }, { $set: { password: newPassword }, $unset: { verificationCode: 1, extraVerificationCode: 1 } })
        return res.send({
            success: true,
            status: 200,
            message: "correct verification code",
            data: verify

        })
    } catch (err) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}
//---------------reset Password-----------------------\\

exports.resetPassword = async (req, res) => {
    try {
        const { newPassword, confirmPassword } = req.body
        const verificationCode = req.params.verificationCode
        const verify = await userLogin.findOne({ verificationCode: verificationCode })
        if (newPassword === confirmPassword) {
            if (verify == null) throw "Invalid User"
            if (verify.verificationCode < new Date(new Date().getTime())) throw "Expire Code"
            const reponse = await userLogin.findOneAndUpdate({ _id: verify._id }, { $set: { password: newPassword }, $unset: { verificationCode: 1, extraVerificationCode: 1 } })
            console.log("response-----------------------", reponse);
            return res.send({
                success: true,
                status: 200,
                message: "Password Reset Successfully",
                data: reponse
            })
        }
        else {
            return res.send({
                success: false,
                message: "password doesn't Match"
            })
        }
    } catch (err) {
        console.log("error---------------------======", err.message);
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: err.message
        })
    }
}