const express = require('express')
const submitProblemRoute = express.Router()
const verifyToken = require('../middleware/verifyToken')
const { submitCode , runCode } = require('../controllers/userSubmission')

submitProblemRoute.post('/problem/:id',verifyToken,submitCode)
submitProblemRoute.post('/problem/run/:id',verifyToken,runCode)


module.exports = submitProblemRoute