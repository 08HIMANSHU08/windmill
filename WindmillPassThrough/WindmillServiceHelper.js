
import Boom from '@hapi/boom';

import lodash from 'lodash';
const { isNull, isUndefined } =lodash;
import BppServiceBase from './WindmillServiceBase.js';

let bppServiceHelper

class BppServiceHelper {
  constructor (app) {
    this.app = app
    this.bppServiceBase = new BppServiceBase(app)
  }

  async processPostRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processPost(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processSearchRequest',
          'Error in inserting transaction data')
          throw Boom.badRequest('Error in inserting transaction data');
      }
      this.app.log.debug('BppServiceHelper:processSearchRequest',
        `Inserted transaction with transactionId ${response.transactionId}`, {
        })
      await transaction.commit()
      return response
    } catch (error) {
      this.app.log.error(
        'BppServiceHelper:processSearchRequest',
        'Error in inserting transaction data', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

    async postFeedbackRequest(body, tenantId, id) {
      const { models } = this.app.sequelize
      const transaction = await this.app.sequelize.transaction()
      try {
        const response = await this.bppServiceBase.postFeedback(body, tenantId, id, models, transaction)
        if (isNull(response) || isUndefined(response)) {
          this.app.log.error(
            'BppServiceHelper: processSearchRequest',
            'Error in inserting transaction data')
            throw Boom.badRequest('Error in inserting transaction data');
        }
        this.app.log.debug('BppServiceHelper:processSearchRequest',
          `Inserted feedback for id = ${id}`, {
          })
        await transaction.commit()
        return response
      } catch (error) {
        this.app.log.error(
          'BppServiceHelper:processSearchRequest',
          'Error in inserting transaction data', {
            stack: error.stack,
            message: error.message,
          })
        throw  Boom.badRequest(error.message);
      }
    }

  async getData( tenantId, id ) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    
    try {
      const form = await this.bppServiceBase.getData(tenantId, id, models, transaction)
      if (isNull(form)) {
        this.app.log.error(
          'BppServiceHelper: getFormHtml',
          'Error in getting form', {
          })
          throw  Boom.badRequest('Error in getting form');
      }
      this.app.log.debug('BppServiceHelper: getFormHtml',
        `get Data with ${id}`, {
        })
      await transaction.commit()
      return form
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:getFormHtml',
        'Error in getting form', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async getFormData(transactionId) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const formDetails = await models.Transaction.getFormData(transactionId, models, transaction)
      console.log('formDetails-------------->', formDetails)
      if (formDetails.length === 0) {
        await transaction.commit()
        return {}
      }
      this.app.log.debug('BppServiceHelper:getFormData',
        `getting form data with transactionId:${transactionId}`, {
        })
      await transaction.commit()
      return formDetails[0].formData
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:getFormData',
        'Error in getting form data', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    } 
    // finally {
    //   await transaction.cleanup();
    // }
  }


  static create (fastify) {
    if (isUndefined(bppServiceHelper)) {
      bppServiceHelper = new BppServiceHelper(fastify)
    }
    return bppServiceHelper
  }

}

export default BppServiceHelper;
