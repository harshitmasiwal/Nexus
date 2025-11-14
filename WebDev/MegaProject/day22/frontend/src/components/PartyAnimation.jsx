// import React, { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PartyAnimation = ({ isVisible, onComplete }) => {
//   const [confetti, setConfetti] = useState([]);

//   useEffect(() => {
//     if (isVisible) {
//       // Generate confetti pieces
//       const confettiPieces = Array.from({ length: 100 }, (_, i) => ({
//         id: i,
//         x: Math.random() * window.innerWidth,
//         y: -50,
//         rotation: Math.random() * 360,
//         color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)],
//         size: Math.random() * 8 + 4,
//         delay: Math.random() * 2,
//       }));
//       setConfetti(confettiPieces);

//       // Auto-hide after 4 seconds
//       const timer = setTimeout(() => {
//         onComplete();
//       }, 4000);

//       return () => clearTimeout(timer);
//     }
//   }, [isVisible, onComplete]);

//   if (!isVisible) return null;

//   return (
//     <AnimatePresence>
//       {isVisible && (
//         <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
//           {/* Confetti */}
//           {confetti.map((piece) => (
//             <motion.div
//               key={piece.id}
//               className="absolute rounded-full"
//               style={{
//                 backgroundColor: piece.color,
//                 width: piece.size,
//                 height: piece.size,
//                 left: piece.x,
//                 top: piece.y,
//               }}
//               initial={{ 
//                 y: -50, 
//                 x: piece.x,
//                 rotate: 0,
//                 scale: 0 
//               }}
//               animate={{ 
//                 y: window.innerHeight + 100,
//                 x: piece.x + (Math.random() - 0.5) * 200,
//                 rotate: piece.rotation + 720,
//                 scale: [0, 1, 1, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 delay: piece.delay,
//                 ease: "easeOut"
//               }}
//             />
//           ))}

//           {/* Success Message */}
//           <motion.div
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-center">
//               <motion.div
//                 className="text-4xl mb-2"
//                 animate={{ 
//                   scale: [1, 1.2, 1],
//                   rotate: [0, 5, -5, 0]
//                 }}
//                 transition={{ 
//                   duration: 0.6, 
//                   repeat: 3,
//                   delay: 0.8
//                 }}
//               >
//                 🎉
//               </motion.div>
//               <h2 className="text-2xl font-bold mb-1">Congratulations!</h2>
//               <p className="text-lg opacity-90">Solution Accepted!</p>
//             </div>
//           </motion.div>

//           {/* Floating Stars */}
//           {Array.from({ length: 20 }).map((_, i) => (
//             <motion.div
//               key={`star-${i}`}
//               className="absolute text-yellow-400 text-2xl"
//               style={{
//                 left: Math.random() * window.innerWidth,
//                 top: Math.random() * window.innerHeight,
//               }}
//               initial={{ 
//                 scale: 0, 
//                 opacity: 0,
//                 rotate: 0 
//               }}
//               animate={{ 
//                 scale: [0, 1, 0],
//                 opacity: [0, 1, 0],
//                 rotate: 360,
//                 y: [0, -50, 0]
//               }}
//               transition={{
//                 duration: 2,
//                 delay: Math.random() * 2,
//                 repeat: Infinity,
//                 repeatDelay: Math.random() * 3 + 1
//               }}
//             >
//               ⭐
//             </motion.div>
//           ))}

//           {/* Burst Effect */}
//           <motion.div
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             initial={{ scale: 0 }}
//             animate={{ scale: [0, 1.5, 0] }}
//             transition={{ duration: 1, delay: 0.2 }}
//           >
//             <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 blur-xl"></div>
//           </motion.div>

//           {/* Success Checkmark */}
//           <motion.div
//             className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             initial={{ scale: 0, pathLength: 0 }}
//             animate={{ scale: 1, pathLength: 1 }}
//             transition={{ duration: 0.8, delay: 0.3 }}
//           >
//             <svg
//               width="80"
//               height="80"
//               viewBox="0 0 24 24"
//               fill="none"
//               className="text-green-500"
//             >
//               <motion.path
//                 d="M9 12l2 2 4-4"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 0.6, delay: 0.5 }}
//               />
//               <motion.circle
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="3"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               />
//             </svg>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PartyAnimation;


import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIBRANT_COLORS = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#ff3d67'
];

// Success message animation variants
const messageVariants = {
    initial: { scale: 0.8, opacity: 0, y: -50 },
    animate: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, delay: 0.2 } },
    exit: { scale: 0.7, opacity: 0, transition: { duration: 0.3 } },
};

