import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PartyAnimation = ({ isVisible, onComplete }) => {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (isVisible) {
      // Generate confetti pieces
      const confettiPieces = Array.from({ length: 100 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50,
        rotation: Math.random() * 360,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 7)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 2,
      }));
      setConfetti(confettiPieces);

      // Auto-hide after 4 seconds
      const timer = setTimeout(() => {
        onComplete();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {/* Confetti */}
          {confetti.map((piece) => (
            <motion.div
              key={piece.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                left: piece.x,
                top: piece.y,
              }}
              initial={{ 
                y: -50, 
                x: piece.x,
                rotate: 0,
                scale: 0 
              }}
              animate={{ 
                y: window.innerHeight + 100,
                x: piece.x + (Math.random() - 0.5) * 200,
                rotate: piece.rotation + 720,
                scale: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: piece.delay,
                ease: "easeOut"
              }}
            />
          ))}

          {/* Success Message */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-center">
              <motion.div
                className="text-4xl mb-2"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 0.6, 
                  repeat: 3,
                  delay: 0.8
                }}
              >
                🎉
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">Congratulations!</h2>
              <p className="text-lg opacity-90">Solution Accepted!</p>
            </div>
          </motion.div>

          {/* Floating Stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute text-yellow-400 text-2xl"
              style={{
                left: Math.random() * window.innerWidth,
                top: Math.random() * window.innerHeight,
              }}
              initial={{ 
                scale: 0, 
                opacity: 0,
                rotate: 0 
              }}
              animate={{ 
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: 360,
                y: [0, -50, 0]
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 1
              }}
            >
              ⭐
            </motion.div>
          ))}

          {/* Burst Effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 opacity-30 blur-xl"></div>
          </motion.div>

          {/* Success Checkmark */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0, pathLength: 0 }}
            animate={{ scale: 1, pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              className="text-green-500"
            >
              <motion.path
                d="M9 12l2 2 4-4"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
              <motion.circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </svg>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PartyAnimation;
