const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const chatService = require('../services/chat.service');

const createChat = catchAsync(async (req, res) => {
  const chat = await chatService.createChat(req.body);
  res.status(httpStatus.CREATED).send(chat);
});

const getChat = catchAsync(async (req, res) => {
  const result = await chatService.getChat(req.query.id);
  res.send(result);
});


const getChatByClient = catchAsync(async (req, res) => {
  const result = await chatService.getChatByClient(req.query.client_id , req.query);
  res.send(result);
});

const getChats = catchAsync(async (req, res) => {
  const result = await chatService.getChats(req.query.userId);
  res.send(result);
});


module.exports = {
  createChat,
  getChat,
  getChats,
  getChatByClient
};
