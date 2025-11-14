import React, { useEffect, useState } from "react";
import axiosClient from "../utils/axiosConfig";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  Edit3,
  ArrowLeft,
  Search,
  X,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  Trash,
} from "lucide-react";

const UpdateProblem = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all problems
  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/problem/all/page=1/limit=100");
        setProblems(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError("Failed to fetch problems: " + (err.response?.data || err.message));
      } finally {
        setLoading(false);
      }
    };

    fetchProblems();
  }, []);

  // Filter problems based on search term
  const filteredProblems = problems.filter(
    (problem) =>
      problem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.difficulty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      problem.tags?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateClick = (problem) => {
    navigate(`/admin/update-problem/${problem._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-zinc-300">Loading problems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      {/* Header */}
      <div className="bg-zinc-800 border-b border-zinc-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin")}
                className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Admin Panel</span>
              </button>
              <div className="h-6 w-px bg-zinc-600"></div>
              <h1 className="text-xl font-bold text-zinc-100">Update Problems</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-lg flex items-center space-x-3"
          >
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span className="text-green-400">Problem updated successfully!</span>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search problems by title, difficulty, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100 placeholder-zinc-400"
            />
          </div>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {filteredProblems.length === 0 ? (
            <div className="text-center py-12">
              <Edit3 className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-zinc-400 mb-2">
                {searchTerm ? "No problems found" : "No problems available"}
              </h3>
              <p className="text-zinc-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "There are no problems to update"}
              </p>
            </div>
          ) : (
            filteredProblems.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-zinc-100">
                        {problem.title}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          problem.difficulty === "Easy"
                            ? "bg-green-900 text-green-300"
                            : problem.difficulty === "Medium"
                            ? "bg-yellow-900 text-yellow-300"
                            : "bg-red-900 text-red-300"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-900 text-blue-300">
                        {problem.tags}
                      </span>
                    </div>
                    
                    <p className="text-zinc-400 mb-4 line-clamp-2">
                      {problem.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm text-zinc-500">
                      <span>Created: {new Date(problem.createdAt).toLocaleDateString()}</span>
                      <span>Updated: {new Date(problem.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => navigate(`/problem/${problem._id}`)}
                      className="flex items-center space-x-2 px-3 py-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                    
                    <button
                      onClick={() => handleUpdateClick(problem)}
                      className="flex items-center space-x-2 px-3 py-2 text-amber-400 hover:text-amber-300 hover:bg-amber-900/20 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Update</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateProblem;