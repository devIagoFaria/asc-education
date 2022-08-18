const Sequelize = require('sequelize')
const database = require('../db')


const TurmaAlunos =  database.define('turmaAlunos', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false ,
        primaryKey:true
    },
    status: {
        type: Sequelize.STRING,
        default: 'Em Andamento'
    },

})


module.exports = TurmaAlunos