import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Clock, Star, ArrowRight } from "lucide-react";

const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return {
        text: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-400/30",
        icon: "🟢"
      };
    case "medium":
      return {
        text: "text-amber-400",
        bg: "bg-amber-500/10",
        border: "border-amber-400/30",
        icon: "🟡"
      };
    case "hard":
      return {
        text: "text-red-400",
        bg: "bg-red-500/10",
        border: "border-red-400/30",
        icon: "🔴"
      };
    default:
      return {
        text: "text-gray-400",
        bg: "bg-zinc-600/20",
        border: "border-zinc-500/30",
        icon: "⚪"
      };
  }
};

const ProblemCardAnimated = ({ problem, idx, isSolved = false }) => {
  const difficultyStyle = getDifficultyColor(problem.difficulty);
  const [isMounted, setIsMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const delay = idx * 50;
    const timeout = setTimeout(() => setIsMounted(true), 300 + delay);
    return () => clearTimeout(timeout);
  }, [idx]);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/problem/${problem._id}`);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative w-full rounded-2xl border transition-all duration-500 ease-out cursor-pointer
                  ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  ${isSolved 
                    ? "bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30 shadow-green-500/10" 
                    : "bg-gradient-to-r from-zinc-800/60 to-zinc-700/60 border-zinc-600/40 shadow-zinc-900/20"
                  }
                  hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/50
                  backdrop-blur-sm`}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400/5 to-orange-400/5 opacity-0 transition-opacity duration-500 ${
        isHovered ? "opacity-100" : ""
      }`}></div>

      <div className="relative p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Problem Number */}
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-700/50 border border-zinc-600/30">
              <span className="text-lg font-bold text-gray-300">
                {idx.toString().padStart(2, "0")}
              </span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              {isSolved ? (
                <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium text-green-400">Solved</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-3 py-1 bg-zinc-600/30 border border-zinc-500/30 rounded-full">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span className="text-xs font-medium text-zinc-400">Pending</span>
                </div>
              )}
            </div>
          </div>

          {/* Arrow Icon */}
          <div className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}>
            <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-amber-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-100 mb-4 group-hover:text-amber-100 transition-colors duration-300 line-clamp-2">
          {problem.title}
        </h3>

        {/* Tags and Difficulty Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Category Tag */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 rounded-xl">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-amber-300">
              {problem.tags}
            </span>
          </div>

          {/* Difficulty Badge */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${difficultyStyle.bg} ${difficultyStyle.border}`}>
            <span className="text-lg">{difficultyStyle.icon}</span>
            <span className={`text-sm font-bold ${difficultyStyle.text}`}>
              {problem.difficulty.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Progress Bar (for solved problems) */}
        {isSolved && (
          <div className="w-full bg-zinc-700/50 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-green-400 to-emerald-400 h-2 rounded-full w-full"></div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
            Click to solve
          </span>
          <span className="group-hover:text-amber-400 transition-colors duration-300">
            Start coding →
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProblemCardAnimated;

