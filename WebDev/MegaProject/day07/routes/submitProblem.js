const express = require('express')
const submitProblemRoute = express.Router()
const verifyToken = require('../middleware/verifyToken')
const { submitCode } = require('../controllers/userSubmission')

submitProblemRoute.post('/problem/:id',verifyToken,submitCode)


module.exports = submitProblemRoute