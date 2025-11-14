

import React from "react";
import { Send } from "lucide-react";

const ChatInput = ({ input, setInput, sendMessage, isLoading }) => (
  <div className="p-3 border-t border-zinc-700 bg-zinc-800/90 flex items-center gap-2">
    <input
      type="text"
      placeholder="Ask your question..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      disabled={isLoading}
      className="flex-1 bg-zinc-700/60 text-white rounded-xl p-2 px-4 outline-none text-sm focus:ring-2 focus:ring-blue-500/40 transition-all placeholder:text-zinc-400 disabled:opacity-70"
    />
    <button
      onClick={sendMessage}
      disabled={isLoading || !input.trim()}
      className={`${
        isLoading || !input.trim()
          ? "bg-blue-400 cursor-not-allowed opacity-70"
          : "bg-blue-600 hover:bg-blue-700"
      } text-white px-4 py-2 rounded-xl text-sm shadow-md shadow-blue-500/20 transition-all flex items-center justify-center w-24 h-10 font-semibold`}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          Send <Send className="w-4 h-4 ml-1" />
        </>
      )}
    </button>
  </div>
);

export default ChatInput;