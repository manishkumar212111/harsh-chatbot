const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createChat = {
  body: Joi.object().keys({
    bot: Joi.string().required(),
    response: Joi.object().required(),
    user_id: Joi.string().required(),
  }),
};

const getChat = {
  query: Joi.object().keys({
    ChatId: Joi.string(),
  }),
};

module.exports = {
  createChat,
  getChat,
};
