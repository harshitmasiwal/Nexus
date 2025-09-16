const { GoogleGenAI } = require("@google/genai");
const readlineSync = require("readline-sync");

//function for ai agent
async function getWeather(data){
  const fetchedData = [] //this will be return and it will store the fetched data

  for(let {city , date} of data){
    if(date.toLowerCase() == 'today'){
      // console.log("first function")
      const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=1c930efb35ea46caa93123748252504&q=${city}`)
      const data = await response.json()
      fetchedData.push(data)
    }
    else{
      console.log("second function")
      const response = await fetch(
        `http://api.weatherapi.com/v1/future.json?key=1c930efb35ea46caa93123748252504&q=${city}&dt=${date}`
      )
      const data = await response.json()
      fetchedData.push(data)
    }

    // console.log(fetchedData)
    return fetchedData
  }


}

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDtzRE8gxYLYbe7MVEwa2HDIPM110lr2_s",
});

const conversationHistory = [
  // { role: "model", parts: [{ text: "How may i help you!" }] },
];

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: conversationHistory,
  });
  // conversationHistory.push({ role: "model", parts: [{ text: response.text }] });
  
  return response.text

}

main();

async function agent() {
  //taking the question input
  const question = readlineSync.question("How may i help you! : ");
  //writing the prompt
  const prompt = `You are an AI agent with a function to fetch weather data.  
      Output **must always be JSON** in one of two formats:

      1. If weather info is needed:
      {
        "weather_details_needed": true,
        "location": [
          {"city": "mumbai", "date": "today"},
          {"city": "delhi", "date": "2025-04-30"}
        ]
      }

      Note: Assume today's date is 2025-09-16 (you don’t know the real current date).

      2. If weather info is already provided and sufficient:
      {
        "weather_details_needed": false,
        "weather_report": "Bhai Delhi ka mausam badiya hai, 18 degree temperature hai, ghar pe pakode bana lo, maja aayega khaane mein"
      }

      User asked: ${question}
      if the question is just normal then answer it normally only do this when weather is required

  ⚠️ Strictly return only JSON in above formats, nothing else.`

  //pushing the qustion into history array
  conversationHistory.push({ role: "user", parts: [{ text: prompt }] });

  while(true){
    let jsonCall = await main();  
    // console.log(jsonCall)
    //pushing the jsoncall response from ai into history
    conversationHistory.push({ role: "user", parts: [{ text: jsonCall }] });
    //trimming the unwanted things which given by the ai
    jsonCall = jsonCall.trim();
    jsonCall = jsonCall.replace(/^```json\s*|```$/g, "").trim();
    // console.log(jsonCall)
    //abb json data string format mai hai like "{name : "harshit"}"
    //so isko convert karenge in json object using json.parse
    const data = JSON.parse(jsonCall)
    console.log(data)

    //now we can check 
    if(data.weather_details_needed === false){
      conversationHistory.push({role:"model",parts:[{text : data.weather_report}]})
      console.log(data.weather_report)
      agent()
    }
    else{
      //function call 
      let ans = await getWeather(data.location)
      console.log(ans)
      ans = JSON.stringify(ans)
      // console.log(ans)
      conversationHistory.push({role:"user", parts : [{text : `This is the weather report I Have fetched for you, use this weather report to generate user response, earlier you asked me to fetch weather details for model. ${ans}`}]})
      
    }

  }

}

agent();














// const { GoogleGenAI } = require("@google/genai");
// const readlineSync = require("readline-sync");

// const WEATHER_API_KEY = process.env.WEATHER_API_KEY || "1c930efb35ea46caa93123748252504&q";
// const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || "AIzaSyBR1PrI6svh2ILWopAxJyqgh3WuP1J_8go";

// if (!WEATHER_API_KEY || WEATHER_API_KEY.startsWith("REPLACE")) {
//   console.warn("Warning: WEATHER_API_KEY not set. Set process.env.WEATHER_API_KEY");
// }
// if (!GOOGLE_API_KEY || GOOGLE_API_KEY.startsWith("REPLACE")) {
//   console.warn("Warning: GOOGLE_API_KEY not set. Set process.env.GOOGLE_API_KEY");
// }

// const ai = new GoogleGenAI({ apiKey: GOOGLE_API_KEY });

// const conversationHistory = [
//   { role: "model", parts: [{ text: "How may I help you?" }] },
// ];

// // Helper: call model and push its reply into history
// async function generateModelReply() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: conversationHistory,
//   });

