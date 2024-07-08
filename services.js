// const axios = require("axios"); //<---es5
import axios from 'axios';
// const Boom = require("@hapi/boom"); ///<---es5
import Boom from '@hapi/boom';

const onRequestToBppGateway = async (urls, postData, purpose) => {
  try {
    const response = await axios({
      url: `${urls}/${purpose}`,
      method: "POST",
      data: postData,
      json: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error in onRequestToBppGateway", {
      code: error.code,
      type: error.type,
      message: error.message,
    });
  }
};

export default onRequestToBppGateway;

