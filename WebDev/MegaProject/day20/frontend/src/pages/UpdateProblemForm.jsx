import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosConfig";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import {
  Plus,
  Minus,
  Code,
  FileText,
  Settings,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import Editor, { loader } from "@monaco-editor/react";

// ---------------------- MONACO THEME ----------------------
loader.init().then((monaco) => {
  monaco.editor.defineTheme("bright-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#2b2f40",
      "editor.lineHighlightBackground": "#3a3d4e",
      "editorCursor.foreground": "#ffcc00",
    },
  });
});

// ---------------------- SCHEMA ----------------------
const problemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  tags: z.enum([
    "Array",
    "Maths",
    "Stack",
    "Graph",
    "BFS",
    "Queue",
    "Linked List",
    "String",
    "Dynamic Programming",
  ]),
  visibleTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
        explanation: z.string().min(1, "Explanation is required"),
      })
    )
    .min(1, "At least one visible test case required"),
  hiddenTestCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one hidden test case required"),
  boilerCode: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "Javascript"]),
        code: z.string().min(1, "Initial code is required"),
      })
    )
    .length(3, "All three languages required"),
  referenceSolution: z
    .array(
      z.object({
        language: z.enum(["C++", "Java", "Javascript"]),
        completeCode: z.string().min(1, "Reference solution is required"),
      })
    )
    .length(3, "All three languages required"),
});

