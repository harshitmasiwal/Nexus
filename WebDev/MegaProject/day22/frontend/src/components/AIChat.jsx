import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Zap } from "lucide-react"; // Zap is imported for the pulse effect
import axiosConfig from "../utils/axiosConfig";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ResizeHandle from "./ResizeHandle";

const AIChat = ({ problem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: `Hi 👋! I’m your AI assistant for "${
        problem?.title || "this problem"
      }". How can I help you today?`,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef(null);
  const messagesEndRef = useRef(null); // Auto-scroll

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Resize logic

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      setSize((prev) => ({
        width: Math.max(
          400,
          e.clientX - resizeRef.current.getBoundingClientRect().left
        ),
        height: Math.max(
          380,
          e.clientY - resizeRef.current.getBoundingClientRect().top
        ),
      }));
    };
    const handleMouseUp = () => setIsResizing(false);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]); // Handle message send

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axiosConfig.post("/ask/ai/chat", {
        userMessage: input, // Pass the ENTIRE problem object for better context in the backend
        problem: problem,
      });

      const data = res.data;
      const aiMsg = {
        sender: "ai",
        text: data.response || "I'm here to help!",
        code: data.code || "",
        language: data.language || "",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "⚠️ Oops! Something went wrong. Please try again.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
            {/* Floating Chat Button with Pulse Animation */}     {" "}
      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-18 right-3 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl shadow-blue-500/30 transition-all focus:outline-none"
        >
                    <Bot className="w-6 h-6" />    
                   {" "}
          <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 top-0 left-0" />
                 {" "}
        </motion.button>
      )}
           {" "}
      {/* Main Chat Window with Framer Motion Transition and Draggability */}   
       {" "}
      {isOpen && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0, x: 20, y: 20 }}
          animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          drag
          dragMomentum={false}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          dragListener={resizeRef} // Only allow dragging from the header
          className="fixed bottom-16 right-6 z-50 rounded-2xl border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-lg shadow-2xl flex flex-col overflow-hidden"
          style={{ width: `${size.width}px`, height: `${size.height}px` }}
        >
                    <ChatHeader setIsOpen={setIsOpen} resizeRef={resizeRef} />
                   {" "}
          <ChatMessages
            messages={messages}
            messagesEndRef={messagesEndRef}
            isThinking={isLoading}
          />
                   {" "}
          <ChatInput
            input={input}
            setInput={setInput}
            sendMessage={sendMessage}
            isLoading={isLoading}
          />
                    <ResizeHandle onResizeStart={() => setIsResizing(true)} /> 
               {" "}
        </motion.div>
      )}
         {" "}
    </>
  );
};

export default AIChat;
