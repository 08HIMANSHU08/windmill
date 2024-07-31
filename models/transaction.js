/* eslint-disable no-useless-catch */
import Sequelize, { INTEGER } from 'sequelize';
import Boom from '@hapi/boom';
import lodash from 'lodash'
const { isUndefined } = lodash


export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('tenant', {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    creator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    approver: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['draft','pending', 'approved', 'rejected']],
      },
    },
    tenantId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Transaction.createTransactionDetails = async (body, models, transaction) => {
    try {
      return await models.tenant.create({
        creator: body.creator,
        data: body.theme,
        approver: body.approver,
        status: body.status,
        tenantId: body.tenantId,
      }, { transaction });
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  Transaction.updateFeedbackDetails = async (body, tenantId, id, models, transaction) => {
    try {
      return await models.tenant.update(
        { feedback: body.feedback },
        { where: { id }, transaction }
      );
    } catch (error) {
      throw error;
    }
  };

  Transaction.getData = async (tenantId, id, models) => {
    try {
      if(isUndefined(id)){
        const formdetails = await models.tenant.findAll({
          where: { tenantId },
        });
        console.log('formData-----', formdetails);
        return formdetails;
      } else {
        const formdetails = await models.tenant.findAll({
          where: { tenantId, id },
        });
        console.log('formData-----', formdetails);
        return formdetails;
      }
     
    } catch (error) {
      throw Boom.badRequest(error.message);
    }
  };

  Transaction.getAllData = async (models) => {
    try {
      const transactionIdDetails = await models.tenant.findAll();
      return transactionIdDetails;
    } catch (error) {
      throw Boom.badRequest(error.message);
    }
  };

  return Transaction;
};