// ---------------------- COMPONENT ----------------------
const UpdateProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      difficulty: "Easy",
      tags: "Array",
      visibleTestCases: [{ input: "", output: "", explanation: "" }],
      hiddenTestCases: [{ input: "", output: "" }],
      boilerCode: [
        { language: "C++", code: "" },
        { language: "Java", code: "" },
        { language: "Javascript", code: "" },
      ],
      referenceSolution: [
        { language: "C++", completeCode: "" },
        { language: "Java", completeCode: "" },
        { language: "Javascript", completeCode: "" },
      ],
    },
  });

  const {
    fields: visibleFields,
    append: appendVisible,
    remove: removeVisible,
  } = useFieldArray({
    control,
    name: "visibleTestCases",
  });

  const {
    fields: hiddenFields,
    append: appendHidden,
    remove: removeHidden,
  } = useFieldArray({
    control,
    name: "hiddenTestCases",
  });

  // Fetch problem data
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/id/${id}`);
        const problem = response.data;
        
        // Reset form with fetched data
        reset({
          title: problem.title || "",
          description: problem.description || "",
          difficulty: problem.difficulty || "Easy",
          tags: problem.tags || "Array",
          visibleTestCases: problem.visibleTestCases || [{ input: "", output: "", explanation: "" }],
          hiddenTestCases: problem.hiddenTestCases || [{ input: "", output: "" }],
          boilerCode: problem.boilerCode || [
            { language: "C++", code: "" },
            { language: "Java", code: "" },
            { language: "Javascript", code: "" },
          ],
          referenceSolution: problem.referenceSolution || [
            { language: "C++", completeCode: "" },
            { language: "Java", completeCode: "" },
            { language: "Javascript", completeCode: "" },
          ],
        });
      } catch (err) {
        setError("Failed to fetch problem data: " + (err.response?.data || err.message));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProblem();
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      setError(null);
      setSuccess(false);
      
      await axiosClient.patch(`/problem/update/${id}`, data);
      setSuccess(true);
      
      // Redirect to admin panel after successful update
      setTimeout(() => {
        navigate("/admin/update-problem");
      }, 2000);
    } catch (err) {
      setError("Failed to update problem: " + (err.response?.data || err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
          <p className="text-zinc-300">Loading problem data...</p>
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
                onClick={() => navigate("/admin/update-problem")}
                className="flex items-center space-x-2 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Update Problems</span>
              </button>
              <div className="h-6 w-px bg-zinc-600"></div>
              <h1 className="text-xl font-bold text-zinc-100">Update Problem</h1>
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
            <span className="text-green-400">Problem updated successfully! Redirecting...</span>
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
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Settings className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Problem Title
                </label>
                <input
                  {...register("title")}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                  placeholder="Enter problem title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Difficulty
                </label>
                <select
                  {...register("difficulty")}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-400">{errors.difficulty.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Tags
                </label>
                <select
                  {...register("tags")}
                  className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                >
                  <option value="Array">Array</option>
                  <option value="Maths">Maths</option>
                  <option value="Stack">Stack</option>
                  <option value="Graph">Graph</option>
                  <option value="BFS">BFS</option>
                  <option value="Queue">Queue</option>
                  <option value="Linked List">Linked List</option>
                  <option value="String">String</option>
                  <option value="Dynamic Programming">Dynamic Programming</option>
                </select>
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-400">{errors.tags.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={6}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                placeholder="Enter problem description"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
              )}
            </div>
          </motion.div>

          {/* Visible Test Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-semibold">Visible Test Cases</h2>
              </div>
              <button
                type="button"
                onClick={() => appendVisible({ input: "", output: "", explanation: "" })}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Test Case</span>
              </button>
            </div>

            {visibleFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 bg-zinc-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Test Case {index + 1}</h3>
                  {visibleFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVisible(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Input
                    </label>
                    <textarea
                      {...register(`visibleTestCases.${index}.input`)}
                      rows={3}
                      className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                      placeholder="Test input"
                    />
                    {errors.visibleTestCases?.[index]?.input && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.visibleTestCases[index].input.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Output
                    </label>
                    <textarea
                      {...register(`visibleTestCases.${index}.output`)}
                      rows={3}
                      className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                      placeholder="Expected output"
                    />
                    {errors.visibleTestCases?.[index]?.output && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.visibleTestCases[index].output.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Explanation
                    </label>
                    <textarea
                      {...register(`visibleTestCases.${index}.explanation`)}
                      rows={3}
                      className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                      placeholder="Test case explanation"
                    />
                    {errors.visibleTestCases?.[index]?.explanation && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.visibleTestCases[index].explanation.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {errors.visibleTestCases && (
              <p className="text-sm text-red-400">{errors.visibleTestCases.message}</p>
            )}
          </motion.div>

          {/* Hidden Test Cases */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-amber-500" />
                <h2 className="text-xl font-semibold">Hidden Test Cases</h2>
              </div>
              <button
                type="button"
                onClick={() => appendHidden({ input: "", output: "" })}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Test Case</span>
              </button>
            </div>

            {hiddenFields.map((field, index) => (
              <div key={field.id} className="mb-6 p-4 bg-zinc-700 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium">Hidden Test Case {index + 1}</h3>
                  {hiddenFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeHidden(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Input
                    </label>
                    <textarea
                      {...register(`hiddenTestCases.${index}.input`)}
                      rows={3}
                      className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                      placeholder="Test input"
                    />
                    {errors.hiddenTestCases?.[index]?.input && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.hiddenTestCases[index].input.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-300 mb-2">
                      Output
                    </label>
                    <textarea
                      {...register(`hiddenTestCases.${index}.output`)}
                      rows={3}
                      className="w-full px-3 py-2 bg-zinc-600 border border-zinc-500 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent text-zinc-100"
                      placeholder="Expected output"
                    />
                    {errors.hiddenTestCases?.[index]?.output && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.hiddenTestCases[index].output.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {errors.hiddenTestCases && (
              <p className="text-sm text-red-400">{errors.hiddenTestCases.message}</p>
            )}
          </motion.div>

          {/* Boiler Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold">Boiler Code</h2>
            </div>

            <div className="space-y-6">
              {["C++", "Java", "Javascript"].map((language, index) => (
                <div key={language} className="bg-zinc-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">{language}</h3>
                  <Controller
                    name={`boilerCode.${index}.code`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="200px"
                        language={language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase()}
                        theme="bright-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                  {errors.boilerCode?.[index]?.code && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.boilerCode[index].code.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {errors.boilerCode && (
              <p className="mt-4 text-sm text-red-400">{errors.boilerCode.message}</p>
            )}
          </motion.div>

          {/* Reference Solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
          >
            <div className="flex items-center space-x-3 mb-6">
              <CheckCircle className="w-6 h-6 text-amber-500" />
              <h2 className="text-xl font-semibold">Reference Solution</h2>
            </div>

            <div className="space-y-6">
              {["C++", "Java", "Javascript"].map((language, index) => (
                <div key={language} className="bg-zinc-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-4">{language}</h3>
                  <Controller
                    name={`referenceSolution.${index}.completeCode`}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        height="300px"
                        language={language.toLowerCase() === "c++" ? "cpp" : language.toLowerCase()}
                        theme="bright-dark"
                        value={field.value}
                        onChange={field.onChange}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          roundedSelection: false,
                          scrollBeyondLastLine: false,
                          automaticLayout: true,
                        }}
                      />
                    )}
                  />
                  {errors.referenceSolution?.[index]?.completeCode && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.referenceSolution[index].completeCode.message}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {errors.referenceSolution && (
              <p className="mt-4 text-sm text-red-400">{errors.referenceSolution.message}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex justify-end space-x-4"
          >
            <button
              type="button"
              onClick={() => navigate("/admin/update-problem")}
              className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-amber-800 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Update Problem</span>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProblemForm;
