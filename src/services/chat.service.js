const httpStatus = require('http-status');
const { options } = require('joi');
const  Chat  = require('../models/chat.model');
// const ChatSchemaService = require('../services/chatSchema.service')
const ChatSchemaService = require('../services/chatSchema.service')
const ApiError = require('../utils/ApiError');

/**
 * Create a chat
 * @param {Object} chatBody
 * @returns {Promise<Chat>}
 */
const createChat = async (chatBody) => {
  
  let findChat = await Chat.find({ user_id : chatBody.user_id });
  if(findChat && findChat.length){
    let response = findChat[0].response;
    response.push({
      "bot" : await ChatSchemaService.getChat(chatBody.bot),
      "user_response" : chatBody.user_response,
      "createdAt" : new Date().toISOString()
    })
    return await Chat.update( { user_id : chatBody.user_id} , { $set : { response : response } })

  } else {
    let chatObj = {
      user_id : chatBody.user_id,
      client_id : chatBody.client_id,
      response : [
        {
          "bot" : await ChatSchemaService.getChat(chatBody.bot),
          "user_response" : chatBody.user_response,
          "createdAt" : new Date().toISOString()
        }
      ]
    }
    return await Chat.create({...chatObj})

  }
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

const getChatByClient = async (client_id , filters) => {
    let filter = {
      client_id : client_id
    };

    let paginationOptions = {
      page : filters.page ? filters.page : 1,
      limit : filters.limit ? filters.limit : 10
    }
    return await Chat.paginate(filter, paginationOptions , async (option) => {
      return await Chat.find(option.filter).
      sort({createdAt : -1}).skip(option.skip).limit(option.limit).exec()
    });    

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
