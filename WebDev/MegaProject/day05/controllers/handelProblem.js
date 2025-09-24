const Problem = require("../model/problem");
const {
  getLanguageById,
  sumbitBatch,
  sumbitToken,
  getErrorMessage,
} = require("../utils/problemUtility");

const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    visibleTestCases,
    hiddenTestCases,
    boilerCode,
    refrenceSolution,
    problemCreator,
  } = req.body;

  try {
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
          output: output,
        };
        submissions.push(obj);
      }

      // console.log(submissions)

      const result = await sumbitBatch(submissions);

      // console.log(result)

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

module.exports = {
  createProblem,
};
