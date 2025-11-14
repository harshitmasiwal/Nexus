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

        console.log(testResult)

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
                    errorMessage = test.stderr || "Runtime Error"
                }
                else{
                    status = "wrong"
                    errorMessage = test.status?.description || "Wrong Answer"
                }
            }
        }

        //putting the values in the submission 
        userSubmission.testCasesPassed = testCasesPassed
        userSubmission.memory = memory
        userSubmission.runtime = runtime
        userSubmission.status = status
        userSubmission.errorMessage = errorMessage

        // Create detailed test case results for submission
        const testCaseResults = testResult.map((test, index) => ({
            testCaseIndex: index + 1,
            status_id: test.status_id,
            stdin: problem.hiddenTestCases[index]?.input || '',
            expected_output: problem.hiddenTestCases[index]?.output || '',
            stdout: test.stdout || '',
            stderr: test.stderr || '',
            time: test.time || 0,
            memory: test.memory || 0,
            status: test.status_id === 3 ? 'passed' : 'failed'
        }));

        const reply = {
            testCasesPassed,
            testCaseTotal: problem.hiddenTestCases.length,
            memory,
            runtime,
            status,
            errorMessage,
            testCases: testCaseResults
        }

        await userSubmission.save()

        // Only add to solved problems if the submission was accepted
        if(status === 'accepted' && !res.result.problemSolved.includes(problemId)){
            res.result.problemSolved.push(problemId);
            await res.result.save();
        }

        res.status(201).json(reply)


    }
    catch(err){
        res.status(200).send("server error : " + err.message)
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

        // Check if there are visible test cases
        if(!problem.visibleTestCases || problem.visibleTestCases.length === 0){
            return res.status(400).json({
                status: 'error',
                errorMessage: 'No visible test cases available for this problem',
                testCasesPassed: 0,
                testCaseTotal: 0,
                memory: 0,
                runtime: 0
            });
        }

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
            return res.status(500).json({
                status: 'error',
                errorMessage: 'Judge0 API error: ' + result,
                testCasesPassed: 0,
                testCaseTotal: problem.visibleTestCases.length,
                memory: 0,
                runtime: 0
            });
        }

        const resultTokens = result.map(value => value.token);

        const testResult = await sumbitToken(resultTokens)

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
                    errorMessage = test.stderr || "Runtime Error"
                }
                else{
                    status = "wrong"
                    errorMessage = test.status?.description || "Wrong Answer"
                }
            }
        }

        // Only mark as accepted if all test cases passed
        if(testCasesPassed !== problem.visibleTestCases.length){
            status = "wrong"
        }

        console.log(testCasesPassed,memory,runtime,status,errorMessage)

        // Create detailed test case results
        const testCaseResults = testResult.map((test, index) => ({
            testCaseIndex: index + 1,
            status_id: test.status_id,
            stdin: problem.visibleTestCases[index]?.input || '',
            expected_output: problem.visibleTestCases[index]?.output || '',
            stdout: test.stdout || '',
            stderr: test.stderr || '',
            time: test.time || 0,
            memory: test.memory || 0,
            status: test.status_id === 3 ? 'passed' : 'failed'
        }));

        const reply = {
            testCasesPassed,
            testCaseTotal: problem.visibleTestCases.length,
            memory,
            runtime,
            status,
            errorMessage,
            testCases: testCaseResults
        }


        res.status(201).json(reply)

    }
    catch(err){
        res.status(400).send("internal server error : "+ err.message)
    }
}

module.exports = {
    submitCode ,
    runCode
}

