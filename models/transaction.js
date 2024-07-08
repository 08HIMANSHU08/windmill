// const Sequelize = require("sequelize"); //<---es5
import Sequelize from 'sequelize';
// const Boom = require("@hapi/boom"); //<---es5
import Boom from '@hapi/boom';
// const moment = require("moment"); //<---es5
import moment from 'moment';
// const axios = require("axios"); //<---es5
import axios from 'axios';
// const lookupdata = require("../lookup.json"); //<---es5
import lookupdata from '../lookup.json' assert { type: 'json' };
// const config = require('config') //<--es5
import config from 'config';

export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    formData: DataTypes.JSON,
    previousAction: DataTypes.STRING,
    selectedProduct: DataTypes.JSON,
    submissionId: DataTypes.JSON,
    payment: DataTypes.JSON,
    paymentUrl: DataTypes.STRING,
    status: DataTypes.STRING,
    onStatus: DataTypes.JSON,
    context: DataTypes.JSON,
    orderId: DataTypes.STRING,
    fulfillmentId: DataTypes.STRING,
    quoteId: DataTypes.STRING,
    proposalId: DataTypes.STRING,
    policyStatus: DataTypes.STRING,
    claimStatus: DataTypes.STRING,
    renewStatus: DataTypes.STRING
  });

  Transaction.createTransactionDetails= async (body, models, transaction)=>{
   
     await models.Transaction.create({
        transactionId: body.context.transaction_id,
        context: body.context,
        submissionId:  [],
        formData: {},
        previousAction: 'search'
      }, transaction);

  }

  Transaction.updateTransactionDetails= async (transactionIdDetails, createTransactionData, models, transaction)=>{
   
    await models.Transaction.update(
      {
         transactionId: transactionIdDetails.transactionId,
         submissionId: createTransactionData.submissionId,
         providerId: createTransactionData.providerId,
         formData: createTransactionData.formData,
         previousAction: createTransactionData.previousAction
     },{
      where: {
        transactionId: transactionIdDetails.transactionId
      }
    }, transaction )

 }

  // Transaction.getFromHtml = async (transactionId, form_id) => {
  //   try {
  //     const formServiceUrl = `${process.env.FORM_ServiceUrl}/form/:${form_id}?transactionId=${transactionId}`
  //     const formHtml = await axios.get(formServiceUrl)
  //     return formHtml
  //   } catch (error) {
  //     throw Boom.badRequest(error.message)
  //   }
  // }

  // Transaction.getSubmissionId = async (transactionId, form_id) => {
  //   try {
  //     const formServiceUrl = `${process.env.FORM_ServiceUrl}/form/submission/:${form_id}?transactionId=${transactionId}`
  //     const submissionId = await axios.get(formServiceUrl)
  //     return submissionId
  //   } catch (error) {
  //     throw Boom.badRequest(error.message)
  //   }
  // }

  Transaction.getFormData = async (transactionId, models) => {
    try {
      const formdetails = await models.Transaction.findAll({
        where: {
          transactionId
        }
      })
      console.log('formData-----', formdetails)
      return formdetails
    } catch (error) {
      throw Boom.badRequest(error.message)
    }
  }

  Transaction.getSelectProductData = async (transactionId, models) => {
    try {
      const selectProductData = await models.Transaction.findAll({
        where: {
          transactionId
        }
      })
      return selectProductData[0].selectedProduct
    } catch (error) {
      throw Boom.badRequest(error.message)
    }
  }

  Transaction.addPaymentDetails = async (body, models, transaction) => {
    try {
      const paymentStatusObj = {
        'payment_link.paid': 'PAID',
        'payment.failed': 'FAILED',
      }
      const paymentObj = await models.Transaction.update(
        {
        payment: body.payload,
        status:  paymentStatusObj[body.event] || 'Unknown'
      },{
        where: {
          transactionId: body.payload.payment.entity.notes.transaction_id
        }
      }, transaction)
      return {
        transactionId: body.payload.payment.entity.notes.transaction_id
      }
    } catch (error) {
      throw Boom.badRequest(error.message)
    }
  }

  Transaction.getPaymentObject = async (transactionId, models, transaction) => {
    try {
      const paymentObject = await models.Transaction.findOne({
        where: {
          transactionId
        }
      }, transaction)
      return {
        payment: paymentObject.payment,
        status: paymentObject.status,
        paymentUrl: paymentObject.paymentUrl
      }
    } catch (error) {
      throw Boom.badRequest(error.message)
    }
  }

  Transaction.updateOnStatusobject = async (catalogServiceresponse, transactionId, models, transaction) => {
    try {
      const onStatusObject = await models.Transaction.update({
          onStatus: catalogServiceresponse.data
      }, {
        where: {
          transactionId
        }
      }, transaction
      )
    } catch (error) {
      
    }
  }

  Transaction.getOnStatusObject = async (transactionId, models) => {
    try {
      const onStatusObject = await models.Transaction.findOne({
        where: {
          transactionId
        }
      })
      return {
        onStatus: onStatusObject.onStatus
      }
    } catch (error) {
      throw Boom.badRequest(error.message)
    }
  }
};

