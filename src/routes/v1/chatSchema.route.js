const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const chatSchemaValidation = require('../../validations/chatSchema.validation');
const chatSchemaController = require('../../controllers/chatSchema.controller');

const router = express.Router();


router.post('/create', validate(chatSchemaValidation.createChatSchema), chatSchemaController.createChatSchema);
router.get('/get', validate(chatSchemaValidation.getChatSchema), chatSchemaController.getChatSchema);

// router
//   .route('/')
//   .post(auth('createChatSchema'), validate(chatSchemaValidation.createChatSchema), chatSchemaController.createChatSchema)
//   .get(auth('getChatSchema'), validate(chatSchemaValidation.getChatSchema), chatSchemaController.getChatSchema);

module.exports = router;
