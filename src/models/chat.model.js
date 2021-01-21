const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chat = mongoose.Schema(
  {
    bot: {
      type: String,
      ref: 'ChatSchema',
      required: true,
    },
    response: {
      type: String,
      required : true
    },
    user_id : {
      type : String,
      required : true
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
