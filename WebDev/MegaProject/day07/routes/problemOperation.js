const express = require('express')
const problemRouter = express.Router()
const verifyAdminToken = require('../middleware/verifyAdminToken')
const { createProblem , updateProblem , deleteProblem , getProblemById , getAllProblems} = require('../controllers/handelProblem')

//requires admin acess
problemRouter.post('/create',verifyAdminToken,createProblem)
problemRouter.patch('/update/:id',verifyAdminToken,updateProblem)
problemRouter.delete('/delete/:id',verifyAdminToken,deleteProblem)


//acessable to both user and admin 
problemRouter.get('/id/:id',getProblemById)
problemRouter.get('/all/page=:page/limit=:limit',getAllProblems)
// problemRouter.get('/user',getAllProblemSolvedByUser)

module.exports = problemRouter