const express = require('express')
const submitProblemRoute = express.Router()
const verifyToken = require('../middleware/verifyToken')
const { submitCode , runCode, getUserSubmissions } = require('../controllers/userSubmission')
const ratelimiter = require('../middleware/ratelimiter')

submitProblemRoute.post('/problem/:id',verifyToken,ratelimiter,submitCode)
submitProblemRoute.post('/problem/run/:id',verifyToken,ratelimiter,runCode)
submitProblemRoute.get('/problem/:id/submissions',verifyToken,getUserSubmissions)


module.exports = submitProblemRoute