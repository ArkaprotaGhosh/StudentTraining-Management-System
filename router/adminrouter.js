const express = require("express")
const adminRouter = express.Router();
const adminController = require("../controller/admincontroller")
const middleware = require("../middleware/middleware")

adminRouter.post("/createAdmin", adminController.createAdminController)
adminRouter.get("/getOneAdmin/:id", adminController.getOneAdminController)
adminRouter.get("/getManyAdmin", middleware.auth, adminController.getManyAdminDataController)
adminRouter.put("/updateOneAdmin/:id", adminController.updateOneAdminDataController)
adminRouter.put("/updateManyAdmin", adminController.updateManyAdminData)
adminRouter.delete("/deleteOneAdmin/:id", adminController.deleteOneAdminController)
adminRouter.delete("/deleteManyAdmin", adminController.deleteManyAdmin)
adminRouter.get("/populateAdmin/:id", adminController.getManyAdminDataControllerPopulate)
adminRouter.get("/lookupAdmin/:id", adminController.getOneAdminControllerLookup)
adminRouter.post("/sentMail", adminController.sendMail)
adminRouter.post("/uploadFile", adminController.uploadFile)

module.exports = adminRouter