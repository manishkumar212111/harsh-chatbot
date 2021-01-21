const httpStatus = require('http-status');
const  Chat  = require('../models/chat.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a chat
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
const createChat = async (chatBody) => {
  await Chat.create({...chatBody})
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
  const chats = await Chat.findById(id);
  return chats;
};


module.exports = {
  createChat,
  getChat
};
