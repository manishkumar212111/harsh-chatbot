const httpStatus = require('http-status');
const  ChatSchema  = require('../models/chatSchema.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a chat
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
const createChatSchema = async (chatBody) => {
  if (await ChatSchema.findById(chatBody.id)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'ID already exist');
  }

  await ChatSchema.create({...chatBody})
  return chatBody;
};

/**
 * Query for chats
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const getChat = async (id) => {
  const chats = id ? await ChatSchema.findById(id) : await ChatSchema.find();
  return chats;
};


module.exports = {
  createChatSchema,
  getChat
};
