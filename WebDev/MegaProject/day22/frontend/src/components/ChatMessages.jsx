

import React from "react";
import { motion } from "framer-motion";
import { Bot, User, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// Variant for the "AI is thinking..." dots
const dotVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const ChatMessages = ({ messages, messagesEndRef, isThinking }) => {
  // Copy code to clipboard
  const handleCopy = (code) => navigator.clipboard.writeText(code);

  return (
    <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: msg.sender === 'user' ? 10 : -10 }} // Subtle direction-based entry
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 0.5, delay: i * 0.05 }}
          className={`flex items-start gap-2 ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {/* Avatar */}
          {msg.sender === "ai" && (
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center border-2 border-blue-400">
              <Bot className="w-4 h-4 text-white" />
            </div>
          )}

          {/* Message bubble */}
          <div
            className={`relative p-3 px-4 max-w-[75%] rounded-2xl shadow-lg transition-all transform hover:scale-[1.01] ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                : "bg-gradient-to-r from-zinc-800 to-zinc-700 text-zinc-100 rounded-bl-none"
            }`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>

            {/* Code block */}
            {msg.code && msg.code.trim() !== "" && (
              <div className="relative mt-3 border border-zinc-600 rounded-lg overflow-hidden group">
                <button
                  onClick={() => handleCopy(msg.code)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800/80 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 z-10"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
                <SyntaxHighlighter
                  language={msg.language || "text"}
                  style={oneDark}
                  customStyle={{
                    backgroundColor: "transparent",
                    fontSize: "0.85rem",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                    margin: 0,
                  }}
                >
                  {msg.code}
                </SyntaxHighlighter>
              </div>
            )}

            <span className={`text-[10px] absolute bottom-1 ${msg.sender === 'user' ? 'left-3' : 'right-3'} opacity-60 text-zinc-300`}>
              {msg.time}
            </span>
          </div>

          {/* User Avatar */}
          {msg.sender === "user" && (
            <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-600 flex items-center justify-center border-2 border-blue-500">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </motion.div>
      ))}

      {/* AI Thinking Bubble with Dot Animation */}
      {isThinking && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-end gap-2 justify-start"
        >
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-blue-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="relative p-3 px-4 rounded-2xl shadow-md bg-zinc-800 text-zinc-100 rounded-bl-none">
            <div className="flex space-x-1 items-center">
                <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                    }}
                />
                <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.1,
                    }}
                />
                <motion.span
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    variants={dotVariants}
                    initial="start"
                    animate="end"
                    transition={{
                        duration: 0.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.2,
                    }}
                />
            </div>
          </div>
        </motion.div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
