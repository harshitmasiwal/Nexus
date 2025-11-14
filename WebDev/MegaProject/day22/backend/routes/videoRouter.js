const express = require('express')
const videoRouter = express.Router()
const verifyAdminToken = require('../middleware/verifyAdminToken')
const verifyToken = require('../middleware/verifyToken')
const {signature, saveVideoToBackend, getEditorialByProblemId} = require('../controllers/videoConfig')

videoRouter.get('/upload/signature',verifyAdminToken,signature)
videoRouter.post('/upload/toBackend',verifyAdminToken,saveVideoToBackend)
videoRouter.get('/editorial/:editorialID',verifyToken,getEditorialByProblemId)

module.exports = videoRouter