const express = require('express')
const problemRouter = express.Router()
const verifyAdminToken = require('../middleware/verifyAdminToken')
const { createProblem , updateProblem , deleteProblem , getProblemById , getAllProblems , getAllProblemSolvedByUser , submittedSolutions} = require('../controllers/handelProblem')
const verifyToken = require('../middleware/verifyToken')

//requires admin acess
problemRouter.post('/create',verifyAdminToken,createProblem)
problemRouter.patch('/update/:id',verifyAdminToken,updateProblem)
problemRouter.delete('/delete/:id',verifyAdminToken,deleteProblem)


//acessable to both user and admin 
problemRouter.get('/id/:id',getProblemById)
problemRouter.get('/all/page=:page/limit=:limit',getAllProblems)
problemRouter.get('/user',verifyToken,getAllProblemSolvedByUser)
problemRouter.get('/submission/:pid',verifyToken,submittedSolutions)

module.exports = problemRouter