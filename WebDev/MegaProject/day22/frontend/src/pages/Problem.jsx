import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ChevronDown,
  BookOpen,
  Terminal,
  CheckCircle,
  XCircle,
  FileText,
  FlaskConical,
  History,
  GripVertical,
  GripHorizontal,
  MessageCircle,
  PanelLeft,
  PanelRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
} from "lucide-react";

import MonacoEditor from "@monaco-editor/react";
import axiosClient from "../utils/axiosConfig";
import { useParams } from "react-router";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import AIChat from "../components/AIChat";
import Submissions from "../components/Submissions";
import PartyAnimation from "../components/PartyAnimation";

// Difficulty Pill Component
const DifficultyPill = ({ difficulty }) => {
  let colorClass = "bg-zinc-700 text-zinc-300";
  if (difficulty === "Easy")
    colorClass = "bg-green-700/80 text-green-100 border border-green-500/30";
  if (difficulty === "Medium")
    colorClass = "bg-yellow-700/80 text-yellow-100 border border-yellow-500/30";
  if (difficulty === "Hard")
    colorClass = "bg-red-700/80 text-red-100 border border-red-500/30";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium shadow-lg transition-all duration-300 hover:scale-105 ${colorClass}`}
    >
      {difficulty}
    </span>
  );
};

// Test Case Display Component
const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
  <div
    className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-[1.02] ${
      isActive
        ? "bg-zinc-700/80 border-l-4 border-yellow-500 shadow-xl shadow-yellow-500/10 backdrop-blur-sm"
        : "bg-zinc-800/60 hover:bg-zinc-700/60 backdrop-blur-sm"
    }`}
    onClick={() => onClick(index)}
  >
    <div className="flex justify-between items-center">
      <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
      <ChevronDown
        className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${
          isActive ? "rotate-180" : ""
        }`}
      />
    </div>
    {isActive && (
      <div className="mt-4 space-y-3 text-sm animate-in slide-in-from-top-2 duration-300">
        <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-700/50">
          <p className="text-zinc-400 font-mono text-xs mb-1">Input:</p>
          <pre className="text-white whitespace-pre-wrap break-all font-mono text-sm">
            {testCase.input}
          </pre>
        </div>
        <div className="p-3 bg-zinc-900/80 rounded-lg border border-zinc-700/50">
          <p className="text-zinc-400 font-mono text-xs mb-1">Output:</p>
          <pre className="text-white whitespace-pre-wrap break-all font-mono text-sm">
            {testCase.output}
          </pre>
        </div>
        {testCase.explanation && (
          <div className="p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
            <p className="text-zinc-400">
              <span className="font-semibold text-blue-300">Explanation:</span>{" "}
              {testCase.explanation}
            </p>
          </div>
        )}
      </div>
    )}
  </div>
);

// Helper to map display language names to Monaco Editor identifiers
const getMonacoLanguage = (lang) => {
  if (!lang) return "javascript";
  const lower = lang.toLowerCase();
  if (lower.includes("c++")) return "cpp";
  if (lower.includes("java")) return "java";
  return lower; // defaults to 'javascript' or similar
};

// Main Problem Component
const Problem = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [activeRightTab, setActiveRightTab] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("Javascript");
  const [code, setCode] = useState("");
  const [editorialData, setEditorialData] = useState(null);
  const [editorialNotFound, setEditorialNotFound] = useState(false);
  const [result, setResult] = useState(null);
  const [runStatus, setRunStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [executionSummary, setExecutionSummary] = useState(null);
  const [showAIChat, setShowAIChat] = useState(false);
  const [activeTestCaseTab, setActiveTestCaseTab] = useState(0);
  const [abortController, setAbortController] = useState(null);
  const lastRequestTime = useRef(0);
  const requestId = useRef(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [buttonDisableTimer, setButtonDisableTimer] = useState(0);

  // Use refs to manage panel state programmatically
  const leftPanelRef = useRef(null);
  const consolePanelRef = useRef(null);
  const [isLeftPanelExpanded, setIsLeftPanelExpanded] = useState(true);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showPartyAnimation, setShowPartyAnimation] = useState(false);

  // New function to toggle panel state
  const toggleLeftPanel = () => {
    const newExpandedState = !isLeftPanelExpanded;
    setIsLeftPanelExpanded(newExpandedState);
    if (leftPanelRef.current) {
      // Collapse: save current size and set to 0
      if (!newExpandedState) {
        leftPanelRef.current.collapse();
      } else {
        // Expand: restore to default size (e.g., 40)
        leftPanelRef.current.expand();
      }
    }
  };

  const toggleConsole = () => {
    const newExpandedState = !isConsoleExpanded;
    setIsConsoleExpanded(newExpandedState);
    if (consolePanelRef.current) {
      if (!newExpandedState) {
        consolePanelRef.current.collapse();
      } else {
        consolePanelRef.current.expand();
      }
    }
  };

  const fetchEditorialData = async (editorial) => {
    try {
      // console.log(editorial)
      const response = await axiosClient.get(`/video/editorial/${editorial}`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching editorial data:", error);
      // Throw an error or return null/a default structure on failure
      throw new Error("Failed to load editorial. Access might be restricted.");
    }
  };

  function base64ToText(base64) {
    try {
      if (!base64) return "";

      const decoded = atob(base64);
      const nonPrintableCount = (
        decoded.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g) || []
      ).length;
      const totalLength = decoded.length;

      if (totalLength > 0 && nonPrintableCount / totalLength > 0.3) {
        return "[Binary output - cannot display as text]";
      }

      return decoded;
    } catch (error) {
      return "[Invalid output format]";
    }
  }

  const cancelOngoingRequest = () => {
    if (abortController) {
      // console.log('Cancelling previous request');
      abortController.abort();
      setAbortController(null);
    }
  };

  const disableButtonsFor5Seconds = () => {
    setButtonsDisabled(true);
    setButtonDisableTimer(5);

    const interval = setInterval(() => {
      setButtonDisableTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setButtonsDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      cancelOngoingRequest();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);

      if (width < 768) {
        setIsLeftPanelExpanded(false);
        setIsConsoleExpanded(false);
      } else {
        setIsLeftPanelExpanded(true);
        setIsConsoleExpanded(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // console.log(editorialData)

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axiosClient.get(`/problem/id/${id}`);
        const problemData = response.data;
        setProblem(problemData);
        try {
          const editorial = await fetchEditorialData(problemData.editorial);
          setEditorialData(editorial);
          setEditorialNotFound(false)
        } catch (editorialError) {
          // This is expected if the user hasn't solved it or if no editorial exists
          console.warn(
            "Editorial not available or restricted:",
            editorialError.message
          );
          setEditorialData(null); // Explicitly set null to show "Not available" message
          setEditorialNotFound(true)
        }

        const initialLangName =
          problemData.boilerCode?.[0]?.language || "Javascript";
        setSelectedLanguage(initialLangName);

        const initialCode =
          problemData.boilerCode?.find((b) => b.language === initialLangName)
            ?.code || "";
        setCode(initialCode);
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, [id]);

  // console.log(problem)
  useEffect(() => {
    if (result && result.testCases && result.testCases.length > 0) {
      setActiveTestCaseTab(0);
    }
  }, [result]);

  const handleLanguageChange = useCallback(
    (lang) => {
      setSelectedLanguage(lang);
      const newBoiler = problem?.boilerCode?.find((b) => b.language === lang);
      if (newBoiler) setCode(newBoiler.code);
    },
    [problem]
  );

  const handleRunCode = async () => {
    if (!problem || isSubmitting) {
      return;
    }
    const now = Date.now();
    if (now - lastRequestTime.current < 500) {
      return;
    }
    lastRequestTime.current = now;
    disableButtonsFor5Seconds();
    cancelOngoingRequest();
    await new Promise((resolve) => setTimeout(resolve, 100));

    setRunStatus("running");
    setIsSubmitting(true);
    setActiveLeftTab("description");
    setResult(null);

    const controller = new AbortController();
    setAbortController(controller);
    const currentRequestId = ++requestId.current;

    const payload = {
      code: code,
      language: selectedLanguage,
    };

    try {
      const response = await axiosClient.post(
        `/submit/problem/run/${id}`,
        payload,
        {
          signal: controller.signal,
        }
      );
      const data = response.data;

      if (currentRequestId !== requestId.current) {
        return;
      }

      if (data && typeof data === "object" && data !== null) {
        setResult(data);
      } else {
        throw new Error(
          `Invalid response format from server. Received: ${typeof data}`
        );
      }

      setExecutionSummary({
        testCasesPassed: data.testCasesPassed,
        testCaseTotal: data.testCaseTotal,
        runtime: data.runtime,
        memory: data.memory,
        status: data.status,
        errorMessage: data.errorMessage,
      });

      setRunStatus(data.status === "accepted" ? "success" : "error");
    } catch (error) {
      if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
        return;
      }
      setRunStatus("error");
      const errorData = {
        status: "error",
        errorMessage:
          error.response?.data?.errorMessage ||
          error.response?.data?.error ||
          `Request failed. Check network or server status: ${error.message}`,
        testCasesPassed: 0,
        runtime: 0,
        memory: 0,
      };
      setResult(errorData);
      setExecutionSummary({
        testCasesPassed: 0,
        testCaseTotal: 0,
        runtime: 0,
        memory: 0,
        status: "error",
        errorMessage: errorData.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
      setAbortController(null);
    }
  };

  const handleSubmitCode = async () => {
    if (!problem || isSubmitting) {
      return;
    }
    const now = Date.now();
    if (now - lastRequestTime.current < 500) {
      return;
    }
    lastRequestTime.current = now;
    disableButtonsFor5Seconds();
    cancelOngoingRequest();
    await new Promise((resolve) => setTimeout(resolve, 100));

    setRunStatus("running");
    setIsSubmitting(true);
    setActiveLeftTab("description");

    const controller = new AbortController();
    setAbortController(controller);
    const currentRequestId = ++requestId.current;

    const payload = {
      code: code,
      language: selectedLanguage,
    };

    try {
      const response = await axiosClient.post(
        `/submit/problem/${id}`,
        payload,
        {
          signal: controller.signal,
        }
      );
      const data = response.data;

      if (currentRequestId !== requestId.current) {
        return;
      }

      if (data && typeof data === "object" && data !== null) {
        setResult(data);
      } else {
        throw new Error(
          `Invalid response format from server. Received: ${typeof data}`
        );
      }

      setExecutionSummary({
        testCasesPassed: data.testCasesPassed,
        testCaseTotal: data.testCaseTotal,
        runtime: data.runtime,
        memory: data.memory,
        status: data.status,
        errorMessage: data.errorMessage,
      });

      setRunStatus(data.status === "accepted" ? "success" : "error");

      // Trigger party animation on successful submission
      if (data.status === "accepted") {
        console.log("🎉 Submission accepted! Triggering party animation...");
        setShowPartyAnimation(true);
      }
    } catch (error) {
      if (error.name === "AbortError" || error.code === "ERR_CANCELED") {
        return;
      }
      setRunStatus("error");
      const errorData = {
        status: "error",
        errorMessage:
          error.response?.data?.errorMessage ||
          error.response?.data?.error ||
          `Submission API failed. Check connectivity or endpoint: ${error.message}`,
        testCasesPassed: 0,
        runtime: 0,
        memory: 0,
      };
      setResult(errorData);
      setExecutionSummary({
        testCasesPassed: 0,
        testCaseTotal: 0,
        runtime: 0,
        memory: 0,
        status: "error",
        errorMessage: errorData.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
      setAbortController(null);
    }
  };

  const renderResultContent = () => {
    if (isSubmitting) {
      return (
        <div className="bg-zinc-800/60 rounded-md p-3">
          <pre className="text-xs font-mono text-zinc-300 text-center">
            {runStatus === "running"
              ? "Processing submission..."
              : "Loading..."}
          </pre>
        </div>
      );
    }

    if (!result) {
      return (
        <div className="bg-zinc-800/60 rounded-md p-3">
          <pre className="text-xs font-mono text-zinc-300 text-center">
            Click "Run Code" to test your solution or "Submit" to finalize.
          </pre>
        </div>
      );
    }

    const hasTestCases = result.testCases && result.testCases.length > 0;

    if (!hasTestCases) {
      return (
        <div className="bg-zinc-800/60 rounded-md p-3">
          <pre className="text-xs font-mono text-zinc-300 text-center">
            No test case results available.
          </pre>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div className="flex space-x-1 bg-zinc-800/50 rounded-md p-1">
          {result.testCases.map((testCase, index) => {
            const isPassed = testCase.status_id === 3;
            const isActive = index === activeTestCaseTab;

            return (
              <button
                key={index}
                onClick={() => setActiveTestCaseTab(index)}
                className={`flex-1 px-2 py-1 text-xs font-medium rounded transition-all duration-200 ${
                  isActive
                    ? "bg-yellow-500 text-zinc-900 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700/50"
                }`}
              >
                <div className="flex items-center justify-center space-x-1">
                  <span className="text-xs">TC {index + 1}</span>
                  <span
                    className={`text-xs ${
                      isPassed ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isPassed ? "✓" : "✗"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {result.testCases.map((testCase, index) => {
          const isPassed = testCase.status_id === 3;
          const isActive = index === activeTestCaseTab;

          if (!isActive) return null;

          return (
            <div
              key={index}
              className="bg-zinc-800/60 rounded-md p-2 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-zinc-200">
                  Test Case {index + 1}
                </h4>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${
                    isPassed
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {isPassed ? "✓ Passed" : "✗ Failed"}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="bg-zinc-900/40 rounded p-2">
                  <div className="text-zinc-400 text-xs mb-1">Input:</div>
                  <pre className="text-zinc-200 font-mono text-xs whitespace-pre-wrap break-all leading-tight">
                    {testCase.stdin}
                  </pre>
                </div>

                <div className="bg-zinc-900/40 rounded p-2">
                  <div className="text-zinc-400 text-xs mb-1">Expected:</div>
                  <pre className="text-zinc-200 font-mono text-xs whitespace-pre-wrap break-all leading-tight">
                    {testCase.expected_output}
                  </pre>
                </div>

                <div className="bg-zinc-900/40 rounded p-2">
                  <div className="text-zinc-400 text-xs mb-1">Output:</div>
                  <pre className="text-zinc-200 font-mono text-xs whitespace-pre-wrap break-all leading-tight">
                    {base64ToText(testCase.stdout) || "No output"}
                  </pre>
                </div>

                {testCase.stderr && (
                  <div className="bg-red-900/20 border border-red-500/30 rounded p-2">
                    <div className="text-red-400 text-xs mb-1">Error:</div>
                    <pre className="text-red-300 font-mono text-xs whitespace-pre-wrap break-all">
                      {base64ToText(testCase.stderr)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!problem) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <span className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></span>
      </div>
    );
  }

  const tabs = [
    { key: "description", name: "Description", icon: BookOpen },
    { key: "editorial", name: "Editorial", icon: FileText },
    { key: "solutions", name: "Solutions", icon: FlaskConical },
    { key: "submissions", name: "Submissions", icon: History },
  ];

  return (
    <div
      className={`font-sans antialiased text-zinc-100 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex h-screen overflow-hidden ${
        isMobile ? "flex-col" : ""
      }`}
    >
      {/* Party Animation */}
      <PartyAnimation
        isVisible={showPartyAnimation}
        onComplete={() => setShowPartyAnimation(false)}
      />

      {/* Show/Hide Left Panel Button when collapsed */}
      {!isLeftPanelExpanded && (
        <button
          onClick={toggleLeftPanel}
          className="fixed top-4 left-4 z-50 p-3 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-300 hover:text-white rounded-lg shadow-lg backdrop-blur-sm border border-zinc-700/50 transition-all duration-200 group hover:scale-105"
          title="Show left panel"
        >
          <PanelLeft className="w-5 h-5 group-hover:scale-110" />
        </button>
      )}

      {/* Show/Hide Console Button when collapsed */}
      {!isConsoleExpanded && (
        <button
          onClick={toggleConsole}
          className="fixed bottom-4 right-4 z-50 p-3 bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-300 hover:text-white rounded-lg shadow-lg backdrop-blur-sm border border-zinc-700/50 transition-all duration-200"
          title="Show console"
        >
          <Terminal className="w-5 h-5" />
        </button>
      )}

      <PanelGroup direction={isMobile ? "vertical" : "horizontal"}>
        {/* Left Panel - Problem Details */}
        <Panel
          ref={leftPanelRef}
          defaultSize={45}
          minSize={isMobile ? 0 : 30}
          maxSize={isMobile ? 100 : 70}
          className={`flex flex-col transition-all duration-300 ease-in-out bg-zinc-900/50 backdrop-blur-sm ${
            !isLeftPanelExpanded && "hidden"
          }`}
          // onCollapse={() => setIsLeftPanelExpanded(false)} // This is a good pattern for other use cases, but with refs and toggles, it's not needed here
          // onExpand={() => setIsLeftPanelExpanded(true)}
        >
          <div className="flex-shrink-0 flex items-center justify-between border-b border-zinc-700/50 bg-zinc-800/80 backdrop-blur-lg">
            <div className="flex items-center px-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveLeftTab(tab.key)}
                    className={`px-2 mr-1 py-2 flex items-center space-x-1.5 font-medium text-sm transition-all duration-300 ease-in-out relative group rounded-md
                                        ${
                                          activeLeftTab === tab.key
                                            ? "text-white bg-yellow-500/20 border border-yellow-500/30 shadow-lg shadow-yellow-500/10"
                                            : "text-zinc-400 hover:bg-zinc-700/50 hover:text-zinc-200"
                                        }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform duration-300 ${
                        activeLeftTab === tab.key
                          ? "scale-110"
                          : "group-hover:scale-105"
                      }`}
                    />
                    <span className="transition-all duration-300 text-xs">
                      {tab.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <button
              onClick={toggleLeftPanel}
              className="py-2 m-2 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-all duration-200 group"
              title={
                isLeftPanelExpanded
                  ? "Collapse left panel"
                  : "Expand left panel"
              }
            >
              <ChevronLeft
                className={`w-5 h-5 transition-transform duration-200 ${
                  isLeftPanelExpanded ? "rotate-0" : "rotate-180"
                } group-hover:scale-110`}
              />
            </button>
          </div>
          <div className="flex-grow p-6 overflow-y-auto left-panel-scrollbar bg-gradient-to-b from-transparent to-zinc-900/20">
            {executionSummary && (
              <div className="mb-6 p-4 bg-gradient-to-r from-zinc-800/90 to-zinc-700/80 backdrop-blur-sm rounded-lg border border-zinc-700/50 shadow-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">
                    Execution Summary
                  </h3>
                  <div
                    className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                      executionSummary.status === "accepted"
                        ? "bg-green-600/20 text-green-400 border border-green-500/30"
                        : "bg-red-600/20 text-red-400 border border-red-500/30"
                    }`}
                  >
                    {executionSummary.status === "accepted"
                      ? "✓ Passed"
                      : "✗ Failed"}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Test Cases:</span>
                    <span
                      className={`font-medium px-2 py-1 rounded ${
                        executionSummary.status === "accepted"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {executionSummary.testCasesPassed}/
                      {executionSummary.testCaseTotal}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Runtime:</span>
                    <span className="text-zinc-200 font-medium bg-zinc-700/50 px-2 py-1 rounded">
                      {executionSummary.runtime
                        ? `${executionSummary.runtime}s`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Memory:</span>
                    <span className="text-zinc-200 font-medium bg-zinc-700/50 px-2 py-1 rounded">
                      {executionSummary.memory
                        ? `${executionSummary.memory} KB`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">Status:</span>
                    <span
                      className={`font-medium px-2 py-1 rounded ${
                        executionSummary.status === "accepted"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {executionSummary.status === "accepted"
                        ? "Passed"
                        : "Failed"}
                    </span>
                  </div>
                </div>
                {executionSummary.errorMessage && (
                  <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 font-medium text-sm">
                        Error Details:
                      </span>
                    </div>
                    <div className="text-xs text-red-300 font-mono whitespace-pre-wrap break-all">
                      {executionSummary.errorMessage}
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeLeftTab === "description" && (
              <div className="space-y-6 animate-in fade-in duration-500">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  {problem.title}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <DifficultyPill difficulty={problem.difficulty} />
                  {problem.tags &&
                    problem.tags.split(",").map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-blue-900/60 text-blue-300 font-medium border border-blue-500/30 shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                </div>
                <div className="prose prose-invert max-w-none">
                  <p
                    className="text-zinc-300 leading-relaxed whitespace-pre-wrap text-lg"
                    dangerouslySetInnerHTML={{
                      __html: problem.description.replace(/\n/g, "<br/>"),
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-white border-b border-zinc-700/50 pb-2 flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></span>
                  Examples
                </h3>
                <div className="space-y-3">
                  {problem.visibleTestCases &&
                    problem.visibleTestCases.map((tc, idx) => (
                      <TestCaseDisplay
                        key={tc._id || idx}
                        testCase={tc}
                        index={idx}
                        isActive={idx === activeRightTab}
                        onClick={() =>
                          setActiveRightTab(idx === activeRightTab ? -1 : idx)
                        }
                      />
                    ))}
                </div>
              </div>
            )}
            {activeLeftTab === 'editorial' && (
    <div className="animate-in fade-in duration-500">
        
        {/* CASE 1: EDITORIAL IS NOT FOUND (OR FAILED TO LOAD) */}
        {editorialNotFound && (
            <div className="p-6 text-center text-zinc-400 border border-zinc-700/50 rounded-lg bg-zinc-800/50">
                <FileText className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
                <p className="text-lg font-semibold text-white mb-1">Editorial Not Available</p>
                <p className="text-sm text-zinc-400">
                    The official editorial for this problem has not been published yet.
                </p>
            </div>
        )}

        {/* CASE 2: EDITORIAL IS PRESENT AND LOADED */}
        {!editorialNotFound && editorialData && ( 
            <div className="prose max-w-none text-zinc-300">
                <h2 className="text-2xl font-extrabold mb-6 border-b border-zinc-700 pb-2 text-white">
                    Editorial: {editorialData.editorial.title} {/* Adjusted to use editorialData directly */}
                </h2>

                {/* Video Section */}
                {editorialData.editorial.videoUrl && (
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold mb-3 text-zinc-100">Video Explanation </h3>
                        <video 
                            controls 
                            src={editorialData.editorial.videoUrl} 
                            className="w-full max-h-[500px] rounded-lg shadow-xl bg-black"
                        >
                            Your browser does not support the video tag.
                        </video>
                        <p className="text-sm text-zinc-500 mt-2">
                            Video Length: {Math.round(editorialData.editorial.videoLength)}s
                        </p>
                    </div>
                )}

                {/* Text Explanation */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-3 text-zinc-100">Detailed Explanation 📖</h3>
                    <p className="whitespace-pre-wrap leading-relaxed text-zinc-300">
                        {editorialData.editorial.explanation}
                    </p>
                </div>

                {/* Stats/Metadata Section */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 border-t border-zinc-700 pt-4">
                    <span>❤️ **Likes:** {editorialData.editorial.likes}</span>
                    <span>👀 **Views:** {editorialData.editorial.views}</span>
                    <span>✍️ **Author ID:** {editorialData.editorial.author}</span>
                    <span>🗓️ **Created:** {new Date(editorialData.editorial.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        )}
        
        {/* CASE 3: LOADING (This should only appear briefly if fetch takes time) */}
        {!editorialNotFound && !editorialData && (
             <div className="flex items-center justify-center p-6 text-zinc-400">
                <span className="animate-spin h-5 w-5 border-2 border-yellow-500 border-t-transparent rounded-full mr-3"></span>
                <span>Loading Editorial...</span>
            </div>
        )}
    </div>
)}
            {activeLeftTab === "solutions" && problem && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Solutions</h2>
                {problem.referenceSolution?.length > 0 ? (
                  problem.referenceSolution.map((solution, index) => (
                    <div
                      key={index}
                      className="border border-zinc-700 rounded-lg overflow-hidden"
                    >
                      <div className="bg-zinc-800 px-4 py-2">
                        <h3 className="font-semibold text-lg">
                          {problem.title} - {solution.language}
                        </h3>
                      </div>
                      <div className="p-4 bg-zinc-900">
                        <MonacoEditor
                          height="300px"
                          language={getMonacoLanguage(solution.language)}
                          theme="vs-dark"
                          value={solution.completeCode}
                          options={{
                            readOnly: true,
                            minimap: { enabled: false },
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
                    Solutions will be available after you solve the problem.
                  </div>
                )}
              </div>
            )}
            {activeLeftTab === "submissions" && <Submissions />}
          </div>
        </Panel>

        {/* Horizontal Resize Handle - Only show when left panel is visible */}
        {isLeftPanelExpanded && (
          <PanelResizeHandle className="flex items-center justify-center w-2 bg-gradient-to-b from-zinc-700 to-zinc-600 hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 cursor-col-resize group">
            <GripVertical className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
          </PanelResizeHandle>
        )}

        {/* Right Panel - Editor & Console */}
        <Panel
          defaultSize={isMobile ? 60 : 60}
          minSize={30}
          maxSize={100}
          className="flex flex-col transition-all duration-300 ease-in-out bg-zinc-900/50 backdrop-blur-sm"
        >
          <div className="flex-shrink-0 flex items-center justify-between p-3 px-10 border-b border-zinc-700/50 bg-zinc-800/80 backdrop-blur-lg">
            {/* Language Selector */}
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="block bg-zinc-700/80 border border-zinc-600/50 text-white py-2 px-4 pr-8 rounded-lg shadow-lg hover:bg-zinc-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500"
            >
              {problem.boilerCode.map((b) => (
                <option key={b.language} value={b.language}>
                  {b.language}
                </option>
              ))}
            </select>
            <div className="space-x-3">
              <button
                onClick={handleRunCode}
                disabled={isSubmitting || buttonsDisabled}
                className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting || buttonsDisabled
                    ? "bg-zinc-600 cursor-not-allowed"
                    : "bg-yellow-600 hover:bg-yellow-500 hover:shadow-yellow-500/25"
                }`}
              >
                {buttonsDisabled
                  ? `Run Code (${buttonDisableTimer}s)`
                  : "Run Code"}
              </button>
              <button
                onClick={handleSubmitCode}
                disabled={isSubmitting || buttonsDisabled}
                className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 ${
                  isSubmitting || buttonsDisabled
                    ? "bg-zinc-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-500 hover:shadow-green-500/25"
                }`}
              >
                {buttonsDisabled ? `Submit (${buttonDisableTimer}s)` : "Submit"}
              </button>
            </div>
          </div>

          {/* Monaco Editor / Console Split */}
          <PanelGroup direction="vertical">
            <Panel
              minSize={10}
              maxSize={80}
              className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out"
            >
              <div className="flex-grow">
                <MonacoEditor
                  height="100%"
                  language={getMonacoLanguage(selectedLanguage)}
                  theme="vs-dark"
                  value={code}
                  onChange={(val) => setCode(val)}
                  options={{
                    minimap: { enabled: false },
                    automaticLayout: true,
                    fontSize: 14,
                  }}
                />
              </div>
            </Panel>

            {/* Vertical Resize Handle */}
            <PanelResizeHandle className="flex items-center justify-center h-2 bg-gradient-to-r from-zinc-700 to-zinc-600 hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300 cursor-row-resize group">
              <GripHorizontal className="h-5 w-5 text-zinc-400 group-hover:text-white transition-colors duration-300" />
            </PanelResizeHandle>

            <Panel
              ref={consolePanelRef}
              defaultSize={25}
              minSize={isMobile ? 0 : 10}
              maxSize={isMobile ? 100 : 40}
              className={`flex-shrink-0 bg-zinc-800/80 backdrop-blur-lg border-t border-zinc-700/50 transition-all duration-300 ease-in-out flex flex-col ${
                !isConsoleExpanded && "hidden"
              }`}
            >
              {/* Console Header - Fixed */}
              <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700/50">
                <div className="flex items-center space-x-2">
                  <Terminal className="w-4 h-4 text-yellow-500" />
                  <h3 className="font-semibold text-white text-sm">Console</h3>
                  {runStatus && (
                    <div
                      className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        runStatus === "success"
                          ? "bg-green-600 text-white shadow-lg shadow-green-500/25"
                          : runStatus === "error"
                          ? "bg-red-600 text-white shadow-lg shadow-red-500/25"
                          : "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      }`}
                    >
                      {runStatus === "success" && (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {runStatus === "error" && <XCircle className="w-3 h-3" />}
                      {runStatus === "running" && (
                        <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
                      )}
                      <span>
                        {runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleConsole}
                  className="p-1 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded transition-all duration-200 group"
                  title={
                    isConsoleExpanded ? "Collapse console" : "Expand console"
                  }
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isConsoleExpanded ? "rotate-0" : "rotate-180"
                    } group-hover:scale-110`}
                  />
                </button>
              </div>

              {/* Console Content - Scrollable */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                {isSubmitting && runStatus === "running" ? (
                  <div className="flex items-center space-x-2 text-zinc-300">
                    <span className="animate-spin h-4 w-4 border-2 border-yellow-500 border-t-transparent rounded-full"></span>
                    <pre className="text-xs font-mono whitespace-pre-wrap break-all">
                      Executing your code...
                    </pre>
                  </div>
                ) : (
                  renderResultContent()
                )}
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>

      <AIChat problem={problem} />
    </div>
  );
};

export default Problem;
