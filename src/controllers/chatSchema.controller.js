const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const chatService = require('../services/chatSchema.service');

const createChatSchema = catchAsync(async (req, res) => {
  const chat = await chatService.createChatSchema(req.body);
  res.status(httpStatus.CREATED).send(chat);
});

const getChatSchema = catchAsync(async (req, res) => {
  const result = await chatService.getChat(req.query.chatSchemaId);
  res.send(result);
});


module.exports = {
  createChatSchema,
  getChatSchema
};
