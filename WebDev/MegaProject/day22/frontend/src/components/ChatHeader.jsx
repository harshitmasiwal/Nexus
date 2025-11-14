
import React from "react";
import { X, Bot } from "lucide-react";
import { motion } from "framer-motion"; // Import motion

const ChatHeader = ({ setIsOpen, resizeRef }) => (
  <div
    className="flex justify-between items-center p-4 border-b border-zinc-700 cursor-grab active:cursor-grabbing bg-zinc-800/90"
    ref={resizeRef}
  >
    <h3 className="text-white font-semibold text-base flex items-center gap-2">
      <motion.div
        animate={{ scale: [1, 1.05, 1] }} // Simple pulse animation
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Bot className="w-5 h-5 text-blue-400" />
      </motion.div>
      AI Coding Assistant
    </h3>
    <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-all p-1 rounded-full hover:bg-zinc-700">
      <X className="w-5 h-5" />
    </button>
  </div>
);

export default ChatHeader;