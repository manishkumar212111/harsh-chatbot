const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chat = mongoose.Schema(
  {
    user_id : {
      type : String,
      required : true
    },
    client_id : {
      type : String,
      required : true
    },
    response : {
      type : Array,
      default : []
    }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chat.plugin(toJSON);
chat.plugin(paginate);

const Chat = mongoose.model('Chat', chat);

module.exports = Chat;
