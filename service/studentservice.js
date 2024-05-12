const express = require("express")
const model = require("../model/studentmodelschema")
//---------create Student--------\\
const createStudentData = async (body) => {
    const responce = await new model({ ...body })
    return responce.save()
}

//-------------get all student data------------\\
const getAllData = async () => {
    const response = await model.find()
    return response
}
//-------------getstudentbyid-----------\\
const getStudentData = async (id) => {
    const response = await model.findById({ _id: id })
    return response
}
//--------------update student by id--------------------\\
const updateStudentDataByIds = async (id, body) => {
    return await model.findByIdAndUpdate(id, body, { new: true })
}
//----------------delete student by id-----------------\\
const deleteStudentData = async (id) => {
    return await model.findByIdAndDelete(id)
}
module.exports = { createStudentData, getStudentData, updateStudentDataByIds, deleteStudentData, getAllData }