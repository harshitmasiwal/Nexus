const axios = require("axios");

const getLanguageById = (language) => {
  const lang = {
    "c++": 54,
    java: 62,
    javascript: 63,
  };

  return lang[language.toLowerCase()];
};

const sumbitBatch = async (submissions) => {
  const options = {
    method: "POST",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      base64_encoded: "false",
    },
    headers: {
      "x-rapidapi-key": "72490c65d5msh3cf47f735103304p14e356jsn4e5b96e5e8a1",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      submissions: submissions,
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return "error : " + error.message;
    }
  }

  return await fetchData();
};

const sumbitToken = async (resultTokens) => {
  const options = {
    method: "GET",
    url: "https://judge0-ce.p.rapidapi.com/submissions/batch",
    params: {
      tokens: resultTokens.join(","),
      base64_encoded: "true",
      fields: "*",
    },
    headers: {
      "x-rapidapi-key": "72490c65d5msh3cf47f735103304p14e356jsn4e5b96e5e8a1",
      "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
    },
  };

  async function fetchData() {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return "error :" + error.message;
    }
  }

  const waiting = async (timer) => {
    setTimeout(() => {
      return 1;
    }, timer);
  };

  while (true) {
    const result = await fetchData();
    const isResultObtained = result.submissions.every(
      (value) => value.status_id > 2
    );

    if (isResultObtained) {
      return result.submissions;
    }

    //if not then wait for 1 sec and then request
    await waiting(2000);
  }
};

const getErrorMessage = (status_id) => {
  const errorMessages = {
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error",
  };

  return errorMessages[status_id];
};

module.exports = {
  getLanguageById,
  sumbitBatch,
  sumbitToken,
  getErrorMessage,
};
