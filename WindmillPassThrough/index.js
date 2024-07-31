
import fp from 'fastify-plugin';
import  BppServiceHelper from './WindmillServiceHelper.js';
import lodash from 'lodash';
const { isEmpty, isUndefined,isString } = lodash;

export default fp((fastify, opts, next) => {
    fastify.register(fp((fastify, opts, done) => {
      const bppServiceHelper = BppServiceHelper.create(fastify)
      fastify.decorate('bppServiceHelper', bppServiceHelper)
      fastify.log.info(' BppPassThrough/index', 'Created bppServiceHelper')
      done()
    }))
    fastify.register(registerRoutes)
    fastify.log.debug(' BppPassThrough/index', 'Registered all routes for  WINDMILL_SERVICE')
    next()
  })


const registerRoutes = (fastify, opts, done) => {

    fastify.log.info('BppPassThrough/index - Registering route: POST /windmill/postConfig/:tenantId')
    fastify.route({
      method: 'POST',
      url: '/windmill/postConfig/:tenantId',
      
      handler: async (req) => {
        const { bppServiceHelper } = fastify
        const { body } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('search body is required ')
        }
        const response = await bppServiceHelper.processPostRequest(body)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.info('BppPassThrough/index - Registering route: POST /windmill/postfeedback/:tenantId')
    fastify.route({
      method: 'POST',
      url: '/windmill/postfeedback/:tenantId',
      
      handler: async (req) => {
        const { bppServiceHelper } = fastify
        const { body, params : { tenantId }, query: { id } } = req
        if (isUndefined(body) || isEmpty(body)) {
          fastify.log.error('search body is required ')
        }
        const response = await bppServiceHelper.postFeedbackRequest(body, tenantId, id)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })
    
    
    fastify.log.info('BppPassThrough/index - Registering route: GET /windmill/getConfig/:tenantId')
    fastify.route({
      method: 'GET',
      url: '/windmill/getConfig/:tenantId',
      handler: async (req) => {
        const { bppServiceHelper } = fastify
        const { params : {tenantId}, query: { id } } = req
        const response = await bppServiceHelper.getData(tenantId, id)
        return response
      },
      preHandler: (req, reply, done) => {
        done()
      }
    })

    fastify.log.debug('Completed registering routes for BPP_SERVICE')
    done()
}