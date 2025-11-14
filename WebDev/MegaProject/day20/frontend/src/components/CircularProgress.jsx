import React, { useEffect, useState } from 'react';

const CircularProgress = ({ 
  percentage, 
  size = 128, 
  strokeWidth = 8, 
  color = '#f59e0b', 
  backgroundColor = '#374151',
  showPercentage = true,
  label = 'Progress',
  animated = true
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAnimatedPercentage(percentage);
    }
  }, [percentage, animated]);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-30"
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))'
          }}
        />
      </svg>
      
      {/* Center Content */}
      {showPercentage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className="text-3xl font-bold transition-all duration-1000 ease-out"
            style={{ color }}
          >
            {Math.round(animatedPercentage)}%
          </div>
          <div className="text-xs text-gray-400 font-medium mt-1">
            {label}
          </div>
        </div>
      )}
    </div>
  );
};

export default CircularProgress;
