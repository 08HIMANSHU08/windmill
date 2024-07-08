// const Boom = require('@hapi/boom') //<---es5
import Boom from '@hapi/boom';
// const {
//   isNull, isEmpty, isUndefined
// } = require('lodash') <---es5
import lodash from 'lodash';
const { isNull, isEmpty, isUndefined } =lodash;
// const BppServiceBase = require('./bppServiceBase') //<---es5
import BppServiceBase from './bppServiceBase.js';

let bppServiceHelper

class BppServiceHelper {
  constructor (app) {
    this.app = app
    this.bppServiceBase = new BppServiceBase(app)
  }

  async processSearchRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      // const txnDetails = await models.Transaction.addUpdateTransaction(transactionDetails, models, transaction)
      const response = await this.bppServiceBase.processSearch(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(

          'BppServiceHelper: processSearchRequest',
          'Error in inserting transaction data')
          throw Boom.badRequest('Error in inserting transaction data');
      }
      this.app.log.debug('BppServiceHelper:processSearchRequest',
        `Inserted transaction with transactionId ${response.transactionId}`, {
        })
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

  async processSelectRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processSelect(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processSelectRequest',
          'Error in request body of select', {
          })
          throw  Boom.badRequest('Error in request body of select');
      }
      this.app.log.debug('BppServiceHelper: processSelectRequest',
        `send response  ${body.context.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processSelectRequest',
        'Error in request body of select', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async processInitRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processInit(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processInitRequest',
          'Error in request body of init', {
          })
          throw  Boom.badRequest('Error in request body of init');
      }
      this.app.log.debug('BppServiceHelper: processInitRequest',
        `send response  ${body.context.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processInitRequest',
        'Error in request body of init', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async processConfirmRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processConfirm(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processConfirmRequest',
          'Error in request body of confirm', {
          })
          throw  Boom.badRequest('Error in request body of confirm');
      }
      this.app.log.debug('BppServiceHelper: processConfirmRequest',
        `send response  ${body.context.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processConfirmRequest',
        'Error in request body of confirm', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async processStatusRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processStatus(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processStatusRequest',
          'Error in request body of status', {
          })
          throw  Boom.badRequest('Error in request body of status');
      }
      this.app.log.debug('BppServiceHelper: processStatusRequest',
        `send response  ${body.context.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processStatusRequest',
        'Error in request body of status', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }


  async processCancelRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processCancel(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processCancelRequest',
          'Error in request body of cancel', {
          })
          throw  Boom.badRequest('Error in request body of cancel');
      }
      this.app.log.debug('BppServiceHelper: processCancelRequest',
        `send response  ${body.context.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processCancelRequest',
        'Error in request body of cancel', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async processClaimRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processClaim(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processClaimRequest',
          'Error in request body of claim', {
          })
          throw  Boom.badRequest('Error in request body of claim');
      }
      this.app.log.debug('BppServiceHelper: processClaimRequest',
        `send response  ${body.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processClaimRequest',
        'Error in request body of claim', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async processRenewRequest(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const response = await this.bppServiceBase.processRenew(body, models, transaction)
      if (isNull(response) || isUndefined(response)) {
        this.app.log.error(
          'BppServiceHelper: processRenewRequest',
          'Error in request body of renew', {
          })
          throw  Boom.badRequest('Error in request body of renew');
      }
      this.app.log.debug('BppServiceHelper: processRenewRequest',
        `send response  ${body.transaction_id}`, {
        })
      // await transaction.commit()
      return response
    } catch (error) {
      // await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:processRenewRequest',
        'Error in request body of renew', {
          stack: error.stack,
          message: error.message,
        })
      throw  Boom.badRequest(error.message);
    }
  }

  async getFormHtml(transactionId, form_id) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    
    try {
      const form = await this.bppServiceBase.getFormHtml(transactionId, form_id)
      if (isNull(form)) {
        this.app.log.error(
          'BppServiceHelper: getFormHtml',
          'Error in getting form', {
          })
          throw  Boom.badRequest('Error in getting form');
      }
      this.app.log.debug('BppServiceHelper: getFormHtml',
        `get form with ${transactionId} ans ${form_id}`, {
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

  async getSubmissionId(transactionId, form_id, body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const form = await this.bppServiceBase.getSubmissionId(transactionId, form_id, models, body)
      if (isNull(form)) {
        this.app.log.error(
          'BppServiceHelper: getSubmissionId',
          'Error in getting submissionId', {
          })
          throw  Boom.badRequest('Error in getting submissionId');
      }
      this.app.log.debug('BppServiceHelper: getSubmissionId',
        `get submissionId with ${transactionId} ans ${form_id}`, {
        })
      await transaction.commit()
      return form
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:getSubmissionId',
        'Error in getting submissionId', {
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

  async getSelectProductData(transactionId) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const selectProductData = await models.Transaction.getSelectProductData(transactionId, models, transaction)
      if (isNull(selectProductData)) {
        this.app.log.error(
          'BppServiceHelper: getSelectProductData',
          'Error in getting selected product data')
          throw  Boom.badRequest('Error in getting selected product data');
      }
      this.app.log.debug('BppServiceHelper:getSelectProductData',
        `getting selected product data with transactionId:${transactionId}`, {
        })
      await transaction.commit()
      return selectProductData
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:getSelectProductData',
        'Error in getting selected product data', {
          stack: error.stack,
          message: error.message,
        })
      throw Boom.badRequest(error.message);
    }
  }

  async addPaymentDetails(body) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const paymentDetails = await models.Transaction.addPaymentDetails(body, models, transaction)
      if (isNull(paymentDetails)) {
        this.app.log.error(
          'BppServiceHelper: addPaymentDetails',
          'Error in inserting payment details')
          throw  Boom.badRequest('Error in inserting payment details');
      }
      this.app.log.debug('BppServiceHelper:addPaymentDetails',
        `inserting payment details with transactionId:${body.payload.payment.entity.notes.transaction_id}`, {
        })
      await transaction.commit()
      return paymentDetails
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:addPaymentDetails',
        'Error in inserting payment details', {
          stack: error.stack,
          message: error.message,
        })
      throw Boom.badRequest(error.message);
    }
  }

  async getPaymentObject(transactionId) {
    const { models } = this.app.sequelize
    const transaction = await this.app.sequelize.transaction()
    try {
      const paymentObject = await models.Transaction.getPaymentObject(transactionId, models, transaction)
      if (isNull(paymentObject)) {
        this.app.log.error(
          'BppServiceHelper: getPaymentObject',
          'Error in get payment details')
          throw  Boom.badRequest('Error in get payment details');
      }
      this.app.log.debug('BppServiceHelper:addPaymegetPaymentObjectntDetails',
        `getting payment details with transactionId:${transactionId}`, {
        })
      await transaction.commit()
      return paymentObject
    } catch (error) {
      await transaction.rollback()
      this.app.log.error(
        'BppServiceHelper:getPaymentObject',
        'Error in getting payment details', {
          stack: error.stack,
          message: error.message,
        })
      throw Boom.badRequest(error.message);
    }
  }

  static create (fastify) {
    if (isUndefined(bppServiceHelper)) {
      bppServiceHelper = new BppServiceHelper(fastify)
    }
    return bppServiceHelper
  }

}



// static BppServiceHelper.create = (app) => {
//   if (isUndefined(bppServiceHelper)) {
//     bppServiceHelper = new BppServiceHelper(app)
//     app.log.debug('BppServiceHelper:create', 'Created new transactionHelper')
//   }
//   return BppServiceHelper
// }
export default BppServiceHelper;
