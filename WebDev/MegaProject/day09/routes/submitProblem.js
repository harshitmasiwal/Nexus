const express = require('express')
const submitProblemRoute = express.Router()
const verifyToken = require('../middleware/verifyToken')
const { submitCode , runCode } = require('../controllers/userSubmission')
const ratelimiter = require('../middleware/ratelimiter')

submitProblemRoute.post('/problem/:id',verifyToken,ratelimiter,submitCode)
submitProblemRoute.post('/problem/run/:id',verifyToken,ratelimiter,runCode)


module.exports = submitProblemRoute