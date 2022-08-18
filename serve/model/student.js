const Sequelize = require('sequelize')
const database = require('../db')

const Class = require('./classes')
const TurmaAlunos = require('./turmaAlunos')


const Student = database.define('aluno', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false ,
        primaryKey:true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    matricula: {
        type: Sequelize.REAL,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    statusDaMatricula: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }


})


Student.belongsToMany(Class, {
    through: {
        model: TurmaAlunos
    },
    foreignKey: 'idStudent',
    constraints: true 
})

Class.belongsToMany(Student, {
    through: {
        model: TurmaAlunos
    },
    foreignKey: 'idClasses',
    constraints: true 
})


module.exports = Student;