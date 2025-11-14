

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