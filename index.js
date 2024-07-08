// require('dotenv').config() //<---es5
import dotenv from 'dotenv';
dotenv.config();

// const Sequelize = require('sequelize')  //<---es5
import Sequelize from 'sequelize';
// const Logger = require('./logger') //<---es5
import Logger from './logger.js';

// const fastify = require('fastify')({
//   logger: Logger,
//   pluginTimeout: (process.env.NODE_ENV === 'development') ? -1 : 25000
//   // ajv: {
//   //   customOptions: {
//   //     strict: false
//   //   }
//   // }
// }) //<---es5
import Fastify from 'fastify';
const fastify = Fastify({
  logger: Logger,
  pluginTimeout: (process.env.NODE_ENV === 'development') ? -1 : 25000,
  // ajv: {
  //   customOptions: {
  //     strict: false
  //   }
  // }
});

// fastify.register(require('@fastify/formbody')) //<---es5
import formBody from '@fastify/formbody';
fastify.register(formBody)

// const config = require('config') //<---es5
// fastify.decorate('config', config) //<---es5

import config from 'config';
fastify.decorate('config', config);

// const  chalk  = require("chalk"); //<---es5
import chalk from 'chalk';
// const sequelizeFastify = require('sequelize-fastify') //<---es5
import sequelizeFastify from 'sequelize-fastify';


 fastify.register(
  sequelizeFastify,
  {
    instance: 'sequelize',
    sequelizeOptions: {
      dialect:  process.env.DIALECT, /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
      database: process.env.DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      schema: process.env.DB_SCHEMA,
      pool: {
        max: 50, // Maximum number of connections in the pool
        min: 10, // Minimum number of connections in the pool
        acquire: 1000000, // Maximum time (in milliseconds) to acquire a connection
        idle: 1000000, // Maximum time (in milliseconds) that a connection can be idle before being released
    },
    }
  }
)
  .ready(async () => {
    try {
      // first connection
      const result = await fastify.sequelize.authenticate()
    // 
      fastify.log.info(
        chalk.green('Database connection is successfully established.')
      )
    } catch(err) {
        console.log('-------------', err)
      fastify.log.info(
        chalk.red(`Connection could not established: ${err}`)
      )
    }
  })
// set Boom as the error handler
// fastify.register(require('fastify-boom')) //<---es5
import fastifyBoom from 'fastify-boom';
fastify.register(fastifyBoom);

// fastify.register(require('./setup')) //<---es5
import setup from './setup.js';
fastify.register(setup);

// fastify.register(require('./BppPassThrough')) //<---es5
import BppPassThrough from './BppPassThrough/index.js'; //NEED CHANGES
fastify.register(BppPassThrough);
// fastify.addHook('onRequest', (request, reply, next) => {
//   next()
// })

const PORT = config.get('bpp_service.port');
const HOST = '0.0.0.0';

fastify.listen({port: PORT, host: HOST}, async(err, address) => {
    if (err) {
      console.log('==============', err)
      fastify.log.error('index', 'Fastify start error', {
        stack: err.stack,
        message: err.message
      })
    }
    fastify.log.info('index', `Server listening on ${PORT}`)
  })

export default fastify;
