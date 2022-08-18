const database = require('../db')
const Student = require('../model/student')
const Teacher = require('../model/teacher')
const SchoolTest = require('../model/schoolTest')
const Turma = require('../model/classes')
const TurmaAlunos = require('../model/turmaAlunos')


const control = {

    add: async (req, res) => {
        await database.sync()

        const newStudent = await Student.create({
            nome: req.body.nome,
            senha: req.body.senha,
            matricula: req.body.matricula,
            status: req.body.status,
            statusDaMatricula: req.body.statusDaMatricula,

        })

        res.json(newStudent)

    },
    edit: async (req, res) => {

        console.log('aqui', req.body)

        let id = req.body.id

        await database.sync()

        const student = await Student.findByPk(id)

        student.nome = req.body.nome
        student.matricula = req.body.matricula
        student.senha = req.body.senha

        student.save()

        res.json(student)

    },
    status: async (req, res) => {

        let id = req.body.id
        let status = req.body.status

        await database.sync()

        const student = await Student.findByPk(id)

        student.status = status

        await student.save()




    },
    statusEnrollment: async (req, res) => {

        let id = req.params.id
        let status = req.params.status

        if (status == 'Ativado') {

            await database.sync()

            const student = await Student.findByPk(id)

            student.statusDaMatricula = 'Desativado'
            await student.save()

        }
        else {

            await database.sync()

            const student = await Student.findByPk(id)

            student.statusDaMatricula = 'Ativado'
            student.save()

        }


        res.json('Editado')

    },
    delete: async (req, res) => {

        let id = req.params.id

        let student = await Student.findByPk(id)
        await student.destroy();

        res.json('Deletado')

    },
    all: async (req, res) => {

        await database.sync()

        const students = await Student.findAll({ include: SchoolTest })

        res.json(students)

    },
    onlyOne: async (req, res) => {

        let id = req.params.id

        await database.sync()

        const students = await Student.findByPk(id, { 
            include: [
                { 
                    model: SchoolTest,
                    include: Turma
                },
            
                { model: Turma, include: [{
                    model: SchoolTest,
                    include: Student
                }] }
            ]},
            
            
            
            )

        res.json(students)

    },
    newTest: async (req, res) => {


        await database.sync()

  

        let newTest = await SchoolTest.create({
            materia: req.body.materia,
            nota: req.body.nota,
            peso: req.body.peso,
            idAluno: req.body.student_id,
            idTurma: req.body.class_id

        })

        res.json(newTest)

    },
    studentSchoolTest: async (req, res) => {

        let id = req.params.id

        await database.sync()

        // const student = await Student.findByPk(id, {include: SchoolTest});
        // res.json(student)

        const schoolTest = await SchoolTest.findByPk(id, { include: Student });
        res.json(schoolTest)

    },
    statusWithClass: async (req, res) => {

        console.log(req.body)

        let enrollment = req.body.id

        await database.sync()

        const student = await TurmaAlunos.findByPk(enrollment)  

        student.status = req.body.status
        student.save()

        res.json(student)






    },



}


module.exports = { control }