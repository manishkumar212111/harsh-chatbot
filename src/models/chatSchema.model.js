const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const chatSchema = mongoose.Schema(
  {
    _id: {
        type : String,
        unique : true,
        required : true
    },
    content: {
      type: Array,
      required: true,
      trim: true,
    },
    response: {
      type: Array
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
chatSchema.plugin(toJSON);
chatSchema.plugin(paginate);

const ChatSchema = mongoose.model('ChatSchema', chatSchema);

module.exports = ChatSchema;
