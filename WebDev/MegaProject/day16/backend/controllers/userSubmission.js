const Problem = require("../model/problem")
const Submission = require("../model/submission")
const { sumbitBatch, getErrorMessage, getLanguageById, sumbitToken } = require("../utils/problemUtility")

const submitCode = async (req,res) => {

    try{
        const userId = res.result._id
        const problemId = req.params.id

        const {code , language } = req.body

        if(!userId || !problemId || !code || !language){
            throw new Error("mandatory feilds misssing")
        }

        const languageId = getLanguageById(language);


        const problem = await Problem.findById(problemId)


        if(!problem){
            throw new Error("no problem found for requested id")
        }


        const userSubmission = await Submission.create({
            userId,
            problemId,
            code,
            language,
            testCasesPassed : 0 ,
            status : 'pending',
            testCaseTotal : problem.hiddenTestCases.length
        })
        // console.log(problem.hiddenTestCases)
        
        const submission = []

        // console.log(problem.hiddenTestCases)

        for(let {input,output} of problem.hiddenTestCases){
            const obj = {
                source_code : code ,
                language_id : languageId,
                stdin : input,
                expected_output : output 
            }
            submission.push(obj)
        }



        // console.log(submission)

        const result = await sumbitBatch(submission)

        // console.log(result)

        const isResultOkay = Array.isArray(result);
        if (!isResultOkay) {
            throw new Error("something went wrong " + result);
        }

        const resultTokens = result.map(value => value.token);

        const testResult = await sumbitToken(resultTokens)

        // console.log(testResult)

        let testCasesPassed = 0
        let runtime = 0 
        let memory = 0 
        let status = "accepted"
        let errorMessage = null

        for (const test of testResult) {

            if(test.status_id == 3 ){
                testCasesPassed++;
                runtime += parseFloat(test.time);
                memory += Math.max(memory,test.memory)
            }
            else{
                if(test.status_id == 4 ){
                    status = "error"
                    errorMessage = test.stderr
                }
                else{
                    status = "wrong"
                    errorMessage = test.status.description
                }
            }
        }

        //putting the values in the submission 
        userSubmission.testCasesPassed = testCasesPassed
        userSubmission.memory = memory
        userSubmission.runtime = runtime
        userSubmission.status = status
        userSubmission.errorMessage = errorMessage

        await userSubmission.save()

        res.status(201).send("submission done sucessfully " + userSubmission.status)

        if(!res.result.problemSolved.includes(problemId)){
            res.result.problemSolved.push(problemId);
            await res.result.save();
        }


    }
    catch(err){
        res.status(400).send("server error : " + err.messagge)
    }

}


const runCode = async (req,res) => {
    try{
        const userId = res.result._id
        const problemId = req.params.id

        const {code , language } = req.body

        if(!userId || !problemId || !code || !language){
            throw new Error("mandatory feilds misssing")
        }

        const languageId = getLanguageById(language);


        const problem = await Problem.findById(problemId)


        if(!problem){
            throw new Error("no problem found for requested id")
        }
        
        const submission = []


        for(let {input,output} of problem.visibleTestCases){
            const obj = {
                source_code : code ,
                language_id : languageId,
                stdin : input,
                expected_output : output 
            }
            submission.push(obj)
        }



        // console.log(submission)

        const result = await sumbitBatch(submission)

        // console.log(result)

        const isResultOkay = Array.isArray(result);
        if (!isResultOkay) {
            throw new Error("something went wrong " + result);
        }

        const resultTokens = result.map(value => value.token);

        const testResult = await sumbitToken(resultTokens)

        res.status(201).send(testResult)

    }
    catch(err){
        res.send("internal server error : "+ err.messagge)
    }
}

module.exports = {
    submitCode ,
    runCode
}

