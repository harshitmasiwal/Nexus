

// import { useEffect, useState } from "react";


// const getDifficultyColor = (difficulty) => {
//     switch (difficulty) {
//         case 'Easy': return 'text-green-400';
//         case 'Medium': return 'text-amber-400';
//         case 'Hard': return 'text-red-400';
//         default: return 'text-gray-400';
//     }
// };

// /**
//  * ProblemCardAnimated component: Displays a single coding problem with unique styling and entrance animation.
//  */
// const ProblemCardAnimated = ({ problem, idx }) => {
//     // This calls the utility function defined above
//     const difficultyColor = getDifficultyColor(problem.difficulty);
//     const [isMounted, setIsMounted] = useState(false);

//     // Staggered entrance animation effect
//     useEffect(() => {
//         const delay = idx * 50; // 50ms stagger per item
//         const timeout = setTimeout(() => setIsMounted(true), 500 + delay);
//         return () => clearTimeout(timeout);
//     }, [idx]);

//     return (
//         <div 
//             className={`flex items-center text-sm px-4 py-5 mb-3 cursor-pointer 
//                         bg-zinc-800 rounded-xl shadow-lg shadow-black/50 border border-zinc-700
//                         transition-all duration-300 ease-in-out
//                         hover:bg-zinc-700/90 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-0.5
//                         ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
//         >
//             {/* Index # (Visible on all sizes) */}
//             <div className="w-12 flex-shrink-0 text-center pr-2">
//                 <span className="text-gray-500 font-mono text-xs">{idx.toString().padStart(2, '0')}</span>
//             </div>
            
//             {/* Title */}
//             <div className="flex-1 min-w-0 pr-4">
//                 <span className={`font-semibold text-gray-50 hover:text-amber-400 transition-colors duration-200 text-base`}>
//                     {problem.title}
//                 </span>
//             </div>

//             {/* Tags (Desktop/Tablet) */}
//             <div className="w-32 text-center pr-4 hidden sm:block flex-shrink-0">
//                 <span className="text-xs font-medium text-amber-300 px-3 py-1 rounded-full bg-zinc-700/70 border border-amber-500/30">
//                     {problem.tags}
//                 </span>
//             </div>

//             {/* Difficulty (Desktop/Tablet) */}
//             <div className="w-24 text-right pr-4 hidden sm:block flex-shrink-0">
//                 <span className={`font-extrabold text-sm ${difficultyColor} tracking-wider`}>
//                     {problem.difficulty.toUpperCase()}
//                 </span>
//             </div>

//             {/* Mobile Tags & Difficulty */}
//             <div className="sm:hidden flex flex-col items-end space-y-1">
//                  <span className={`text-xs font-semibold ${difficultyColor}`}>
//                         {problem.difficulty}
//                  </span>
//                  <span className="text-xs font-medium text-amber-300 px-2 py-0.5 rounded-full bg-zinc-700/70">
//                     {problem.tags}
//                 </span>
//             </div>
//         </div>
//     );
// };



// export default ProblemCardAnimated


import { useEffect, useState } from "react";

const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-400';
        case 'Medium': return 'text-amber-400';
        case 'Hard': return 'text-red-400';
        default: return 'text-gray-400';
    }
};

const ProblemCardAnimated = ({ problem, idx }) => {
    const difficultyColor = getDifficultyColor(problem.difficulty);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const delay = idx * 50;
        const timeout = setTimeout(() => setIsMounted(true), 500 + delay);
        return () => clearTimeout(timeout);
    }, [idx]);

    return (
        <div
            className={`flex flex-col sm:flex-row justify-between px-4 py-3 mb-3 cursor-pointer
                        bg-zinc-800 rounded-xl shadow-lg shadow-black/50 border border-zinc-700
                        transition-all duration-300 ease-in-out
                        hover:bg-zinc-700/90 hover:shadow-xl hover:shadow-amber-500/20
                        ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
            {/* Top Row: Index + Title */}
            <div className="flex items-start w-full sm:w-auto">
                <div className="w-12 flex-shrink-0 text-center pr-2">
                    <span className="text-gray-400 font-mono text-xs sm:text-sm">{idx.toString().padStart(2, '0')}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <span
                        className="font-semibold text-gray-50 text-sm sm:text-base truncate"
                        title={problem.title}
                    >
                        {problem.title}
                    </span>
                </div>
            </div>

            {/* Bottom Row: Tags + Difficulty */}
            <div className="flex items-center justify-start sm:justify-end mt-2 sm:mt-0 gap-2">
                <span
                    className="text-[10px] sm:text-xs font-medium text-amber-300 px-2 py-0.5 rounded-full bg-zinc-700/70 border border-amber-500/30 truncate"
                    title={problem.tags}
                >
                    {problem.tags}
                </span>
                <span
                    className={`text-[10px] sm:text-xs font-extrabold tracking-wider ${difficultyColor} truncate`}
                    title={problem.difficulty}
                >
                    {problem.difficulty.toUpperCase()}
                </span>
            </div>
        </div>
    );
};

export default ProblemCardAnimated;
