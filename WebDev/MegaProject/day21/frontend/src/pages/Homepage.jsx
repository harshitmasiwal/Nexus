

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../utils/axiosConfig";
import { useSelector } from "react-redux";
import ProblemCardAnimated from "../components/ProblemCard";
import CircularProgress from "../components/CircularProgress";

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
        {/* Enhanced Hero Section */}
        <div className="mb-16 text-center relative">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-amber-400/10 to-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="relative z-10">
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-50 mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Welcome
              </span>{" "}
              <span className="text-gray-100">{user?.firstName}</span>
            </h1>
            
            <p className="text-gray-300 text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Master coding with{" "}
              <span className="font-bold text-amber-300 bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                {problems.length}
              </span>{" "}
              carefully crafted problems designed to elevate your skills
            </p>
            
            {/* Circular Progress Stats */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
              {/* Main Circular Progress Bar */}
              <div className="relative">
                <CircularProgress
                  percentage={problems.length > 0 ? (solvedProblem.length / problems.length) * 100 : 0}
                  size={160}
                  strokeWidth={12}
                  color="#f59e0b"
                  backgroundColor="#374151"
                  label="Progress"
                  animated={true}
                />
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 blur-xl -z-10"></div>
              </div>

              {/* Side Stats */}
              <div className="flex flex-col gap-4">
                <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-700/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-zinc-600/50 min-w-[160px] shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                    <div className="text-2xl font-bold text-amber-400">{problems.length}</div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Total Problems</div>
                </div>
                
                <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-700/80 backdrop-blur-sm rounded-xl px-6 py-4 border border-zinc-600/50 min-w-[160px] shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="text-2xl font-bold text-green-400">{solvedProblem.length}</div>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">Solved</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-gradient-to-r from-zinc-800/80 to-zinc-700/80 backdrop-blur-sm p-6 rounded-2xl border border-zinc-600/50 shadow-2xl shadow-black/20 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Filter Problems
            </h2>
            <span className="text-sm text-gray-400 bg-zinc-700/50 px-3 py-1 rounded-full">
              {filtredProblems.length} results
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select
                className="w-full px-4 py-3 bg-zinc-900/80 text-gray-200 border border-zinc-600/50 rounded-xl focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="all">All Problems</option>
                <option value="solved">✅ Solved</option>
                <option value="unsolved">❌ Unsolved</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Difficulty</label>
              <select
                className="w-full px-4 py-3 bg-zinc-900/80 text-gray-200 border border-zinc-600/50 rounded-xl focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                value={filters.difficulty}
                onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">🟢 Easy</option>
                <option value="medium">🟡 Medium</option>
                <option value="hard">🔴 Hard</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <select
                className="w-full px-4 py-3 bg-zinc-900/80 text-gray-200 border border-zinc-600/50 rounded-xl focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-200"
                value={filters.tag}
                onChange={(e) => setFilters({ ...filters, tag: e.target.value })}
              >
                <option value="all">All Categories</option>
                <option value="array">📊 Array</option>
                <option value="string">🔤 String</option>
                <option value="linkedlist">🔗 Linked List</option>
                <option value="graph">🕸️ Graph</option>
                <option value="dynamic programming">⚡ Dynamic Programming</option>
                <option value="maths">🔢 Maths</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Problems Section */}
        <div className="bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl shadow-black/30 border border-zinc-600/50">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-400 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-100">Problem Set</h2>
            </div>
            <div className="text-sm text-gray-400 bg-zinc-700/50 px-3 py-1 rounded-full">
              {filtredProblems.length} of {problems.length} problems
            </div>
          </div>

          {/* Desktop Table Header */}
          <div className="hidden sm:flex items-center text-xs font-semibold uppercase text-gray-400 px-4 py-3 mb-4 bg-zinc-700/30 rounded-xl border border-zinc-600/30">
            <div className="w-16 text-center">#</div>
            <div className="flex-1 px-4">Title</div>
            <div className="w-40 text-center">Category</div>
            <div className="w-32 text-center">Difficulty</div>
            <div className="w-20 text-center">Status</div>
          </div>

          {/* Problems List */}
          <div className="space-y-3">
            {filtredProblems.map((problem, index) => (
              <ProblemCardAnimated
                key={problem._id}
                problem={problem}
                idx={index + 1}
                isSolved={solvedProblem.some((sp) => sp._id === problem._id)}
              />
            ))}

            {filtredProblems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-zinc-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">No Problems Found</h3>
                <p className="text-gray-400">Try adjusting your filters to see more problems.</p>
              </div>
            )}
          </div>
        </div>

        <div className="h-20"></div>
      </div>
    </div>
  );
}

export default Homepage;
