const httpStatus = require('http-status');
const  Chat  = require('../models/chat.model');
const ChatSchemaService = require('../services/chatSchema.service')
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

const getChatByClient = async (client_id) => {
    console.log(client_id)
    const chats = client_id ? await Chat.find({client_id : client_id}).populate('bot').exec() : await Chat.find().populate('bot').exec()   
    
    var chat = chats,
    result = chats.reduce(function (r, a) {
        r[a.user_id] = r[a.user_id] || [];
        r[a.user_id].push(a);
        return r;
    }, Object.create(null));
    
    return result;

};

const getChats = async (id) => {
  const chats = await Chat.find({user_id : id}).sort({'createdAt' : 1}).populate('bot' , {content : 1, user_response : 1 });
  if(chats && chats.length && chats[chats.length -1].user_response.id){
    chats.push(await ChatSchemaService.getChat(chats[chats.length -1].user_response.id));
  }
  return chats;
};


module.exports = {
  createChat,
  getChat,
  getChats,
  getChatByClient
};
