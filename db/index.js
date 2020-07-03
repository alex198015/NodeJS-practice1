const Sequelize = require('sequelize')

const sequelize = new Sequelize('node1', 'root', '',{
    dialect: 'mysql',
    host: 'localhost'
})


const Image = require('./Image')(sequelize)

module.exports = {
    sequelize: sequelize,
    image:Image
}