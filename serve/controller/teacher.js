const database = require('../db')
const Student = require('../model/student')
const Teacher = require('../model/teacher')
const SchoolTest = require('../model/schoolTest')
const Turma = require('../model/classes')


const control = {

    add: async (req, res) => {

        console.log(req.body)

        await database.sync()
        const newTeacher = await Teacher.create({
            nome: req.body.nome,
            cpf: req.body.cpf,
            senha: req.body.senha,
            status: req.body.status

        }) 

        res.json(newTeacher)

    }, //ok
    edit: async (req, res) => {

        let id = req.body.id

        await database.sync()

        const teacher = await Teacher.findByPk(id)

        teacher.nome = req.body.nome
        teacher.cpf = req.body.cpf
        teacher.save()

        res.json(teacher)

    }, //ok
    delete: async (req, res) => {

        let id = req.params.id

        let teacher = await Teacher.findByPk(id)
        await teacher.destroy();

        res.json('Deletado')
        
    }, //ok 
    all: async (req, res) => {

        await database.sync()

        const teachers = await Teacher.findAll()

        res.json(teachers)

    }, //ok
    onlyOne: async (req, res) => {

        let id = req.params.id

        let teachers = await Teacher.findByPk(id, {include: Turma})

        res.json(teachers)
        
    }, //ok
    status: async (req, res) => {

        let id = req.params.id
        let status = req.params.status

        if(status == 'Ativado'){

            await database.sync()

            const teacher = await Teacher.findByPk(id)
    
            teacher.status = 'Desativado'
            await teacher.save()

        }
        else{

            await database.sync()

            const student = await Teacher.findByPk(id)
    
            student.status = 'Ativado'
            student.save()

        }


        res.json('Editado')

    },

}

module.exports = { control }