const PartyAnimation = ({ isVisible, onComplete }) => {
    // 💡 Use useMemo to generate confetti once per visible cycle, improving performance
    const confettiPieces = useMemo(() => {
        if (!isVisible) return [];
        
        return Array.from({ length: 150 }, (_, i) => ({ // Increased count for more density
            id: i,
            // Slightly bias x to the center for a 'burst' look
            x: window.innerWidth * 0.4 + Math.random() * window.innerWidth * 0.2, 
            y: window.innerHeight * 0.2, // Start higher up
            rotation: Math.random() * 360,
            color: VIBRANT_COLORS[Math.floor(Math.random() * VIBRANT_COLORS.length)],
            size: Math.random() * 6 + 4, // Slightly smaller range
            delay: Math.random() * 0.8, // Reduced max delay for a quicker burst
            xEnd: (Math.random() - 0.5) * window.innerWidth * 0.7, // Wider horizontal spread
            yEnd: window.innerHeight * 1.2 + Math.random() * 100,
        }));
    }, [isVisible]);

    useEffect(() => {
        if (isVisible) {
            // Auto-hide after 3.5 seconds (slightly reduced duration)
            const timer = setTimeout(() => {
                onComplete();
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onComplete]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden" // High Z-index
                    initial={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    animate={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }} // Subtle background fade
                    exit={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Confetti Particles */}
                    {confettiPieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            className="absolute rounded-full will-change-transform"
                            style={{
                                backgroundColor: piece.color,
                                width: piece.size,
                                height: piece.size,
                                left: piece.x,
                                top: piece.y,
                            }}
                            initial={{ 
                                y: piece.y, 
                                x: piece.x,
                                rotate: 0,
                                scale: 0.2 
                            }}
                            animate={{ 
                                y: piece.yEnd,
                                x: piece.x + piece.xEnd,
                                rotate: piece.rotation + 1080, // More rotation
                                scale: [0.2, 1, 1, 0.5], // Added scale-up
                                // 💡 Added complex movement for a more natural float/fall
                                transition: {
                                    duration: 3 + Math.random() * 1, // Varied duration
                                    delay: piece.delay,
                                    ease: "linear",
                                    y: { type: "tween", ease: "easeIn", duration: 3 + Math.random() * 1 },
                                    x: { type: "tween", ease: "easeInOut", duration: 3 + Math.random() * 1, repeat: Infinity, repeatType: 'reverse' },
                                }
                            }}
                        />
                    ))}

                    {/* 1. Burst Effect (Enhanced) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 0.5], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.5, delay: 0.1 }}
                    >
                        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-yellow-400 to-green-500 opacity-30 blur-3xl"></div>
                    </motion.div>
                    
                    {/* 2. Success Checkmark (Stays in place) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.5, opacity: 1, transition: { duration: 0.5, delay: 0.3 } }}
                        exit={{ scale: 0, opacity: 0 }}
                    >
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" className="text-green-400/80 drop-shadow-lg">
                            <motion.circle
                                cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                            />
                            <motion.path
                                d="M8 12l2.5 2.5 5.5-5.5" // Tighter checkmark path
                                stroke="#FFFFFF" 
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            />
                        </svg>
                    </motion.div>

                    {/* 3. Success Message (The main focus) */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                        variants={messageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white px-8 py-4 rounded-3xl shadow-2xl shadow-green-700/50 text-center border-4 border-white/50 backdrop-blur-sm">
                            <motion.div
                                className="text-5xl mb-2" // Bigger emoji
                                animate={{ 
                                    scale: [1, 1.3, 1], // More pronounced bounce
                                    rotate: [0, 10, -10, 0]
                                }}
                                transition={{ 
                                    duration: 0.6, 
                                    repeat: Infinity, // Loop the bounce slightly longer
                                    repeatDelay: 1.5,
                                    delay: 0.8
                                }}
                            >
                                🥳
                            </motion.div>
                            <h2 className="text-3xl font-extrabold mb-1 tracking-wider">ACCEPTED!</h2>
                            <p className="text-lg font-medium opacity-90">Your solution is correct.</p>
                        </div>
                    </motion.div>

                    {/* 4. Floating Stars (Enhanced and simplified) */}
                    {Array.from({ length: 25 }).map((_, i) => (
                        <motion.div
                            key={`star-${i}`}
                            className="absolute text-yellow-300/80 will-change-transform"
                            style={{
                                left: Math.random() * window.innerWidth,
                                top: Math.random() * window.innerHeight,
                                fontSize: Math.random() * 20 + 10, // Varied size
                            }}
                            animate={{ 
                                scale: [0, 1, 0.5],
                                opacity: [0, 1, 0],
                                rotate: 360,
                                y: [0, -50, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                delay: Math.random() * 1.5,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                repeatDelay: Math.random() * 2,
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PartyAnimation;