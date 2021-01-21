const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const chatSchemaRoute = require('./chatSchema.route');
const chatRoute = require('./chat.route');


const router = express.Router();

router.use('/auth', authRoute);
router.use('/users', userRoute);
router.use('/chatSchema', chatSchemaRoute);
router.use('/chat', chatRoute);



module.exports = router;
