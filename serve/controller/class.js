const database = require('../db')
const Student = require('../model/student')
const Teacher = require('../model/teacher')
const Turma = require('../model/classes')
const SchoolTest = require('../model/schoolTest')


const control = {

    add: async (req, res) => {

        await database.sync()

        const newClass = await Turma.create({
            materia: req.body.materia,
            idProfessor: req.body.teacher_id
        })

        res.json(newClass)

    },
    edit: async (req, res) => {

        let id = req.body.id

        await database.sync()

        const schoolClass = await Turma.findByPk(id)

        schoolClass.materia = req.body.materia
        schoolClass.idProfessor = req.body.teacher_id
        schoolClass.save()

        res.json(schoolClass)

    },
    delete: async (req, res) => {

        let id = req.params.id

        let schoolClass = await Turma.findByPk(id)
        await schoolClass.destroy();

        res.json('Deletado')
        
    },
    all: async (req, res) => {

        await database.sync()

        const classes = await Turma.findAll({include: Student})

        res.json(classes)

    },
    onlyOne:  async (req, res) => {

        let id = req.params.id

        await database.sync()

        const classes = await Turma.findByPk(id, { include: [
            {model: Student},
            {model: Teacher}
        ]})

        res.json(classes)

    }, 
    newEnrollments: async (req, res) => {


        console.log(req.body)

        let student_id = req.body.student_id
        let class_id = req.body.class_id

        

        await database.sync()

        await Student.findByPk(student_id)
        .then(student => { student.addTurmas([class_id])
        .then(result => console.log(result))})


        let turma = await Turma.findByPk(class_id)

        res.json(turma)

    },
    

}

module.exports = { control }