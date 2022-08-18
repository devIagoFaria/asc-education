const Sequelize = require('sequelize')
const database = require('../db')
const Teacher = require('./teacher')


const Class =  database.define('turma', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false ,
        primaryKey:true
    },
    materia: {
        type: Sequelize.STRING,
        allowNull: false
    },

})

Class.belongsTo(Teacher, {
    foreignKey: 'idProfessor'
})

Teacher.hasMany(Class, {
    foreignKey: 'idProfessor'
})


module.exports = Class