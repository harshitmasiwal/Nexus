const Problem = require("../model/problem");
const Submission = require("../model/submission");
const User = require("../model/user");

const {
  getLanguageById,
  sumbitBatch,
  sumbitToken,
  getErrorMessage,
} = require("../utils/problemUtility");

const createProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      difficulty,
      tags,
      visibleTestCases,
      hiddenTestCases,
      boilerCode,
      refrenceSolution,
    } = req.body;

    for (const { language, completeCode } of refrenceSolution) {
      //find lang id
      const languageId = getLanguageById(language);

      // console.log(languageId)

      //now make the sumbission array which will contain the object of langauge_id, source_code, input,output

      const submissions = []; //batch of all the cases
      for (const { input, output } of visibleTestCases) {
        const obj = {
          source_code: completeCode,
          language_id: languageId,
          stdin: input,
          output: output.trim(),
        };
        submissions.push(obj);
      }

      // console.log(submissions)

      const result = await sumbitBatch(submissions);
      // console.log(result)

      const isResultOkay = Array.isArray(result);
      if (!isResultOkay) {
        throw new Error("something went wrong " + result);
      } 

      const resultTokens = result.map((value) => value.token);

      // console.log(resultTokens)

      const testResult = await sumbitToken(resultTokens);

      // console.log(testResult)

      for (const result of testResult) {
        if (result.status_id != 3) {
          const msg = getErrorMessage(result.status_id);
          return res.send("error : " + msg);
        }
      }
    }

    //if all the checks passed then we can create the problem
    await Problem.create({
      ...req.body,
      problemCreator: res.result._id,
    });

    res.status(200).send("problem saved sucessfully");
  } catch (err) {
    res.send("error : " + err.message);
  }
};

const updateProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.findById(id);
    if (!problem) {
      throw new Error("no problem found");
    }
    const data = req.body;

    const update = [];
    for (const key in data) {
      update.push(key);
    }

    const isVerficationNeeded = update.includes("refrenceSolution");

    if (isVerficationNeeded) {
      // console.log("judege0 runs")
      for (const { language, completeCode } of data.refrenceSolution) {
        const languageId = getLanguageById(language);

        const submissions = []; //batch of all the cases
        for (const { input, output } of data.visibleTestCases) {
          const obj = {
            source_code: completeCode,
            language_id: languageId,
            stdin: input,
            output: output,
          };
          submissions.push(obj);
        }

        const result = await sumbitBatch(submissions);
        // console.log(result)
        const isResultOkay = Array.isArray(result);
        if (!isResultOkay) {
          throw new Error("something went wrong " + result);
        }

        const resultTokens = result.map((value) => value.token);

        const testResult = await sumbitToken(resultTokens);

        for (const result of testResult) {
          if (result.status_id != 3) {
            const msg = getErrorMessage(result.status_id);
            return res.send("error : " + msg);
          }
        }
      }
    }

    const updatedProblem = await Problem.findByIdAndUpdate(
      id,
      { ...data },
      { runValidators: true, new: true }
    );

    res.status(201).send("problem updated sucessfully : \n" + updatedProblem);
  } catch (err) {
    res.send("error : " + err.message);
  }
};

const deleteProblem = async (req, res) => {
  try {
    const id = req.params.id;
    const problem = await Problem.findById(id);

    if (!problem) {
      throw new Error("no problem for this ID");
    }

    await Problem.findByIdAndDelete(id);
    res.status(201).send("problem deleted sucessfully");
  } catch (err) {
    res.send("error : " + err.message);
  }
};

const getProblemById = async (req, res) => {
  try {
    const id = req.params.id;
    // const problem = await Problem.findById(id).select(['_id','title','description','tags','visibleTestCases','boilerCode','updatedAt']);
    const problem = await Problem.findById(id)
    if (!problem) {
      throw new Error("wrong problem id");
    }

    res.status(200).json(problem);
  } catch (err) {
    res.send("error : " + err.message);
  }
};

const getAllProblems = async (req, res) => {
  try {
    const page = Number(req.params.page) || 1;
    const limit = Number(req.params.limit) || 10;

    //calculate skip
    const skip = (page - 1) * limit;

    // const totalProblems = await Problem.countDocuments();
    const file = await Problem.find({}).skip(skip).limit(limit).select(['_id' ,'title' , 'difficulty' ,'tags']);

    if (file.length === 0) {
      return res.status(200).send("No problems in the DB");
    }
    res.status(200).json(file);
  } catch (err) {
    res.send("error : " + err.message);
  }
};

const getAllProblemSolvedByUser = async (req,res) => {
  try{

    const user = await User.findById(res.result._id).populate({
      path : 'problemSolved',
      select : '_id title description difficulty tags'
    })

    const count = res.result.problemSolved.length

    res.json({user ,"length" : count})

  }
  catch(err){
    res.status(400).send('internal server error ' + err.message)
  }
}

const submittedSolutions = async (req,res) => {

  try{

    const problem_id = req.params.pid
    const user_id = res.result._id

    const ans = await Submission.find({userId : user_id , problemId : problem_id} )

    if(ans.length === 0 ){
      return res.status(200).send("no submissions for this problem")
    }

    res.status(200).send(ans)

  }
  catch(err){
    res.status(400).send('internal server error : ' + err.message)
  }


}

module.exports = {
  createProblem,
  updateProblem,
  deleteProblem,
  getProblemById,
  getAllProblems,
  getAllProblemSolvedByUser,
  submittedSolutions
};
