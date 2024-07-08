// const isFunction = require('lodash/isFunction') //<---es5
// import  isFunction  from 'lodash/isFunction.js';
import lodash from 'lodash';
const {isFunction } = lodash
// const Sequelize = require('sequelize') //<---es5
import Sequelize from 'sequelize';
// const transaction = require('./transaction') //<---es5
import transaction from './transaction.js';

const initializeModel = async (fastify) => {
  try {
    const sequelize = fastify.sequelize
    transaction(sequelize, Sequelize.DataTypes)
    Object.keys(sequelize.models).forEach(modelName => {
      const model = sequelize.models[modelName]
      if (isFunction(model.associate)) {
        model.associate(sequelize.models)
      }
    })
    await sequelize.sync()
  } catch (e) {
    console.log(e.stack)
    throw e
  }
}

export default initializeModel;
