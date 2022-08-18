const Sequelize = require('sequelize')
const database = require('../db');
const Student = require('./student');
const Turma = require('./classes')


const SchoolTest = database.define('prova', {
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
    nota: {
        type: Sequelize.REAL,
        allowNull: false
    },
    peso: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }

})

SchoolTest.belongsTo(Student, {
    foreignKey: 'idAluno'
})

SchoolTest.belongsTo(Turma, {
    foreignKey: 'idTurma'
})


Student.hasMany(SchoolTest, {
    foreignKey: 'idAluno'
})

Turma.hasMany(SchoolTest, {
    foreignKey: 'idTurma'
})


module.exports = SchoolTest;