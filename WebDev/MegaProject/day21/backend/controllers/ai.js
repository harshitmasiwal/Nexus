
// const { GoogleGenAI } = require("@google/genai");

// /**
//  * Extract the first JSON object found in a text string.
//  * Returns null if no valid JSON object can be parsed.
//  */
// function extractJsonObjectFromString(str) {
//   if (!str || typeof str !== "string") return null;

//   // Remove surrounding ```json or ``` fences if present
//   const cleaned = str.replace(/```(?:json)?/g, "").trim();

//   // Try to find the first {...} block (greedy minimal match)
//   const match = cleaned.match(/\{[\s\S]*\}/);
//   if (!match) {
//     // As a last resort, try to parse whole cleaned string
//     try {
//       return JSON.parse(cleaned);
//     } catch {
//       return null;
//     }
//   }

//   const jsonText = match[0];

//   try {
//     return JSON.parse(jsonText);
//   } catch (err) {
//     // Try more permissive cleanup: remove trailing commas, etc. (light attempt)
//     const sanitized = jsonText
//       .replace(/,\s*}/g, "}")
//       .replace(/,\s*]/g, "]");
//     try {
//       return JSON.parse(sanitized);
//     } catch (err2) {
//       return null;
//     }
//   }
// }

// const solveDoubt = async (req, res) => {
//   try {
//     const ai = new GoogleGenAI({
//       apiKey: process.env.GEMINI_API_KEY,
//     });

//     const { userMessage, problemTitle } = req.body || {};

//     // Build the payload for Gemini
//     const payload = {
//       model: "gemini-2.5-flash",
//       contents: [
//         {
//           role: "user",
//           parts: [
//             {
//               text: `Problem: ${problemTitle || "General Problem"}\nUser Query: ${userMessage || ""}`,
//             },
//           ],
//         },
//       ],
//       // Some SDKs use 'config' and some 'generationConfig' or 'systemInstruction' path differs.
//       // Put the system instruction in the appropriate field used by your SDK version:
//       config: {
//         systemInstruction: `You are an advanced AI coding assistant integrated into a LeetCode-like platform.
// Your goal is to guide users like a mentor: explain your thinking, provide hints, and encourage problem-solving.
// Always respond in **valid JSON** with the following structure:

// {
//   "response": "<your textual explanation, hint, or normal conversation>",
//   "language": "<programming language if code is included, otherwise empty string>",
//   "code": "<code snippet if relevant, otherwise empty string>"
// }

// Guidelines:
// 1. Always start by giving **thoughts, hints, and step-by-step guidance** in "response".
// 2. Only provide a full "code" solution if:
//    - The user explicitly asks for it, or
//    - It's necessary to illustrate a hint or explanation.
// 3. If the user is talking normally (not asking a coding question):
//    - Put your reply in "response".
//    - Keep "language" and "code" empty.
// 4. Never include text outside the JSON structure. Do not add markdown, commentary, or explanations outside of the JSON.
// `
//       },
//     };

//     // Call the SDK
//     const response = await ai.models.generateContent(payload);

    

//     // Try multiple ways to extract a usable text string from the SDK response:
//     let possibleText = null;

//     // 1) Some SDKs have response.output or response.results
//     if (typeof response === "string") {
//       possibleText = response;
//     } else if (response?.text && typeof response.text === "string") {
//       possibleText = response.text;
//     } else if (response?.response && typeof response.response === "string") {
//       possibleText = response.response;
//     } else if (response?.outputText && typeof response.outputText === "string") {
//       possibleText = response.outputText;
//     } else if (Array.isArray(response?.responses) && response.responses[0]) {
//       // Example shape: { responses: [ { text: "..." } ] }
//       const r0 = response.responses[0];
//       if (typeof r0 === "string") possibleText = r0;
//       else if (typeof r0?.text === "string") possibleText = r0.text;
//       else if (Array.isArray(r0?.content)) {
//         // content => [{ type: "output_text", text: "..." }]
//         const t = r0.content.find((c) => typeof c?.text === "string");
//         if (t) possibleText = t.text;
//       }
//     } else if (Array.isArray(response?.candidates) && response.candidates[0]) {
//       const cand = response.candidates[0];
//       if (typeof cand === "string") possibleText = cand;
//       else if (typeof cand?.content === "string") possibleText = cand.content;
//       else if (Array.isArray(cand?.content)) {
//         const t = cand.content.find((c) => typeof c?.text === "string");
//         if (t) possibleText = t.text;
//       }
//     }

//     // If still nothing, try to stringify the object and search inside:
//     if (!possibleText) {
//       const serialized = JSON.stringify(response);
//       // Try to capture JSON inside the serialized response
//       const extracted = extractJsonObjectFromString(serialized);
//       if (extracted) {
//         // Already got JSON object
//         return res.json(extracted);
//       }
//       // fallback: take entire serialized as text
//       possibleText = serialized;
//     }

