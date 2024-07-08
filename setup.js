/**
 * File: /home/avinash/smartcovr/configuration_service/setup.js
 * Project: /home/avinash/smartcovr/configuration_service
 * Created Date: Friday, February 16th 2018, 2🇲🇲41 pm
 * Author: Avinash Katore
 * -----
 * Last Modified:
 * Modified By:
 * -----
 * Copyright (c) 2018 SmartCovr
 * ------------------------------------
 * All Rights reserved @ SmartCovr
 * All Rights reserved
 */

// const fp = require('fastify-plugin') //<---es5
import fp from 'fastify-plugin';
// const debug = require('debug')('bppService:setup') //<---es5

import debugLib from 'debug';
const debug = debugLib('bppService:setup');

// const initializeModel = require('./models/index') //<---es5
import initializeModel from './models/index.js' 
// this sets up all the data into the cache and
// refresh cache when needed
// 1. Load all configuration into memory
// 2 Load all configuration for distributers
export default fp((fastify, opts, next) => {
  // Decorate with mongodb collections
  fastify.register(fp((fastify, opts, done) => {
    initializeModel(fastify)
      .then(() => {
        debug('Completed registering psql')
        done()
      })
      .catch(err => {
        console.log(err.stack)
        debug('sequelize error')
        throw err
      })
  }))
  next()
})
