
// import Boom from '@hapi/boom'

import config from 'config'

import axios from 'axios'

// import onRequestToBppGateway from '../services.js'
// import transaction from '../models/transaction.js'


class BppServiceBase {
  constructor (app) {
    this.app = app
  }

  async processPost (body, models, transaction) {
    try {
      // console.log(models.Tenant)
        const transactionIdDetails =
              await models.tenant.createTransactionDetails(
                body,
                models,
                transaction
              )
        
        return transactionIdDetails
        

    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnSearch', {
        code: error.code,
        type: error.type,
        message: error.message
      })
      throw error
    }
  }

async postFeedback(body, tenantId, id, models, transaction) {
  try {
    // console.log(models.Tenant)
      const transactionIdDetails =
            await models.tenant.updateFeedbackDetails(
              body,
              tenantId,
              id,
              models,
              transaction
            )
      
      return transactionIdDetails
      

  } catch (error) {
    await transaction.rollback()
    console.error('Error in backgroundJobForOnSearch', {
      code: error.code,
      type: error.type,
      message: error.message
    })
    throw error
  }
}


  async getData (tenantId, id, models, transaction) {
    try {
      let transactionIdDetails
      if( tenantId ==='all') {
        transactionIdDetails =
              await models.tenant.getAllData(
                models,
                transaction
              )
      } else {
        transactionIdDetails =
      await models.tenant.getData(
        tenantId,
        id,
        models,
        transaction
      )
      }
      
        
        return transactionIdDetails
    } catch (error) {
      console.error('Error in getFormHtml ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
      throw error
    }
  }

}

export default BppServiceBase