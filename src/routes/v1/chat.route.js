const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const chatValidation = require('../../validations/chat.validation');
const chatController = require('../../controllers/chat.controller');

const router = express.Router();


router.post('/create', validate(chatValidation.createChat), chatController.createChat);
// router.post('/get', validate(chatValidation.getChat), chatController.getChat);

// router
//   .route('/')
//   .post(auth('createChat'), validate(chatValidation.createChat), chatController.createChat)
//   .get(auth('getChat'), validate(chatValidation.getChat), chatController.getChat);

module.exports = router;
