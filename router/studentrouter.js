const express = require("express")
const studentRouter = express.Router();
const studentController = require("../../controller/studentcontroller")

studentRouter.post("/createStudent", studentController.createStudentData)
studentRouter.get("/getStudent/:id", studentController.getOneStudentById)
studentRouter.put("/updateOneStudent/:id", studentController.updateOneStudentDataById)
studentRouter.delete("/deleteStudent/:id", studentController.deleteOneStudentBId)
studentRouter.get("/getData", studentController.getAllStudentDataController)

module.exports = studentRouter