
const express = require('express')
const db = require('./db')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT

const studentRouter = require('./router/studentRouter')
const classRouter = require('./router/classRouter')
const teacherRouter = require('./router/teacherRouter')

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/aluno/", studentRouter)
app.use("/turma/", classRouter)
app.use("/professor/", teacherRouter)



app.listen(PORT, ()=> {
    console.log('Running on', PORT)
})