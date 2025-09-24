const express = require('express')
const problemRouter = express.Router()
const verifyAdminToken = require('../middleware/verifyAdminToken')
const { createProblem } = require('../controllers/handelProblem')

//requires admin acess
problemRouter.post('/create',verifyAdminToken,createProblem)
// problemRouter.patch('/:id',verifyAdminToken,problemUpdate)
// problemRouter.delete('/:id',verifyAdminToken,problemDelete)


//acessable to both user and admin 
// problemRouter.get('/:id',getProblem)
// problemRouter.get('/',getAllProblem)
// problemRouter.get('/user',problemSolved)

module.exports = problemRouter