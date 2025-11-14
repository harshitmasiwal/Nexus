import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

const AIChat = ({ problem }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize with a welcome message
    useEffect(() => {
        if (problem && messages.length === 0) {
            setMessages([{
                id: 1,
                type: 'bot',
                content: `Hi! I'm your AI coding assistant. I can help you with this problem: "${problem.title}". Ask me about the approach, time complexity, or any coding questions!`,
                timestamp: new Date()
            }]);
        }
    }, [problem, messages.length]);

    const handleSendMessage = async () => {
        if (!inputMessage.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: inputMessage.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setIsLoading(true);

        try {
            // Simulate AI response (replace with actual AI API call)
            const aiResponse = await simulateAIResponse(inputMessage, problem);
            
            const botMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: aiResponse,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                type: 'bot',
                content: "Sorry, I'm having trouble connecting right now. Please try again later.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const simulateAIResponse = async (message, problem) => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('approach') || lowerMessage.includes('how to solve')) {
            return `For "${problem.title}", here's a general approach:\n\n1. **Understand the problem**: Read the description carefully and identify the input/output format.\n\n2. **Identify patterns**: Look for common algorithmic patterns like:\n   - Two pointers\n   - Sliding window\n   - Hash maps\n   - Dynamic programming\n   - Graph traversal\n\n3. **Consider edge cases**: Empty inputs, single elements, duplicates, etc.\n\n4. **Choose data structures**: Based on the operations needed (lookup, insertion, deletion).\n\n5. **Write pseudocode**: Plan your solution before coding.\n\nWould you like me to elaborate on any specific aspect?`;
        }
        
        if (lowerMessage.includes('time complexity') || lowerMessage.includes('complexity')) {
            return `Time complexity analysis depends on your approach:\n\n**Common complexities:**\n- O(1): Constant time operations\n- O(log n): Binary search, balanced trees\n- O(n): Single pass through data\n- O(n log n): Sorting, divide & conquer\n- O(n²): Nested loops\n- O(2ⁿ): Recursive solutions with branching\n\n**Space complexity:**\n- O(1): Constant extra space\n- O(n): Linear extra space (arrays, stacks)\n- O(log n): Recursion depth\n\nFor this problem, the optimal solution typically ranges from O(n) to O(n log n) depending on the approach. What specific algorithm are you considering?`;
        }
        
        if (lowerMessage.includes('edge case') || lowerMessage.includes('edge cases')) {
            return `Common edge cases to consider for "${problem.title}":\n\n1. **Empty input**: What if the input array/string is empty?\n2. **Single element**: How does your solution handle arrays/strings with one element?\n3. **All same elements**: What if all elements are identical?\n4. **Negative numbers**: If applicable, how do negative values affect your solution?\n5. **Large numbers**: Consider integer overflow for very large inputs\n6. **Boundary values**: Minimum and maximum possible values\n7. **Duplicates**: How do you handle repeated elements?\n\nAlways test these cases with your solution!`;
        }
        
        if (lowerMessage.includes('debug') || lowerMessage.includes('error')) {
            return `Here are some debugging tips:\n\n1. **Add print statements**: Log intermediate values to understand the flow\n2. **Check variable types**: Ensure you're comparing compatible types\n3. **Verify loop conditions**: Make sure your loops terminate correctly\n4. **Test with examples**: Trace through the provided examples step by step\n5. **Check array bounds**: Avoid index out of bounds errors\n6. **Validate input**: Ensure your code handles all possible inputs\n\nWhat specific error are you encountering? I can help you debug it!`;
        }
        
        if (lowerMessage.includes('optimize') || lowerMessage.includes('optimization')) {
            return `Optimization strategies for "${problem.title}":\n\n1. **Algorithmic optimization**: Choose the most efficient algorithm\n2. **Data structure optimization**: Use appropriate data structures\n3. **Space-time tradeoff**: Sometimes using extra space can reduce time\n4. **Early termination**: Break loops when possible\n5. **Memoization**: Cache results for repeated calculations\n6. **Two pointers**: Reduce nested loops to single pass\n7. **Sliding window**: Optimize subarray/substring problems\n\nWhat's your current approach? I can suggest specific optimizations!`;
        }
        
        // Default response
        return `I understand you're asking about "${message}". For "${problem.title}", I can help you with:\n\n• **Problem analysis** and approach\n• **Time and space complexity** analysis\n• **Edge cases** to consider\n• **Debugging** your code\n• **Optimization** strategies\n• **Algorithm selection**\n\nCould you be more specific about what you'd like help with?`;
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-zinc-900/50 to-zinc-800/30">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-zinc-700/50 bg-gradient-to-r from-zinc-800/90 to-zinc-700/80 backdrop-blur-lg shadow-lg">
                <div className="relative">
                    <Bot className="w-6 h-6 text-blue-400" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-white text-lg">AI Assistant</h3>
                    <p className="text-xs text-zinc-400">Ready to help with your coding questions</p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400 font-medium">Online</span>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gradient-to-b from-transparent via-zinc-900/10 to-zinc-800/20">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-300`}
                    >
                        <div className={`flex items-start space-x-3 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                                message.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-blue-500' : 'bg-gradient-to-r from-zinc-700 to-zinc-600'
                            }`}>
                                {message.type === 'user' ? (
                                    <User className="w-5 h-5 text-white" />
                                ) : (
                                    <Bot className="w-5 h-5 text-blue-400" />
                                )}
                            </div>
                            <div className={`rounded-xl p-4 shadow-lg transition-all duration-300 ${
                                message.type === 'user' 
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white' 
                                    : 'bg-gradient-to-r from-zinc-800/90 to-zinc-700/90 text-zinc-200 border border-zinc-600/50 backdrop-blur-sm'
                            }`}>
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                    {message.content}
                                </div>
                                <div className={`text-xs mt-2 flex items-center space-x-1 ${
                                    message.type === 'user' ? 'text-blue-200' : 'text-zinc-400'
                                }`}>
                                    <span>{message.timestamp.toLocaleTimeString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {isLoading && (
                    <div className="flex justify-start animate-in fade-in duration-300">
                        <div className="flex items-start space-x-3 max-w-[85%]">
                            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-zinc-700 to-zinc-600 flex items-center justify-center shadow-lg">
                                <Bot className="w-5 h-5 text-blue-400" />
                            </div>
                            <div className="bg-gradient-to-r from-zinc-800/90 to-zinc-700/90 text-zinc-200 border border-zinc-600/50 rounded-xl p-4 backdrop-blur-sm shadow-lg">
                                <div className="flex items-center space-x-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                                    <span className="text-sm font-medium">AI is thinking...</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-zinc-700/50 bg-gradient-to-r from-zinc-800/90 to-zinc-700/80 backdrop-blur-lg shadow-lg">
                <div className="flex space-x-3">
                    <div className="flex-1 relative">
                        <textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything about this problem..."
                            className="w-full bg-zinc-700/80 border border-zinc-600/50 text-white rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 placeholder-zinc-400"
                            rows={2}
                            disabled={isLoading}
                        />
                        <div className="absolute bottom-2 right-2 text-xs text-zinc-500">
                            {inputMessage.length}/500
                        </div>
                    </div>
                    <button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isLoading}
                        className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:from-zinc-600 disabled:to-zinc-500 disabled:cursor-not-allowed text-white rounded-xl transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 disabled:transform-none"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center justify-between mt-3 text-xs text-zinc-400">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>AI Assistant Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChat;
