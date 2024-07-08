// const fp = require('fastify-plugin') //<---es5
import fp from 'fastify-plugin';
// const bppServiceHelper = require('./transactionHelper')
// const BppServiceHelper = require('./bppServiceHelper') //<---es5
import  BppServiceHelper from './bppServiceHelper.js';
// const {
//   isNull, isEmpty, isUndefined, isString
// } = require('lodash') //<---es5
import lodash from 'lodash';
const { isNull, isEmpty, isUndefined,isString } = lodash;

export default fp((fastify, opts, next) => {
    // Decorate with the helper
    fastify.register(fp((fastify, opts, done) => {
      // const transactionHelper = TransactionHelper.create(fastify)
      const bppServiceHelper = BppServiceHelper.create(fastify)
      fastify.decorate('bppServiceHelper', bppServiceHelper)
      fastify.log.info(' BppPassThrough/index', 'Created bppServiceHelper')
      done()
    }))
    fastify.register(registerRoutes)
    fastify.log.debug(' BppPassThrough/index', 'Registered all routes for  BPP_SERVICE')
    next()
  })

/**
 * Register all the routes exposed from rms.
 * and endpoints for rms.
 * @param {any} fastify - the fastify global app context
 * @param {any} opts - any specific options that will be passed by fastify
 * @param {any} done - Call the next function within the register routes
 * @returns {undefiend}
 */
const registerRoutes = (fastify, opts, done) => {
    /**
     * /search
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/search')
    fastify.route({
      method: 'POST',
      url: '/search',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('search body is required ')
        }
        const response = await bppServiceHelper.processSearchRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    /**
     * /select
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/select')
    fastify.route({
      method: 'POST',
      url: '/select',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('select body is required ' )
        }
        const response = await bppServiceHelper.processSelectRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    /**
     * /init
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/init')
    fastify.route({
      method: 'POST',
      url: '/init',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('init body is required ' )
        }
        const response = await bppServiceHelper.processInitRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    /**
     * /confirm
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/confirm')
    fastify.route({
      method: 'POST',
      url: '/confirm',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('confirm body is required ' )
        }
        const response = await bppServiceHelper.processConfirmRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

     /**
     * /status
     */

     fastify.log.info('BppPassThrough/index - Registering route: POST/status')
     fastify.route({
       method: 'POST',
       url: '/status',
       schema: {
         description: '',
         tags: '',
         summary: ''
       },
       handler: async (req, resp) => {
         const { bppServiceHelper } = fastify
         const { query, body } = req
         if (isUndefined(body) || isEmpty(body)) {
           fastify.log.error('status body is required ' )
         }
         const response = await bppServiceHelper.processStatusRequest(body)
         return response
       },
       preHandler: (req, reply, done) => {
         done()
       }
     })


    /**
     * /cancel
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/cancel')
    fastify.route({
      method: 'POST',
      url: '/cancel',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('cancel body is required ' )
        }
        const response = await bppServiceHelper.processCancelRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })
    

    /**
     * claim
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/claim')
    fastify.route({
      method: 'POST',
      url: '/claim',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('claim body is required ' )
        }
        const response = await bppServiceHelper.processClaimRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })


    /**
     * Renew
     */

    fastify.log.info('BppPassThrough/index - Registering route: POST/renew')
    fastify.route({
      method: 'POST',
      url: '/renew',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('renew body is required ' )
        }
        const response = await bppServiceHelper.processRenewRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    
    fastify.log.info('BppPassThrough/index - Registering route: GET/form/details/:form_id')
    fastify.route({
      method: 'GET',
      url: '/form/details/:form_id',
      schema: {
        description: '',
        tags: '',
        summary: '',
        params: {
          type: 'object',
          properties: {
            transactionId: {
              type: 'string'
            }
          }
        }
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, params : {form_id} } = req
        const { transactionId } = query
        if (!isString(form_id) || isEmpty(form_id)) {
          fastify.log.error('formId is required ')
        }
        if (!isString(transactionId) || isEmpty(transactionId)) {
          fastify.log.error('transactionId is required ')
        }
        const response = await bppServiceHelper.getFormHtml(transactionId, form_id)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.info('BppPassThrough/index - Registering route: POST/form/submission/:form_id')
    fastify.route({
      method: 'POST',
      url: '/form/submission/:form_id',
      schema: {
        description: '',
        tags: '',
        summary: '',
        params: {
          type: 'object',
          properties: {
            transactionId: {
              type: 'string'
            }
          }
        }
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { query, params : {form_id} } = req
        const { transactionId } = query
        if (!isString(form_id) || isEmpty(form_id)) {
          fastify.log.error('formId is required ')
        }
        if (!isString(transactionId) || isEmpty(transactionId)) {
          fastify.log.error('transactionId is required ')
        }
        const response = await bppServiceHelper.getSubmissionId(transactionId, form_id, req.body)
        resp.send(response)
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.info('BppPassThrough/index  - Registering route: GET/submissions/:transactionId')
    fastify.route({
      method: 'GET',
      url: '/submissions/:transactionId',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const {  params : { transactionId } } = req
        if (!isString(transactionId) || isEmpty(transactionId)) {
          fastify.log.error('transactionId is required')
        }
        const response = await bppServiceHelper.getFormData(transactionId)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.info('BppPassThrough/index - Registering route: GET/selectProduct/:transactionId')
    fastify.route({
      method: 'GET',
      url: '/selectProduct/:transactionId',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const {  params : { transactionId } } = req
        if (!isString(transactionId) || isEmpty(transactionId)) {
          fastify.log.error('transactionId is required')
        }
        const response = await bppServiceHelper.getSelectProductData(transactionId)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.info('BppPassThrough/index - Registering route: POST/razorpay/webhook')
    fastify.route({
      method: 'POST',
      url: '/razorpay/webhook',
      schema: {
        description: '',
        tags: '',
        summary: ''
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const { body } = req
        if (!isUndefined(body) || isEmpty(body)) {
          fastify.log.error('body is required')
        }
        const response = await bppServiceHelper.addPaymentDetails(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.route({
      method: 'GET',
      url: '/payment-link/:transactionId',
      schema: {
        description: 'Get payment link for a transaction',
        tags: ['Payment'],
        summary: 'Get payment link by transaction ID',
        params: {
          type: 'object',
          properties: {
            transactionId: { type: 'string' }
          }
        }
      },
      handler: async (req, resp) => {
        const { bppServiceHelper } = fastify
        const {  params : { transactionId } } = req
        if (!isString(transactionId) || isEmpty(transactionId)) {
          fastify.log.error('transactionId is required')
        }
        const response = await bppServiceHelper.getPaymentObject(transactionId)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    });

    fastify.log.debug('Completed registering routes for BPP_SERVICE')
    done()
}