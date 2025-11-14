
// import { useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import axiosClient from "../utils/axiosConfig";
// import { useSelector } from "react-redux";
// import ProblemCardAnimated from "../components/ProblemCard";

// function Homepage() {
//   const [problems, setProblems] = useState([]); // always start as array
//   const [solvedProblem, setSolvedProblem] = useState([]);
//   const [loadingProblems, setLoadingProblems] = useState(true);
//   const [loadingSolved, setLoadingSolved] = useState(true);
//   const [error, setError] = useState(null);

//   const { user, loading: authLoading } = useSelector((state) => state.auth);

//   const [filters, setFilters] = useState({
//     difficulty: "all",
//     tag: "all",
//     status: "all",
//   });

//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         setLoadingProblems(true);
//         const { data } = await axiosClient.get("problem/all/page=1/limit=100");

//         // Ensure data is an array
//         if (Array.isArray(data)) {
//           setProblems(data);
//         } else if (data.problems && Array.isArray(data.problems)) {
//           setProblems(data.problems);
//         } else {
//           setProblems([]);
//         }
//       } catch (err) {
//         console.error("Error fetching problems:", err);
//         setError("Failed to fetch problems.");
//       } finally {
//         setLoadingProblems(false);
//       }
//     };

//     const fetchSolvedProblems = async () => {
//       if (!user) return;
//       try {
//         setLoadingSolved(true);
//         const { data } = await axiosClient.get("problem/user");

//         if (Array.isArray(data)) {
//           setSolvedProblem(data);
//         } else if (data.solved && Array.isArray(data.solved)) {
//           setSolvedProblem(data.solved);
//         } else {
//           setSolvedProblem([]);
//         }
//       } catch (err) {
//         console.error("Error fetching solved problems:", err);
//       } finally {
//         setLoadingSolved(false);
//       }
//     };

//     fetchProblems();
//     fetchSolvedProblems();
//   }, [user]);

//   // ✅ Safe filtering
//   const filtredProblems = Array.isArray(problems)
//     ? problems.filter((problem) => {
//         const difficultyMatch =
//           filters.difficulty === "all" ||
//           problem.difficulty?.toLowerCase() === filters.difficulty.toLowerCase();

//         const tagMatch =
//           filters.tag === "all" ||
//           problem.tags?.toLowerCase() === filters.tag.toLowerCase();

//         let statusMatch = true;
//         if (filters.status === "solved") {
//           statusMatch = solvedProblem.some((sp) => sp._id === problem._id);
//         } else if (filters.status === "unsolved") {
//           statusMatch = !solvedProblem.some((sp) => sp._id === problem._id);
//         }

//         return difficultyMatch && tagMatch && statusMatch;
//       })
//     : [];

//   // Show loading spinner if auth or problems are loading
//   if (authLoading || loadingProblems || loadingSolved) {
//     return (
//       <div className="bg-black min-h-screen flex items-center justify-center">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen">
//       <Navbar props={user} />

//       <div className="pt-28 pb-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-12 text-center">
//           <h1 className="text-5xl font-extrabold text-gray-50 mb-4 drop-shadow-md">
//             <span className="text-amber-400">Welcome</span> {user?.firstName}
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Dive into{" "}
//             <span className="font-semibold text-amber-300">{problems.length}</span>{" "}
//             problems and sharpen your skills.
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="bg-zinc-800/70 p-5 rounded-xl border border-zinc-700 shadow-lg mb-8">
//           <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
//             <select
//               className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters({ ...filters, status: e.target.value })
//               }
//             >
//               <option value="all">All Problems</option>
//               <option value="solved">Solved</option>
//               <option value="unsolved">Unsolved</option>
//             </select>

//             <select
//               className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
//               value={filters.difficulty}
//               onChange={(e) =>
//                 setFilters({ ...filters, difficulty: e.target.value })
//               }
//             >
//               <option value="all">All Difficulties</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>

//             <select
//               className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
//               value={filters.tag}
//               onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
//             >
//               <option value="all">All Tags</option>
//               <option value="array">Array</option>
//               <option value="string">String</option>
//               <option value="linkedlist">Linked List</option>
//               <option value="graph">Graph</option>
//               <option value="dynamic programming">Dynamic Programming</option>
//               <option value="maths">Maths</option>
//             </select>
//           </div>
//         </div>

//         {/* Problems List */}
//         <div className="bg-zinc-800/80 p-6 rounded-xl shadow-2xl shadow-black/50 border border-zinc-700">
//           <div className="hidden sm:flex items-center text-xs font-semibold uppercase text-gray-400 px-2 py-2 mb-3 border-b border-zinc-700">
//             <div className="w-12 text-center">#</div>
//             <div className="flex-1">Title</div>
//             <div className="w-32 text-center">Tags</div>
//             <div className="w-28 text-right">Difficulty</div>
//           </div>

