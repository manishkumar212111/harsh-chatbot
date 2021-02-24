const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createChatSchema = {
  body: Joi.object().keys({
    content: Joi.array().required(),
    response: Joi.array(),
    questionTag : Joi.string(),
    _id: Joi.string().required(),
  }),
};

const getChatSchema = {
  query: Joi.object().keys({
    chatSchemaId: Joi.string(),
  }),
};

module.exports = {
  createChatSchema,
  getChatSchema,
};