//     // Now try to parse JSON object from the text
//     let data = extractJsonObjectFromString(possibleText);

//     if (!data) {
//       // If no JSON object could be parsed, return a safe fallback object
//       // and include the raw text in the "response" field so front-end can show a helpful message.
//       data = {
//         response: possibleText.slice(0, 10000) || "No textual response from AI.",
//         language: "",
//         code: "",
//       };
//     }

//     // Ensure the object has required keys
//     data.response = data.response ?? "";
//     data.language = data.language ?? "";
//     data.code = data.code ?? "";

//     return res.json(data);
//   } catch (err) {
//     // console.error("AI Error:", err);
//     return res.status(500).json({
//       response: "Sorry, something went wrong while contacting the AI.",
//       language: "",
//       code: "",
//     });
//   }
// };

// module.exports = { solveDoubt };


const { GoogleGenAI } = require("@google/genai");

// --- NOTE: The 'extractJsonObjectFromString' function can now be mostly removed or simplified, 
//           as we will use Gemini's structured output feature (responseSchema) ---

const solveDoubt = async (req, res) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // 1. Destructure all necessary data, including the problem object
    const { userMessage, problem } = req.body || {};

    // 2. Format problem details for the prompt
    // This creates a detailed, structured context for the AI
    const problemDetails = problem ? `
      Problem Title: ${problem.title || "N/A"}
      Difficulty: ${problem.difficulty || "N/A"}
      Tags: ${problem.tags || "N/A"}
      Description: ${problem.description || "N/A"}

      Visible Test Cases:
      ${(problem.visibleTestCases || []).map(tc => `- Input: ${tc.input}, Output: ${tc.output}`).join('\n')}

      Boilerplate Code (Example - C++):
      ${(problem.boilerCode || []).find(c => c.language === "C++")?.code || "N/A"}
    ` : "Problem context not available. Treat this as a general coding query.";
    
    // 3. Define the JSON response structure for guaranteed output
    const responseSchema = {
      type: "object",
      properties: {
        response: {
          type: "string",
          description: "Your textual explanation, hint, or normal conversation. This is the main body of your reply.",
        },
        language: {
          type: "string",
          description: "Programming language if code is included (e.g., 'javascript', 'cpp', 'python'), otherwise an empty string.",
        },
        code: {
          type: "string",
          description: "The code snippet if relevant, otherwise an empty string. The code must be clean and not wrapped in markdown fences.",
        },
      },
      required: ["response", "language", "code"],
    };

    // 4. Build the payload for Gemini
    const payload = {
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Here is the coding problem context and the user's query. Provide a helpful, mentor-like response following the JSON format.

              --- PROBLEM CONTEXT ---
              ${problemDetails}
              --- USER QUERY ---
              ${userMessage || ""}`,
            },
          ],
        },
      ],
      config: {
        // Use responseSchema for guaranteed JSON output
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        systemInstruction: `You are an advanced AI coding assistant integrated into a LeetCode-like platform.
          Your goal is to guide users like a mentor: explain your thinking, provide hints, and encourage problem-solving.
          Always respond in **valid JSON** that strictly adheres to the provided schema.

          Guidelines:
          1. Always start by giving **thoughts, hints, and step-by-step guidance** in the "response" field.
          2. Only provide a full "code" solution if the user explicitly asks for it or it is necessary to illustrate a complex hint.
          3. If the user is talking normally (not asking a coding question), keep "language" and "code" empty.
          4. The JSON must be the ONLY output. Do not include markdown fences (like \`\`\`json) or any text outside the JSON object.
        `,
      },
    };

    // 5. Call the SDK
    const geminiResponse = await ai.models.generateContent(payload);

    // 6. Extract the JSON from the generated text
    // Since we requested structured JSON, the response text *should* be the JSON string.
    let jsonText = geminiResponse.text.trim();
    
    // Optional cleanup for robustness (removing common markdown fences if any slipped through)
    jsonText = jsonText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    
    let data;
    try {
      data = JSON.parse(jsonText);
    } catch (e) {
      // Fallback for unexpected non-JSON output
      console.error("Failed to parse JSON response:", e, "\nRaw text:", jsonText);
      data = {
        response: `⚠️ I had trouble processing the request, but here is the raw AI output: ${jsonText.slice(0, 500)}`,
        language: "",
        code: "",
      };
    }

    // 7. Ensure data integrity before sending
    const finalResponse = {
      response: data.response ?? "No textual response from AI.",
      language: data.language ?? "",
      code: data.code ?? "",
    };

    return res.json(finalResponse);

  } catch (err) {
    console.error("AI API Error:", err);
    return res.status(500).json({
      response: "Sorry, something went wrong while contacting the AI.",
      language: "",
      code: "",
    });
  }
};

module.exports = { solveDoubt };