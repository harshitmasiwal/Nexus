import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "text-green-400 bg-green-500/10 border-green-400/30";
    case "medium":
      return "text-amber-400 bg-amber-500/10 border-amber-400/30";
    case "hard":
      return "text-red-400 bg-red-500/10 border-red-400/30";
    default:
      return "text-gray-400 bg-zinc-600/20 border-zinc-500/30";
  }
};

const ProblemCardAnimated = ({ problem, idx }) => {
  const difficultyStyle = getDifficultyColor(problem.difficulty);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const delay = idx * 50;
    const timeout = setTimeout(() => setIsMounted(true), 300 + delay);
    return () => clearTimeout(timeout);
  }, [idx]);

  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/problem/${problem._id}`);
  };
  return (
  
    <div  onClick={handleClick}
      className={`relative w-full p-4 sm:p-5 rounded-xl border border-zinc-700/60 
                  bg-gradient-to-r from-zinc-900/70 to-zinc-800/60 
                  backdrop-blur-md shadow-md shadow-black/30
                  flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3
                  transition-all duration-300 ease-in-out
                  hover:scale-[1.01] hover:border-amber-400/40 hover:shadow-amber-500/20
                  ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Left Section - Index & Title */}
      <div className="flex-1 min-w-0">
        {/* Index */}
        <span className="text-gray-500 font-mono text-xs sm:text-sm">
          {idx.toString().padStart(2, "0")}
        </span>

        {/* Title */}
        <h3
          className="text-gray-100 font-semibold text-sm sm:text-base md:text-lg line-clamp-2 mt-1"
          title={problem.title}
        >
          {problem.title}
        </h3>
      </div>

      {/* Right Section - Tags + Difficulty */}
      <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
        {/* Tags */}
        <span
          className="text-[11px] sm:text-xs font-medium text-amber-300 px-3 py-1 rounded-full
                     bg-gradient-to-r from-amber-600/20 to-amber-400/20 border border-amber-400/30
                     max-w-[120px] sm:max-w-[150px] truncate"
          title={problem.tags}
        >
          {problem.tags}
        </span>

        {/* Difficulty */}
        <span
          className={`text-[11px] sm:text-xs font-bold tracking-wider px-3 py-1 rounded-full border whitespace-nowrap ${difficultyStyle}`}
          title={problem.difficulty}
        >
          {problem.difficulty.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default ProblemCardAnimated;

