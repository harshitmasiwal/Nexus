import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../utils/axiosConfig";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  Code,
  FileText,
  Settings,
  Zap,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Editor, { loader } from "@monaco-editor/react";

// ---------------------- MONACO THEME ----------------------
loader.init().then((monaco) => {
  monaco.editor.defineTheme("bright-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#2b2f40", // brighter than default vs-dark
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
const CreateProblem = () => {
  const {
    register,
    control,
    handleSubmit,
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

  const { fields: visibleFields, append: appendVisible, remove: removeVisible } =
    useFieldArray({ control, name: "visibleTestCases" });

  const { fields: hiddenFields, append: appendHidden, remove: removeHidden } =
    useFieldArray({ control, name: "hiddenTestCases" });

  const onSubmit = async (data) => {
    try {
      console.log(data)
      const response = await axiosClient.post("/problem/create", data);
      console.log(response)
      alert("Problem created successfully!");
    } catch (error) {
      alert(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

  const tagOptions = [
    "Array",
    "Maths",
    "Stack",
    "Graph",
    "BFS",
    "Queue",
    "Linked List",
    "String",
    "Dynamic Programming",
  ];

  const languageMap = {
    0: "C++",
    1: "Java",
    2: "Javascript",
  };

  const monacoLanguage = {
    "C++": "cpp",
    Java: "java",
    Javascript: "javascript",
  };

  // ---------------------- MOBILE CHECK ----------------------
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 1024) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-900 text-white text-center px-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">⚠️ Desktop Mode Required</h1>
          <p className="text-zinc-400">
            This page is best experienced on a desktop or laptop.  
            Please switch to desktop mode or use a larger device.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Create Problem
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Design challenging coding problems with comprehensive test cases and
            solutions.
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
          {/* Problem Details Section */}
          <SectionCard
            title="Problem Details"
            icon={<FileText className="text-blue-400" />}
            delay={0.1}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <InputField
                name="title"
                label="Problem Title"
                errors={errors}
                register={register}
                placeholder="e.g., Two Sum Problem"
                className="lg:col-span-2"
              />
              <SelectField
                name="difficulty"
                label="Difficulty Level"
                errors={errors}
                register={register}
                options={["Easy", "Medium", "Hard"]}
              />
            </div>

            <div className="mb-6">
              <SelectField
                name="tags"
                label="Problem Category"
                errors={errors}
                register={register}
                options={tagOptions}
              />
            </div>

            <TextAreaField
              name="description"
              label="Problem Description"
              errors={errors}
              register={register}
              placeholder="Provide a detailed problem description with examples..."
              rows={6}
            />
          </SectionCard>

          {/* Test Cases Section */}
          <SectionCard
            title="Test Cases"
            icon={<Zap className="text-purple-400" />}
            delay={0.2}
          >
            <div className="space-y-8">
              <CaseBlock
                title="Visible Test Cases"
                subtitle="These will be shown to users"
                fields={visibleFields}
                append={() =>
                  appendVisible({ input: "", output: "", explanation: "" })
                }
                remove={removeVisible}
                register={register}
                errors={errors.visibleTestCases}
                withExplanation
                fieldNamePrefix="visibleTestCases"
              />

              <CaseBlock
                title="Hidden Test Cases"
                subtitle="For evaluation only"
                fields={hiddenFields}
                append={() => appendHidden({ input: "", output: "" })}
                remove={removeHidden}
                register={register}
                errors={errors.hiddenTestCases}
                fieldNamePrefix="hiddenTestCases"
              />
            </div>
          </SectionCard>

          {/* Code Templates Section */}
          <SectionCard
            title="Code Templates & Solutions"
            icon={<Code className="text-green-400" />}
            delay={0.3}
          >
            <div className="space-y-8">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="bg-zinc-800/30 backdrop-blur-md rounded-xl border border-zinc-700/50 p-6 hover:border-zinc-600/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Settings size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {languageMap[index]}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Initial Code Template
                      </label>
                      <Controller
                        name={`boilerCode.${index}.code`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="200px"
                            defaultLanguage={monacoLanguage[languageMap[index]]}
                            theme="bright-dark"
                            value={field.value}
                            onChange={(val) => field.onChange(val || "")}
                            options={{
                              fontSize: 14,
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                            }}
                          />
                        )}
                      />
                      {errors.boilerCode?.[index]?.code && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.boilerCode[index]?.code?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        Reference Solution
                      </label>
                      <Controller
                        name={`referenceSolution.${index}.completeCode`}
                        control={control}
                        render={({ field }) => (
                          <Editor
                            height="300px"
                            defaultLanguage={monacoLanguage[languageMap[index]]}
                            theme="bright-dark"
                            value={field.value}
                            onChange={(val) => field.onChange(val || "")}
                            options={{
                              fontSize: 14,
                              minimap: { enabled: false },
                              scrollBeyondLastLine: false,
                            }}
                          />
                        )}
                      />
                      {errors.referenceSolution?.[index]?.completeCode && (
                        <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.referenceSolution[index]?.completeCode?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionCard>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex justify-center pt-8"
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative px-12 py-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-zinc-950 font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full animate-spin" />
                    Creating Problem...
                  </>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Create Problem
                  </>
                )}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

// ---------------------- HELPER COMPONENTS ----------------------
const SectionCard = ({ title, icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-zinc-800/30 backdrop-blur-md rounded-2xl border border-zinc-700/50 p-8 hover:border-zinc-600/50 transition-all duration-300"
  >
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-zinc-600/50">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const InputField = ({ name, label, errors, register, placeholder, className = "" }) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-zinc-300">{label}</label>
    <input
      {...register(name)}
      type="text"
      placeholder={placeholder}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
    />
    {errors[name] && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle size={14} />
        {errors[name].message}
      </p>
    )}
  </div>
);

const SelectField = ({ name, label, errors, register, options }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-zinc-300">{label}</label>
    <select
      {...register(name)}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200"
    >
      {options.map((option) => (
        <option key={option} value={option} className="bg-zinc-800">
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </option>
      ))}
    </select>
    {errors[name] && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle size={14} />
        {errors[name].message}
      </p>
    )}
  </div>
);

const TextAreaField = ({ name, label, errors, register, placeholder, rows = 4 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-zinc-300">{label}</label>
    <textarea
      {...register(name)}
      placeholder={placeholder}
      rows={rows}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-200 resize-none"
    />
    {errors[name] && (
      <p className="text-red-400 text-sm flex items-center gap-1">
        <AlertCircle size={14} />
        {errors[name].message}
      </p>
    )}
  </div>
);

const CaseBlock = ({
  title,
  subtitle,
  fields,
  append,
  remove,
  register,
  errors,
  withExplanation = false,
  fieldNamePrefix,
}) => (
  <div className="bg-zinc-800/30 backdrop-blur-md rounded-xl p-6 border border-zinc-700/50">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
        <p className="text-sm text-zinc-400">{subtitle}</p>
      </div>
      <button
        type="button"
        onClick={append}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-medium transition-colors duration-200"
      >
        <Plus size={16} />
        Add Case
      </button>
    </div>

    {errors && (
      <p className="text-red-400 text-sm mb-4 flex items-center gap-1">
        <AlertCircle size={14} />
        {errors.message}
      </p>
    )}

    <div className="space-y-4">
      {fields.map((field, index) => (
        <motion.div
          key={field.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-700/50"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-zinc-300">
              Test Case {index + 1}
            </span>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded transition-colors duration-200"
              >
                <Minus size={16} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Input
              </label>
              <input
                {...register(`${fieldNamePrefix}.${index}.input`)}
                placeholder="Test input..."
                className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded text-white text-sm focus:ring-1 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Expected Output
              </label>
              <input
                {...register(`${fieldNamePrefix}.${index}.output`)}
                placeholder="Expected output..."
                className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded text-white text-sm focus:ring-1 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </div>

          {withExplanation && (
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Explanation
              </label>
              <textarea
                {...register(`${fieldNamePrefix}.${index}.explanation`)}
                placeholder="Explain the solution approach..."
                rows={2}
                className="w-full px-3 py-2 bg-zinc-900/50 border border-zinc-700 rounded text-white text-sm focus:ring-1 focus:ring-amber-400 focus:border-transparent resize-none"
              />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

export default CreateProblem;
