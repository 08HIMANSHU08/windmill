// const Boom = require("@hapi/boom"); <---es5
import Boom from '@hapi/boom'
// const config = require("config"); //<---es5
import config from 'config'
// const axios = require("axios"); //<---es5
import axios from 'axios'
// const lookupdata = require("../lookup.json"); //<---es5
import lookupdata from '../lookup.json' assert { type: 'json' }
import { v4 as uuidv4 } from 'uuid';
// const {
//   // catalogServiceDummyResponseSearch1,
//   // catalogServiceDummyResponseSelect,
//   ACK,
//   NACK,
// } = require("./constants"); //<---es5
import { ACK, NACK } from './constants.js'

// const { onRequestToBppGateway } = require("../services"); //<---es5
import onRequestToBppGateway from '../services.js'
import transaction from '../models/transaction.js'
class BppServiceBase {
  constructor (app) {
    this.app = app
  }

  async processSearch (body, models, transaction) {
    try {
      const categoryCodeArray = ['HEALTH_INSURANCE', 'LIFE_INSURANCE']
      const categoryCode = body.message.intent.category.descriptor.code
      if (categoryCodeArray.includes(categoryCode)) {
        this.backgroundJobForOnSearch(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('invalid category code', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnSearch (body, models, transaction) {
    try {
      if (body.context.action === 'search') {
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.context.transaction_id
          }
        })
        const submissionId =
          body.message?.intent?.provider?.items?.[0].xinput?.form_response
            ?.submission_id
        const providerId = body.message?.intent?.provider?.id
        const paymentobj = body.message?.intent?.payment
        let paymentarr = [paymentobj]
        let catalogServiceResponse = null
        //"https://fis.test.bpp.io/form/buyer_dtls?formId=FO1"this is tempoary // await axios.get(formServiceUrl);
        // if (formData?.transactionId === "") {
        //   formData.transactionId = transaction.transactionId;
        // }
        let catalogServiceUrl
        if (!submissionId && !providerId) {
          catalogServiceUrl = `http://${config.get(
            'catalog_service.host'
          )}:${config.get('catalog_service.port')}/catalog/search`
          catalogServiceResponse = await axios({
            method: 'POST',
            url: catalogServiceUrl,
            data: {
              transaction_id: body.context.transaction_id,
              type: 'health',
              callBackUri: 'dummyUrl',
              paymentObj: body.message.intent.payment
            }
          })
          console.log(
            'catalogServiceResponse for search0---->',
            catalogServiceResponse.data
          )
          if (!transactionIdDetails) {
            // const createTransactionData = {
            //   transactionId: body.context.transaction_id,
            //   submissionId: submissionId ? [submissionId] : [],
            //   providerId: providerId,
            //   formData: {}
            // }
            transactionIdDetails =
              await models.Transaction.createTransactionDetails(
                body,
                models,
                transaction
              )
          }
        } else {
          const formServiceUrl = `http://${config.get(
            'form_service.host'
          )}:${config.get('form_service.port')}/form/${submissionId}`
          const formServiceResponse = await axios.get(formServiceUrl)
          if (formServiceResponse) {
            if (!transactionIdDetails.submissionId.includes(submissionId)) {
              transactionIdDetails.submissionId.push(submissionId)
              console.log(formServiceResponse.data.data[0])
              const createTransactionData = {
                submissionId: transactionIdDetails.submissionId,
                formData: {
                  type: [formServiceResponse.data.data[0].type],
                  formDetails: {
                    ...transactionIdDetails.formData.formDetails,
                    ...this.getFormKeyWithJsonvalue(formServiceResponse)
                  }
                },
                previousAction: body.context.action
              }

              await models.Transaction.updateTransactionDetails(
                transactionIdDetails,
                createTransactionData,
                models,
                transaction
              )
            }
            //call cataog-service to get provider array
            catalogServiceUrl = `http://${config.get(
              'catalog_service.host'
            )}:${config.get('catalog_service.port')}/catalog/search`
            catalogServiceResponse = await axios({
              method: 'POST',
              url: catalogServiceUrl,
              data: {
                transaction_id: body.context.transaction_id,
                type: 'health',
                callBackUri: 'dummyUrl',
                paymentObj: body.message.intent.payment
              }
            })
            console.log(
              'catalogServiceResponse for search1--->',
              catalogServiceResponse.data
            )
            // catalogServiceresponse = await axios.get(catalogServiceUrl)
            // catalogServiceDummyResponseSearch1[0].payments = paymentarr
            // catalogServiceresponse = catalogServiceDummyResponseSearch1
          } else {
            console.error('invalid submissionId', {
              code: error.code,
              type: error.type,
              message: error.message
            })
          }
        }
        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        // const bppGatewayUrlOnSearch = `${bppGatewayUrl}/on_search`

        const contextBody = await this.prepareContextBody(body, 'on_search')
        const messageBody = await this.prepareOnSearchMessageBody(
          body,
          catalogServiceResponse
        )
        const bppGatewayPayloadForOnSearch = {
          context: contextBody,
          message: messageBody
        }
        console.log(
          'on_search request body ---->',
          JSON.stringify(bppGatewayPayloadForOnSearch)
        )
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnSearch,
          'on_search'
        )
        await transaction.commit()
        // axios.post(bppGatewayUrlOnSearch, bppGatewayPayloadForOnSearch);
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnSearch', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async processSelect (body, models, transaction) {
    try {
      if (body.context.transaction_id) {
        this.backgroundJobForOnSelect(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnSelect (body, models, transaction) {
    try {
      await models.Transaction.update(
        {
          previousAction: body.context.action,
          selectedProduct: {
            items: body.message.order.items,
            provider: body.message.order.provider
          }
        },
        {
          where: {
            transactionId: body.context.transaction_id
          }
        },
        transaction
      )

      // const formServiceUrl =`${process.env.FORM_ServiceUrl}/from/:${submissionId}`;
      // const formData = await axios.get(formServiceUrl)
      // catalogServiceresponse = await axios.get(catalogServiceUrl)
      // const catalogServiceresponse = catalogServiceDummyResponseSelect
      //tempoary
      const catalogServiceUrl = `http://${config.get(
        'catalog_service.host'
      )}:${config.get('catalog_service.port')}/catalog/select`
      const catalogServiceResponse = await axios({
        method: 'POST',
        url: catalogServiceUrl,
        data: {
          transaction_id: body.context.transaction_id,
          type: 'health',
          callBackUri: 'dummyUrl'
        }
      })
      console.log('catalogServiceResponse---->', catalogServiceResponse.data)
      await models.Transaction.update(
        {
          quoteId: catalogServiceResponse.data.quote.id,
          proposalId: catalogServiceResponse.data.quote.id
        },
        {
          where: {
            transactionId: transactionIdDetails.transactionId
          }
        }
      )
      const contextBody = await this.prepareContextBody(body, 'on_select')
      const messageBody = this.prepareOnSelectMessageBody(
        body,
        catalogServiceResponse
      )

      const bppGatewayPayloadForOnSelect = {
        context: contextBody,
        message: messageBody
      }

      console.log(
        'on_select request body--->',
        JSON.stringify(bppGatewayPayloadForOnSelect)
      )
      const bppGatewayUrl = `http://${config.get(
        'bpp_gateway.host'
      )}:${config.get('bpp_gateway.port')}`
      await onRequestToBppGateway(
        bppGatewayUrl,
        bppGatewayPayloadForOnSelect,
        'on_select'
      )
      await transaction.commit()
      // axios.post(bppGatewayUrl, bppGatewayPayloadForOnSelect)
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnSelect', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async getFormHtml (transactionId, form_id) {
    try {
      const formServiceUrl = `http://${config.get(
        'form_service.host'
      )}:${config.get(
        'form_service.port'
      )}/form/details/${form_id}?transactionId=${transactionId}`
      const formHtml = await axios.get(formServiceUrl)
      return formHtml.data
    } catch (error) {
      console.error('Error in getFormHtml ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async processInit (body, models, transaction) {
    try {
      if (body.context.transaction_id) {
        this.backgroundJobForOnInit(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnInit (body, models, transaction) {
    try {
      if (body.context.action === 'init') {
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.context.transaction_id
          }
        })

        const submissionId =
          body.message?.order?.items?.[0].xinput?.form_response?.submission_id
        const formServiceUrl = `http://${config.get(
          'form_service.host'
        )}:${config.get('form_service.port')}/form/${submissionId}`
        const formServiceResponse = await axios.get(formServiceUrl)
        if (formServiceResponse) {
          if (!transactionIdDetails.submissionId?.includes(submissionId)) {
            transactionIdDetails.submissionId.push(submissionId)
          }
          if (
            !transactionIdDetails.formData?.type?.includes(
              formServiceResponse.data.data[0].type
            )
          ) {
            if (formServiceResponse.data.data[0].type) {
              transactionIdDetails.formData.type.push(
                formServiceResponse.data.data[0].type
              )
            }
          }
          await models.Transaction.update(
            {
              previousAction: body.context.action,
              submissionId: [...transactionIdDetails.submissionId],
              selectedProduct: {
                items: body.message.order.items,
                provider: body.message.order.provider
              },
              formData: {
                type: [...transactionIdDetails.formData.type],
                formDetails: {
                  ...transactionIdDetails.formData.formDetails,
                  ...this.getFormKeyWithJsonvalue(formServiceResponse)
                }
              }
            },
            {
              where: {
                transactionId: body.context.transaction_id
              }
            },
            transaction
          )
        } else {
          console.error('invalid submissionId', {
            code: error.code,
            type: error.type,
            message: error.message
          })
        }
        const catalogServiceUrl = `http://${config.get(
          'catalog_service.host'
        )}:${config.get('catalog_service.port')}/catalog/init`
        const catalogServiceResponse = await axios({
          method: 'POST',
          url: catalogServiceUrl,
          data: {
            transaction_id: body.context.transaction_id,
            type: 'health',
            callBackUri: 'dummyUrl',
            fulfillments: body.message.order.fulfillments,
            payments: body.message.order.payments
          }
        })
        console.log('catalogServiceResponse --->', catalogServiceResponse.data)
        if(!transactionIdDetails.paymentUrl){
          await models.Transaction.update({
            paymentUrl: catalogServiceResponse.data.payments[0].url
          },
           {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
           }
          )
        }

        const contextBody = await this.prepareContextBody(body, 'on_init')
        const messageBody = await this.prepareOnInitMessageBody(
          body,
          catalogServiceResponse
        )
        const bppGatewayPayloadForOnInit = {
          context: contextBody,
          message: messageBody
        }
        console.log(
          'on_init request body---->',
          JSON.stringify(bppGatewayPayloadForOnInit)
        )

        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnInit,
          'on_init'
        )
        await transaction.commit()
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnInit ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async processConfirm (body, models, transaction) {
    try {
      if (body.context.transaction_id) {
        this.backgroundJobForOnConfirm(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnConfirm (body, models, transaction) {
    try {
      if (body.context.action === 'confirm') {
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.context.transaction_id
          }
        })

        const submissionId =
          body.message?.order?.items?.[0].xinput?.form_response?.submission_id
        const formServiceUrl = `http://${config.get(
          'form_service.host'
        )}:${config.get('form_service.port')}/form/${submissionId}`
        const formServiceResponse = await axios.get(formServiceUrl)
        if (formServiceResponse) {
          if (!transactionIdDetails.submissionId?.includes(submissionId)) {
            transactionIdDetails.submissionId.push(submissionId)
          }
          if (
            !transactionIdDetails.formData?.type?.includes(
              formServiceResponse.data.data[0].type
            )
          ) {
            if (formServiceResponse.data.data[0].type) {
              transactionIdDetails.formData.type.push(
                formServiceResponse.data.data[0].type
              )
            }
          }
          await models.Transaction.update(
            {
              previousAction: body.context.action,
              submissionId: [...transactionIdDetails.submissionId],
              selectedProduct: {
                items: body.message.order.items,
                provider: body.message.order.provider
              },
              formData: {
                type: [...transactionIdDetails.formData.type],
                formDetails: {
                  ...transactionIdDetails.formData.formDetails,
                  ...this.getFormKeyWithJsonvalue(formServiceResponse)
                }
              }
            },
            {
              where: {
                transactionId: body.context.transaction_id
              }
            },
            transaction
          )
        } else {
          console.error('invalid submissionId', {
            code: error.code,
            type: error.type,
            message: error.message
          })
        }

        const catalogServiceUrl = `http://${config.get(
          'catalog_service.host'
        )}:${config.get('catalog_service.port')}/catalog/confirm`
        const catalogServiceResponse = await axios({
          method: 'POST',
          url: catalogServiceUrl,
          data: {
            transaction_id: body.context.transaction_id,
            type: 'health',
            callBackUri: 'dummyUrl',
            fulfillments: body.message.order.fulfillments,
            payments: body.message.order.payments
          }
        })
        console.log('catalogServiceResponse', catalogServiceResponse.data)
        await models.Transaction.update(
          {
            orderId: catalogServiceResponse.data.id
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
        const paymentDetails = await models.Transaction.getPaymentObject(
          body.context.transaction_id,
          models
        )
        catalogServiceResponse.data.payments[0].params.transaction_id =
          paymentDetails.payment.payment_link.entity.reference_id
        catalogServiceResponse.data.payments[0].status = paymentDetails.status
        const contextBody = await this.prepareContextBody(body, 'on_confirm')
        const messageBody = await this.prepareOnConfirmMessageBody(
          body,
          catalogServiceResponse
        )
        const bppGatewayPayloadForOnConfirm = {
          context: contextBody,
          message: messageBody
        }
        console.log(
          'on_confirm request body',
          JSON.stringify(bppGatewayPayloadForOnConfirm)
        )
        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnConfirm,
          'on_confirm'
        )
        await transaction.commit()
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnConfirm ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async processStatus (body, models, transaction) {
    try {
      if (body.context.transaction_id) {
        this.backgroundJobForOnStatus(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnStatus (body, models, transaction) {
    try {
      if (body.context.action === 'status') {
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.context.transaction_id
          }
        })

        const transactionId = body.context?.transaction_id
        const submissionId =
          body.message?.order?.items?.[0].xinput?.form_response?.submission_id
        await models.Transaction.update(
          {
            previousAction: body.context.action
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
        let check = ["ACTIVE","CANCELLATION_INITIATED","CANCELLED"]
        let bppGatewayPayloadForOnStatus
        if (transactionIdDetails.status === null || check.includes(transactionIdDetails.policyStatus))  {
          const onStatusBody = await models.Transaction.getOnStatusObject(
            transactionId,
            models
          )
          if(onStatusBody.onStatus.provider.description === undefined)
            {
              onStatusBody.onStatus.provider.description = "description",
              onStatusBody.onStatus.provider.descriptor.description = "descriptor description"
              onStatusBody.onStatus.items[0].time.description = "P1Y"
            }
          bppGatewayPayloadForOnStatus = {
            context: await this.prepareContextBody(body, 'on_status'),
            message: {
              order: onStatusBody.onStatus
            }
          }
          console.log(
            'on_status request body',
            JSON.stringify(bppGatewayPayloadForOnStatus)
          )
        } else {

          const catalogServiceUrl = `http://${config.get(
            'catalog_service.host'
          )}:${config.get('catalog_service.port')}/catalog/status`
          const catalogServiceResponse = await axios({
            method: 'POST',
            url: catalogServiceUrl,
            data: {
              transaction_id: body.context.transaction_id,
              type: 'health',
              callBackUri: 'dummyUrl'
            }
          })
          catalogServiceResponse.data.payments[0].status =
            transactionIdDetails.status
          const contextBody = await this.prepareContextBody(body, 'on_status')
          const messageBody = await this.prepareOnStatusMessageBody(
            body,
            catalogServiceResponse
          )
          bppGatewayPayloadForOnStatus = {
            context: contextBody,
            message: messageBody
          }
          console.log(
            'on_status request body',
            JSON.stringify(bppGatewayPayloadForOnStatus)
          )
        }
        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnStatus,
          'on_status'
        )
        await transaction.commit()
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnStatus ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async unSolicatedOnStatus (body, models, transaction) {
    try {
     
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.transaction_id
          }
        }) 
        let status
        if(body.action == 'cancel'){
          status=transactionIdDetails.policyStatus
        } else  if(body.action == 'claim'){
          status=transactionIdDetails.claimStatus
        } else  if(body.action == 'renew'){
          status=transactionIdDetails.renewStatus
        } 
        const catalogServiceUrl = `http://${config.get(
          'catalog_service.host'
        )}:${config.get('catalog_service.port')}/catalog/update`
        const catalogServiceResponse = await axios({
          method: 'POST',
          url: catalogServiceUrl,
          data: {
            transaction_id: body.transaction_id,
            type: 'health',
            callBackUri: 'dummyUrl',
            action: body.action,
            orderId: transactionIdDetails.orderId,
            fulfillmentId: transactionIdDetails.fulfillmentId,
            proposalId: transactionIdDetails.proposalId,
            quoteId: transactionIdDetails.quoteId,
            status: status,
            createdAt: transactionIdDetails.createdAt,
            updatedAt: transactionIdDetails.updatedAt
          }
        })
        console.log('catalogServiceResponse', catalogServiceResponse.data)
        if(body.action == 'cancel'){
          await models.Transaction.update(
            {
              policyStatus:
                catalogServiceResponse.data.status
            },
            {
              where: {
                transactionId: transactionIdDetails.transactionId
              }
            }
          )
        } else  if(body.action == 'claim'){
          await models.Transaction.update(
            {
              claimStatus:
                catalogServiceResponse.data.fulfillments[1].state.descriptor.code
            },
            {
              where: {
                transactionId: transactionIdDetails.transactionId
              }
            }
          )
        } else  if(body.action == 'renew'){
          await models.Transaction.update(
            {
              renewStatus:
                catalogServiceResponse.data.fulfillments[1].state.descriptor.code
            },
            {
              where: {
                transactionId: transactionIdDetails.transactionId
              }
            }
          )
        }
        const context = transactionIdDetails.context
        const contextBody = await this.prepareContextBodyForOnUpdate(context)
        const messageBody = await this.prepareOnUpdateMessageBody(catalogServiceResponse)
        const bppGatewayPayloadForOnUpdate = {
          context: contextBody,
          message: messageBody
        }
        console.log(
          'on_update request body',
          JSON.stringify(bppGatewayPayloadForOnUpdate)
        )
        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnUpdate,
          'on_status'
        )
        // await transaction.commit()

    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnStatus ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }


  async processCancel (body, models, transaction) {
    try {
      if (body.context.transaction_id) {
        this.backgroundJobForOnCancel(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnCancel (body, models, transaction) {
    try {
      if (body.context.action === 'cancel') {
        let transactionIdDetails = await models.Transaction.findOne({
          where: {
            transactionId: body.context.transaction_id
          }
        })

        const transactionId = body.context?.transaction_id
        const submissionId =
          body.message?.order?.items?.[0].xinput?.form_response?.submission_id
        await models.Transaction.update(
          {
            previousAction: body.context.action
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
        const catalogServiceUrl = `http://${config.get(
          'catalog_service.host'
        )}:${config.get('catalog_service.port')}/catalog/cancel`
        const catalogServiceResponse = await axios({
          method: 'POST',
          url: catalogServiceUrl,
          data: {
            transaction_id: body.context.transaction_id,
            type: 'health',
            callBackUri: 'dummyUrl',
            action: body.context.action,
            orderId: transactionIdDetails.orderId,
            fulfillmentId: transactionIdDetails.fulfillmentId,
            proposalId: transactionIdDetails.proposalId,
            quoteId: transactionIdDetails.quoteId,
            status: transactionIdDetails.policyStatus,
            createdAt: transactionIdDetails.createdAt,
            updatedAt: transactionIdDetails.updatedAt
          }
        })
        console.log('catalogServiceResponse', catalogServiceResponse.data)
        
        await models.Transaction.updateOnStatusobject(
          catalogServiceResponse,
          transactionId,
          models,
          transaction
        )
        await models.Transaction.update(
          {
            policyStatus: catalogServiceResponse.data.status
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
        const contextBody = await this.prepareContextBody(body, 'on_confirm')
        const messageBody = await this.prepareOnCancelMessageBody(
          body,
          catalogServiceResponse
        )
        const bppGatewayPayloadForOnCancel = {
          context: contextBody,
          message: messageBody
        }
        console.log(
          'on_confirm request body',
          JSON.stringify(bppGatewayPayloadForOnCancel)
        )
        const bppGatewayUrl = `http://${config.get(
          'bpp_gateway.host'
        )}:${config.get('bpp_gateway.port')}`
        await onRequestToBppGateway(
          bppGatewayUrl,
          bppGatewayPayloadForOnCancel,
          'on_cancel'
        )
        const reqBody = {
          action:'cancel',
          transaction_id:body.context.transaction_id
        }
        
        await new Promise(resolve => {
          setTimeout(async () => {
            await this.backgroundJobForOnUpdate(reqBody, models, transaction);
            resolve();
          }, 5000);
        });
        
        await transaction.commit();
      }
    } catch (error) {
      await transaction.rollback()
      console.error('Error in backgroundJobForOnCancel ', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }

  async backgroundJobForOnUpdate (body, models, transaction) {
    try {
      let transactionIdDetails = await models.Transaction.findOne({
        where: {
          transactionId: body.transaction_id
        }
      }) 
      let status
      if(body.action == 'cancel'){
        status=transactionIdDetails.policyStatus
      } else  if(body.action == 'claim'){
        status=transactionIdDetails.claimStatus
      } else  if(body.action == 'renew'){
        status=transactionIdDetails.renewStatus
      } 
      const catalogServiceUrl = `http://${config.get(
        'catalog_service.host'
      )}:${config.get('catalog_service.port')}/catalog/update`
      const catalogServiceResponse = await axios({
        method: 'POST',
        url: catalogServiceUrl,
        data: {
          transaction_id: body.transaction_id,
          type: 'health',
          callBackUri: 'dummyUrl',
          action: body.action,
          orderId: transactionIdDetails.orderId,
          fulfillmentId: transactionIdDetails.fulfillmentId,
          proposalId: transactionIdDetails.proposalId,
          quoteId: transactionIdDetails.quoteId,
          status: status,
          createdAt: transactionIdDetails.createdAt,
          updatedAt: transactionIdDetails.updatedAt
        }
      })
      console.log('catalogServiceResponse', catalogServiceResponse.data)
      await models.Transaction.updateOnStatusobject(
        catalogServiceResponse,
        body.transaction_id,
        models,
        transaction
      )
      if(body.action == 'cancel'){
        await models.Transaction.update(
          {
            policyStatus:
              catalogServiceResponse.data.status
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
      } else  if(body.action == 'claim'){
        await models.Transaction.update(
          {
            claimStatus:
              catalogServiceResponse.data.fulfillments[1].state.descriptor.code
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
      } else  if(body.action == 'renew'){
        await models.Transaction.update(
          {
            renewStatus:
              catalogServiceResponse.data.fulfillments[1].state.descriptor.code
          },
          {
            where: {
              transactionId: transactionIdDetails.transactionId
            }
          }
        )
      }
      const context = transactionIdDetails.context
      const contextBody = await this.prepareContextBodyForOnUpdate(context)
      const messageBody = await this.prepareOnUpdateMessageBody(catalogServiceResponse)
      const bppGatewayPayloadForOnUpdate = {
        context: contextBody,
        message: messageBody
      }
      console.log(
        'on_update request body',
        JSON.stringify(bppGatewayPayloadForOnUpdate)
      )
      const bppGatewayUrl = `http://${config.get(
        'bpp_gateway.host'
      )}:${config.get('bpp_gateway.port')}`
      await onRequestToBppGateway(
        bppGatewayUrl,
        bppGatewayPayloadForOnUpdate,
        'on_update'
      )
      // await transaction.commit()
    } catch (error) {
      console.error('error in backgroundJobForOnUpdate', error.message)
    }
  }
  async prepareOnCancelMessageBody (body,catalogServiceResponse){
    try {
      const message = {
        order: catalogServiceResponse.data
      }
      return message
    } catch (error) {
      console.error('error in prepareOnCancelMessageBody', error.message)
    }
  }
  async getSubmissionId (transactionId, form_id, models, data) {
    try {
      const formServiceUrl = `http://${config.get(
        'form_service.host'
      )}:${config.get(
        'form_service.port'
      )}/form/submission/${form_id}?transactionId=${transactionId}`
      const submissionId = await axios.post(formServiceUrl, data)
      const catalogServiceUrl = `http://${config.get(
        'catalog_service.host'
      )}:${config.get('catalog_service.port')}/catalog/status`
      const catalogServiceresponse = await axios({
        method: 'POST',
        url: catalogServiceUrl,
        data: {
          submission_id: submissionId.data.data.submission_id,
          form_id
        }
      })
      await models.Transaction.updateOnStatusobject(
        catalogServiceresponse,
        transactionId,
        models,
        transaction
      )
      return {
        submission_id: submissionId.data.data.submission_id
      }
    } catch (error) {
      console.error('error in getSubmissionId', error.message)
    }
  }

  async getFormData (transactionId, models) {
    console.log('getFormData3 --->', transactionId)
    try {
      console.log('getFormData 4--->', transactionId)
      const formdetails = await models.Transaction.findAll({
        where: {
          transactionId
        }
      })
      console.log('formdetailsdb-------->', formdetails)
      return formdetails[0].formData
    } catch (error) {
      console.error('error in getFormData', error.message)
    }
  }

  async getSelectProductData (transactionId, models) {
    try {
      const selectProductData = await models.Transaction.findAll({
        where: {
          transactionId
        }
      })
      return selectProductData[0].selectedProduct
    } catch (error) {
      console.error('error in getSelectProductData', error.message)
    }
  }

  getFormKeyWithJsonvalue (formServiceResponse) {
    switch (formServiceResponse.data.data[0].type) {
      case 'PF':
        return {
          PF: formServiceResponse.data.data[0].form_data.PF
        }
      case 'FF':
        return {
          FF: formServiceResponse.data.data[0].form_data.FF
        }
      case 'KYC':
        return {
          KYC: formServiceResponse.data.data[0].form_data.KYC
        }
      case 'PDF':
        return {
          PDF: formServiceResponse.data.data[0].form_data.PDF
        }
      case 'NDF':
        return {
          NDF: formServiceResponse.data.data[0].form_data.NDF
        }

      default:
        return {}
    }
  }

  async prepareContextBody (body, purpose) {
    try {
      const context = body.context
      context.action = purpose
      context.timestamp = new Date()
      context.bpp_id = lookupdata.subscriber_id
      context.bpp_uri = lookupdata.subscriber_url
      return context
    } catch (err) {
      console.error('error in prepareContextBody', error.message)
    }
  }

  prepareOnSearchMessageBody (body, catalogServiceResponse) {
    try {
      const message = {
        catalog: {
          descriptor: {
            name: catalogServiceResponse.data[0].descriptor.name //catalogServiceresponse[0].descriptor.name
          },
          providers: catalogServiceResponse.data
        }
      }
      return message
    } catch (error) {
      console.error('error in prepareOnSearchMessageBody', error.message)
    }
  }

  prepareOnSelectMessageBody (body, catalogServiceResponse) {
    try {
      const message = {
        order: {
          items: catalogServiceResponse.data.items,
          provider: catalogServiceResponse.data.provider,
          quote: catalogServiceResponse.data.quote
        }
      }
      return message
    } catch (error) {
      console.error('error in prepareOnSelectMessageBody', error.message)
    }
  }

  prepareOnInitMessageBody (body, catalogServiceResponse) {
    try {
      const message = {
        order: {
          fulfillments: catalogServiceResponse.data.fulfillments,
          items: catalogServiceResponse.data.items,
          payments: catalogServiceResponse.data.payments,
          provider: catalogServiceResponse.data.provider,
          quote: catalogServiceResponse.data.quote,
          cancellation_terms: catalogServiceResponse.data.cancellation_terms
        }
      }
      return message
    } catch (error) {
      console.error('error in prepareOnInitMessageBody', error.message)
    }
  }

  async prepareOnConfirmMessageBody (body, catalogServiceResponse) {
    try {
      const message = {
        order: {
          fulfillments: catalogServiceResponse.data.fulfillments,
          items: catalogServiceResponse.data.items,
          id: catalogServiceResponse.data.id,
          payments: catalogServiceResponse.data.payments,
          provider: catalogServiceResponse.data.provider,
          quote: catalogServiceResponse.data.quote,
          status: catalogServiceResponse.data.status,
          documents: catalogServiceResponse.data.documents,
          created_at: catalogServiceResponse.data.created_at,
          updated_at: catalogServiceResponse.data.updated_at,
          cancellation_terms: catalogServiceResponse.data.cancellation_terms
        }
      }
      return message
    } catch (error) {
      console.error('error in prepareOnConfirmMessageBody', error.message)
    }
  }

  async prepareOnStatusMessageBody (body, catalogServiceResponse) {
    try {
      const message = {
        order: {
          fulfillments: catalogServiceResponse.data.fulfillments,
          items: catalogServiceResponse.data.items,
          provider: catalogServiceResponse.data.provider,
          payments: catalogServiceResponse.data.payments,
          quote: catalogServiceResponse.data.quote
        }
      }
      return message
    } catch (error) {
      console.error('error in prepareOnConfirmMessageBody', error.message)
    }
  }


  async processClaim (body, models, transaction) {
    try {
      if (body.transaction_id) {
        this.backgroundJobForOnClaim(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }


  async backgroundJobForOnClaim (body, models, transaction) {
    try {
      let transactionIdDetails = await models.Transaction.findOne({
        where: {
          transactionId: body.transaction_id
        }
      })
      const catalogServiceUrl = `http://${config.get(
        'catalog_service.host'
      )}:${config.get('catalog_service.port')}/catalog/update`
      const catalogServiceResponse = await axios({
        method: 'POST',
        url: catalogServiceUrl,
        data: {
          transaction_id: body.transaction_id,
          type: 'health',
          callBackUri: 'dummyUrl',
          action: 'claim',
          orderId: transactionIdDetails.orderId,
          fulfillmentId: transactionIdDetails.fulfillmentId,
          proposalId: transactionIdDetails.proposalId,
          quoteId: transactionIdDetails.quoteId,
          status: body.state,
          createdAt: transactionIdDetails.createdAt,
          updatedAt: transactionIdDetails.updatedAt
        }
      })
      console.log('catalogServiceResponse', catalogServiceResponse.data)
      await models.Transaction.updateOnStatusobject(
        catalogServiceResponse,
        body.transaction_id,
        models,
        transaction
      )
      await models.Transaction.update(
        {
          claimStatus:
            catalogServiceResponse.data.fulfillments[1].state.descriptor.code
        },
        {
          where: {
            transactionId: transactionIdDetails.transactionId
          }
        }
      )
      const context = transactionIdDetails.context
      const contextBody = await this.prepareContextBodyForOnUpdate(context)
      const messageBody = await this.prepareOnUpdateMessageBody(catalogServiceResponse)
      const bppGatewayPayloadForOnUpdate = {
        context: contextBody,
        message: messageBody
      }
      console.log(
        'on_confirm request body',
        JSON.stringify(bppGatewayPayloadForOnUpdate)
      )
      const bppGatewayUrl = `http://${config.get(
        'bpp_gateway.host'
      )}:${config.get('bpp_gateway.port')}`
      await onRequestToBppGateway(
        bppGatewayUrl,
        bppGatewayPayloadForOnUpdate,
        'on_update'
      )

      // const reqBody = {
      //   action:'claim',
      //   transaction_id:body.transaction_id
      // }
      
      // await new Promise(resolve => {
      //   setTimeout(async () => {
      //     await this.backgroundJobForOnUpdate(reqBody, models, transaction);
      //     resolve();
      //   }, 5000);
      // });
      // await new Promise(resolve => {
      //   setTimeout(async () => {
      //     await this.unSolicatedOnStatus(reqBody, models, transaction);
      //     resolve();
      //   }, 10000);
      // });
      // await new Promise(resolve => {
      //   setTimeout(async () => {
      //     await this.backgroundJobForOnUpdate(reqBody, models, transaction);
      //     resolve();
      //   }, 15000);
      // });
      
      await transaction.commit()
    } catch (error) {
      console.error('error in backgroundJobForOnClaim', error.message)
    }
  }

  async processRenew (body, models, transaction) {
    try {
      if (body.transaction_id) {
        this.backgroundJobForOnRenew(body, models, transaction)
        return ACK
      }
      return NACK
    } catch (error) {
      console.error('transactionId cannot be empty', {
        code: error.code,
        type: error.type,
        message: error.message
      })
    }
  }


  async backgroundJobForOnRenew (body, models, transaction) {
    try {
      let transactionIdDetails = await models.Transaction.findOne({
        where: {
          transactionId: body.transaction_id
        }
      })
      const catalogServiceUrl = `http://${config.get(
        'catalog_service.host'
      )}:${config.get('catalog_service.port')}/catalog/update`
      const catalogServiceResponse = await axios({
        method: 'POST',
        url: catalogServiceUrl,
        data: {
          transaction_id: body.transaction_id,
          type: 'health',
          callBackUri: 'dummyUrl',
          action: 'renew',
          orderId: transactionIdDetails.orderId,
          fulfillmentId: transactionIdDetails.fulfillmentId,
          proposalId: transactionIdDetails.proposalId,
          quoteId: transactionIdDetails.quoteId,
          status: body.state,
          createdAt: transactionIdDetails.createdAt,
          updatedAt: transactionIdDetails.updatedAt
        }
      })
      console.log('catalogServiceResponse', catalogServiceResponse.data)
      await models.Transaction.updateOnStatusobject(
        catalogServiceResponse,
        body.transaction_id,
        models,
        transaction
      )
      await models.Transaction.update(
        {
          renewStatus:
            catalogServiceResponse.data.fulfillments[1].state.descriptor.code
        },
        {
          where: {
            transactionId: transactionIdDetails.transactionId
          }
        }
      )
      const context = transactionIdDetails.context
      const contextBody = await this.prepareContextBodyForOnUpdate(context)
      const messageBody = await this.prepareOnUpdateMessageBody(catalogServiceResponse)
      const bppGatewayPayloadForOnUpdate = {
        context: contextBody,
        message: messageBody
      }
      console.log(
        'on_confirm request body',
        JSON.stringify(bppGatewayPayloadForOnUpdate)
      )
      const bppGatewayUrl = `http://${config.get(
        'bpp_gateway.host'
      )}:${config.get('bpp_gateway.port')}`
      await onRequestToBppGateway(
        bppGatewayUrl,
        bppGatewayPayloadForOnUpdate,
        'on_update'
      )
      // const reqBody = {
      //   action:'renew',
      //   transaction_id:body.transaction_id
      // }
      
      // await new Promise(resolve => {
      //   setTimeout(async () => {
      //     await this.unSolicatedOnStatus(reqBody, models, transaction);
      //     resolve();
      //   }, 5000);
      // });
      // await new Promise(resolve => {
      //   setTimeout(async () => {
      //     await this.backgroundJobForOnUpdate(reqBody, models, transaction);
      //     resolve();
      //   }, 10000);
      // });
      
      await transaction.commit()
    } catch (error) {
      console.error('error in backgroundJobForOnRenew', error.message)
    }
  }

  async prepareContextBodyForOnUpdate (context) {
    try {
      context.action = 'on_update'
      context.timestamp = new Date()
      context.message_id = uuidv4()
      context.bpp_id = lookupdata.subscriber_id
      context.bpp_uri = lookupdata.subscriber_url
      return context
    } catch (error) {
      console.error('error in prepareContextBodyForOnUpdate', error.message)
    }
  }

  async prepareOnUpdateMessageBody (catalogServiceResponse) {
    try {
      const message = {
        order: catalogServiceResponse.data
      }
      return message
    } catch (error) {
      console.error('error in prepareOnUpdateMessageBody', error.message)
    }
  }
}

export default BppServiceBase