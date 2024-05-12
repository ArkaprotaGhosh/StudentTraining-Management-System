const express = require("express")
const app = express()
app.use(express.json())
const dotenv = require("dotenv")
dotenv.config()

//---------cors used to connecting backend with front end
const cors = require("cors")
app.use(cors())

//-------for parsing the data
const bodyParser = require('body-parser');
app.use(bodyParser.json())
//------------routes-----------\\
const signUpRouter = require("./router/signuproute")
const addparent = require("./router/parentrouter")
const addStudent = require("./router/studentrouter")
const addAdmin = require("./router/adminrouter")
const loginRouter = require("./router/signuproute")
//------------calling database------------\\
require("./db")
//------------calling port from dot env-------------\\
const port = process.env.PORT || 5005
//---------defining the routes and connecting with db and giving a server route---------\\
app.use("/api/user", signUpRouter)
app.use("/api/parent", addparent)
app.use("/api/student", addStudent)
app.use("/api/admin", addAdmin)
app.use("/api/login", loginRouter)

//---------listening server using express----------\\
app.listen(port, () => {
    console.log(`the databse is connected at ${port}`);
})

