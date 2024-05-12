const studentServices = require("../service/studentservice")

const studentSchemas = require("../model/studentmodelschema");

//-------------create Data--------------\\
exports.createStudentData = async (req, res) => {
    try {
        const body = req.body
        const createStudentData = await studentServices.createStudentData(body)
        return res.send({
            success: true,
            status: 200,
            message: "Student Data Created Successfully",
            data: createStudentData
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

//============get all data==========\\
exports.getAllStudentDataController = async (req, res) => {
    try {

        const response = await studentServices.getAllData()
        return res.send({
            success: true,
            status: 200,
            message: "Get Student data SucccessFully",
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
//----------------get one data--------------\\
exports.getOneStudentById = async (req, res) => {
    try {
        const id = req.params.id
        const getOneStudentDataById = await studentServices.getStudentData(id)
        return res.send({
            success: true,
            status: 200,
            message: "Get Student data SucccessFully",
            data: getOneStudentDataById
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
//-----------------update one data--------------\\
exports.updateOneStudentDataById = async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const updateStudentData = await studentServices.updateStudentDataByIds(id, body)
        return res.send({
            success: true,
            status: 200,
            message: "Student Data Updated Successfully",
            data: updateStudentData
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Inernal Error",
            error: err.message
        })
    }
}

//----------------delete one data--------------\\
exports.deleteOneStudentBId = async (req, res) => {
    try {
        const id = req.params.id
        const deleteOneStudentData = await studentServices.deleteStudentData(id)
        return res.send({
            success: true,
            status: 200,
            message: "Student Data is deleted Sucessfully",
            data: deleteOneStudentData
        })
    } catch (error) {
        return res.send({
            success: false,
            status: 500,
            message: "Internal Error",
            error: error.message
        })
    }
}

