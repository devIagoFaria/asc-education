const Sequelize = require('sequelize')
const database = require('../db')
const Turma = require('./classes')


const Teacher = database.define('professor', {
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
    cpf: {
        type: Sequelize.REAL,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    }


})



module.exports = Teacher