//           <div className="space-y-2">
//             {filtredProblems.map((problem, index) => (
//               <ProblemCardAnimated key={problem._id} problem={problem} idx={index + 1} />
//             ))}

//             {filtredProblems.length === 0 && (
//               <p className="text-gray-400 text-center py-6">
//                 No problems match your filters.
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="h-20"></div>
//       </div>
//     </div>
//   );
// }

// export default Homepage;


import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import ProblemCardAnimated from "../components/ProblemCard";

function Homepage() {
  const [problems, setProblems] = useState([]);
  const [solvedProblem, setSolvedProblem] = useState([]);
  const [loadingProblems, setLoadingProblems] = useState(true);
  const [loadingSolved, setLoadingSolved] = useState(true);
  const [error, setError] = useState(null);

  const { user, loading: authLoading } = useSelector((state) => state.auth);

  const [filters, setFilters] = useState({
    difficulty: "all",
    tag: "all",
    status: "all",
  });

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoadingProblems(true);
        const { data } = await axiosClient.get("problem/all/page=1/limit=100");

        if (Array.isArray(data)) {
          setProblems(data);
        } else if (data.problems && Array.isArray(data.problems)) {
          setProblems(data.problems);
        } else {
          setProblems([]);
        }
      } catch (err) {
        console.error("Error fetching problems:", err);
        setError("Failed to fetch problems.");
      } finally {
        setLoadingProblems(false);
      }
    };

    const fetchSolvedProblems = async () => {
      if (!user) return;
      try {
        setLoadingSolved(true);
        const { data } = await axiosClient.get("problem/user");

        if (Array.isArray(data)) {
          setSolvedProblem(data);
        } else if (data.solved && Array.isArray(data.solved)) {
          setSolvedProblem(data.solved);
        } else {
          setSolvedProblem([]);
        }
      } catch (err) {
        console.error("Error fetching solved problems:", err);
      } finally {
        setLoadingSolved(false);
      }
    };

    fetchProblems();
    fetchSolvedProblems();
  }, [user]);

  const filtredProblems = Array.isArray(problems)
    ? problems.filter((problem) => {
        const difficultyMatch =
          filters.difficulty === "all" ||
          problem.difficulty?.toLowerCase() === filters.difficulty.toLowerCase();

        const tagMatch =
          filters.tag === "all" ||
          problem.tags?.toLowerCase() === filters.tag.toLowerCase();

        let statusMatch = true;
        if (filters.status === "solved") {
          statusMatch = solvedProblem.some((sp) => sp._id === problem._id);
        } else if (filters.status === "unsolved") {
          statusMatch = !solvedProblem.some((sp) => sp._id === problem._id);
        }

        return difficultyMatch && tagMatch && statusMatch;
      })
    : [];

  if (authLoading || loadingProblems || loadingSolved) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen">
      {/* ✅ No props passed, Navbar takes role from Redux */}
      <Navbar />

      <div className="pt-28 pb-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-50 mb-4 drop-shadow-md">
            <span className="text-amber-400">Welcome</span> {user?.firstName}
          </h1>
          <p className="text-gray-400 text-lg">
            Dive into{" "}
            <span className="font-semibold text-amber-300">
              {problems.length}
            </span>{" "}
            problems and sharpen your skills.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-zinc-800/70 p-5 rounded-xl border border-zinc-700 shadow-lg mb-8">
          <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
            <select
              className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Problems</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>

            <select
              className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
              value={filters.difficulty}
              onChange={(e) =>
                setFilters({ ...filters, difficulty: e.target.value })
              }
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <select
              className="select select-bordered bg-zinc-900 text-gray-200 border-zinc-600"
              value={filters.tag}
              onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
            >
              <option value="all">All Tags</option>
              <option value="array">Array</option>
              <option value="string">String</option>
              <option value="linkedlist">Linked List</option>
              <option value="graph">Graph</option>
              <option value="dynamic programming">Dynamic Programming</option>
              <option value="maths">Maths</option>
            </select>
          </div>
        </div>

        {/* Problems */}
        <div className="bg-zinc-800/80 p-6 rounded-xl shadow-2xl shadow-black/50 border border-zinc-700">
          <div className="hidden sm:flex items-center text-xs font-semibold uppercase text-gray-400 px-2 py-2 mb-3 border-b border-zinc-700">
            <div className="w-12 text-center">#</div>
            <div className="flex-1">Title</div>
            <div className="w-32 text-center">Tags</div>
            <div className="w-28 text-right">Difficulty</div>
          </div>

          <div className="space-y-2">
            {filtredProblems.map((problem, index) => (
              <ProblemCardAnimated
                key={problem._id}
                problem={problem}
                idx={index + 1}
              />
            ))}

            {filtredProblems.length === 0 && (
              <p className="text-gray-400 text-center py-6">
                No problems match your filters.
              </p>
            )}
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default Homepage;
