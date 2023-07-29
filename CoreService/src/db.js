const { Sequelize } = require('sequelize');
const tutorialModel = require('./tutorialModel');

const sequelize = new Sequelize('batch-data-crawler', 'myuser', 'pwd12345678', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
  });

const tutorial = tutorialModel(sequelize, Sequelize)
  
const startup = () => {
  sequelize
    .sync()
    .then(() => {
      console.log('DATABASE CONNECTED SUCCESSFULLY!')
    })
    .catch((err) => {
      console.log('DATABASE CONNECTED FAILURELY!')
      throw err
    })
}

module.exports = {
  tutorial,
  startup
}


