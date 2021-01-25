const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    bot: Joi.string().required(),
    user_response: Joi.object().required(),
    user_id: Joi.string().required(),
    client_id : Joi.string().required()
  }),
};

const getChats = {
  query: Joi.object().keys({
    userId : Joi.string(),
  })
};

const getChatByClient = {
  query: Joi.object().keys({
    client_id : Joi.string().required(),
  })
};

const getChat = {
  query: Joi.object().keys({
    ChatId: Joi.string(),
  }),
};

module.exports = {
  createChat,
  getChat,
  getChats,
  getChatByClient
};
