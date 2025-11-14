const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const aiRouter = express.Router()
const {solveDoubt} = require('../controllers/ai')

aiRouter.post('/ai/chat',verifyToken,solveDoubt)

module.exports = aiRouter