//   // response.text may or may not exist depending on SDK shape.
//   // Try common fallbacks:
//   const text =
//     response?.text ??
//     (response?.candidates && response.candidates[0]?.content?.text) ??
//     JSON.stringify(response);

//   conversationHistory.push({ role: "model", parts: [{ text }] });
//   return text;
// }

// // Fetch weather for array of {city, date}
// async function getWeather(locations = []) {
//   const fetchedData = [];
//   for (const loc of locations) {
//     const city = String(loc.city || "").trim();
//     const dateRaw = loc.date;
//     const dateStr = String(dateRaw || "").trim().toLowerCase();

//     try {
//       const q = encodeURIComponent(city);
//       const url =
//         dateStr === "today"
//           ? `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${q}`
//           : `https://api.weatherapi.com/v1/future.json?key=${WEATHER_API_KEY}&q=${q}&dt=${encodeURIComponent(
//               loc.date
//             )}`;

//       const res = await fetch(url);
//       if (!res.ok) {
//         const text = await res.text().catch(() => "");
//         fetchedData.push({ city, date: loc.date, error: `HTTP ${res.status}: ${res.statusText}`, raw: text });
//         continue;
//       }

//       const json = await res.json();
//       fetchedData.push({ city, date: loc.date, data: json });
//     } catch (err) {
//       fetchedData.push({ city, date: loc.date, error: String(err) });
//     }
//   }
//   return fetchedData;
// }

// // Robustly extract JSON object from model text
// function extractJSON(str) {
//   if (typeof str !== "string") return null;

//   // remove code fences
//   let s = str.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();

//   // quick try
//   try {
//     return JSON.parse(s);
//   } catch (e) {}

//   // fallback: find the first { and matching last } and attempt parse
//   const first = s.indexOf("{");
//   const last = s.lastIndexOf("}");
//   if (first !== -1 && last !== -1 && last > first) {
//     const candidate = s.slice(first, last + 1);
//     try {
//       return JSON.parse(candidate);
//     } catch (e) {}
//   }
//   return null;
// }

// async function agent() {
//   console.log("Type 'exit' or 'quit' to stop.\n");
//   while (true) {
//     const question = readlineSync.question("You: ");
//     if (!question) continue;
//     const qlower = question.trim().toLowerCase();
//     if (qlower === "exit" || qlower === "quit" || qlower === "bye") {
//       console.log("Goodbye 👋");
//       break;
//     }

//     // Build the user prompt that instructs the model to return JSON only
//     const prompt = `You are an AI agent with a function to fetch weather data. Return strictly JSON in ONE of these two formats ONLY:

// 1) If model needs weather data to answer:
// {"weather_details_needed": true, "location": [{"city":"mumbai","date":"today"},{"city":"delhi","date":"2025-04-30"}]}

// 2) If model can directly answer (weather already given / summary):
// {"weather_details_needed": false, "weather_report":"<text in local tone>"}

// Assume today's date is 2025-09-16 (model does not know real current date).
// User asked: ${question}
// Return only JSON in exact schema.`;

//     // push user prompt to history and ask model
//     conversationHistory.push({ role: "user", parts: [{ text: prompt }] });

//     const raw = await generateModelReply();
//     // console.log("\n[model raw]:\n", raw);

//     const parsed = extractJSON(raw);
//     if (!parsed) {
//       console.error("Error: Could not parse JSON from model. Asking model to return valid JSON only.");
//       conversationHistory.push({
//         role: "user",
//         parts: [{ text: "I couldn't parse your JSON output. Please return valid JSON only, using the required schema." }],
//       });
//       continue;
//     }

//     // handle model decision
//     if (parsed.weather_details_needed === false) {
//       console.log("\nModel:", parsed.weather_report);
//       continue;
//     }

//     if (parsed.weather_details_needed === true && Array.isArray(parsed.location)) {
//       console.log("Model requested weather for:", parsed.location);
//       const fetched = await getWeather(parsed.location);
//       // Provide fetched data back to model as a USER message so it can craft the reply
//       conversationHistory.push({
//         role: "user",
//         parts: [{ text: `This is the weather report I have fetched for you: ${JSON.stringify(fetched)}` }],
//       });

//       const finalRaw = await generateModelReply();
//       console.log("\nFinal model reply:\n", finalRaw);
//       continue;
//     }

//     console.log("Unexpected JSON shape from model:", parsed);
//     conversationHistory.push({ role: "user", parts: [{ text: "Please respond with the required JSON schema only." }] });
//   }
// }

// agent().catch((err) => console.error("Unhandled error:", err));
