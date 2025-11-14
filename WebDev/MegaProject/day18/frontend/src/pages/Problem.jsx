
// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// // // // // import MonacoEditor from '@monaco-editor/react';
// // // // // import axiosClient from '../utils/axiosConfig';
// // // // // import { useParams } from 'react-router';
// // // // // import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // // // // // Difficulty Pill Component
// // // // // const DifficultyPill = ({ difficulty }) => {
// // // // //     let colorClass = 'bg-zinc-700 text-zinc-300';
// // // // //     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
// // // // //     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
// // // // //     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

// // // // //     return (
// // // // //         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
// // // // //             {difficulty}
// // // // //         </span>
// // // // //     );
// // // // // };

// // // // // // Test Case Display Component
// // // // // const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
// // // // //     <div
// // // // //         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
// // // // //             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
// // // // //         }`}
// // // // //         onClick={() => onClick(index)}
// // // // //     >
// // // // //         <div className="flex justify-between items-center">
// // // // //             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
// // // // //             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
// // // // //         </div>
// // // // //         {isActive && (
// // // // //             <div className="mt-3 space-y-2 text-sm">
// // // // //                 <div className="p-2 bg-zinc-900 rounded">
// // // // //                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
// // // // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
// // // // //                 </div>
// // // // //                 <div className="p-2 bg-zinc-900 rounded">
// // // // //                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
// // // // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
// // // // //                 </div>
// // // // //                 {testCase.explanation && (
// // // // //                     <p className="text-zinc-400 mt-2">
// // // // //                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
// // // // //                     </p>
// // // // //                 )}
// // // // //             </div>
// // // // //         )}
// // // // //     </div>
// // // // // );

// // // // // // Main Problem Component
// // // // // const Problem = () => {
// // // // //     const { id } = useParams();
// // // // //     const [problem, setProblem] = useState(null);
// // // // //     const [activeTab, setActiveTab] = useState('description');
// // // // //     const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
// // // // //     const [code, setCode] = useState('');
// // // // //     const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
// // // // //     const [consoleOutput, setConsoleOutput] = useState('');
// // // // //     const [runStatus, setRunStatus] = useState(null);
// // // // //     const [isSubmitting, setIsSubmitting] = useState(false);

// // // // //     // Fetch problem data from API
// // // // //     useEffect(() => {
// // // // //         const fetchProblem = async () => {
// // // // //             try {
// // // // //                 const response = await axiosClient.get(`/problem/id/${id}`);
// // // // //                 setProblem(response.data);

// // // // //                 if (response.data.boilerCode?.length > 0) {
// // // // //                     setSelectedLanguage(response.data.boilerCode[0].language);
// // // // //                     setCode(response.data.boilerCode[0].code);
// // // // //                 }
// // // // //             } catch (error) {
// // // // //                 console.error('Error fetching problem:', error);
// // // // //             }
// // // // //         };
// // // // //         fetchProblem();
// // // // //     }, [id]);

// // // // //     const handleLanguageChange = useCallback((lang) => {
// // // // //         setSelectedLanguage(lang);
// // // // //         const newBoiler = problem.boilerCode.find(b => b.language === lang);
// // // // //         if (newBoiler) setCode(newBoiler.code);
// // // // //     }, [problem]);

// // // // //     const handleSubmitCode = async(data) => {

// // // // //         try{
// // // // //             const response = await axiosClient.post(`localhost:4000/submit/problem${id}`,data)
// // // // //             console.log(response.data)
// // // // //         }
// // // // //         catch(error){
// // // // //             console.log("error " + error)
// // // // //         }

// // // // //         if (!problem) return;
// // // // //         setRunStatus('running');
// // // // //         setConsoleOutput('');
// // // // //         setIsSubmitting(true);

// // // // //         setTimeout(() => {
// // // // //             const currentTest = problem.visibleTestCases[activeTestCaseIndex];
// // // // //             const isCorrect = activeTestCaseIndex === 0; // Mock: first test passes

// // // // //             if (isCorrect) {
// // // // //                 setRunStatus('success');
// // // // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Passed!\nInput:\n${currentTest.input}\nOutput: ${currentTest.output}`);
// // // // //             } else {
// // // // //                 setRunStatus('error');
// // // // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Failed!\nInput:\n${currentTest.input}\nExpected: ${currentTest.output}\nYour Output: [9,1]`);
// // // // //             }
// // // // //             setIsSubmitting(false);
// // // // //         }, 1200);
// // // // //     };

// // // // //     if (!problem) {
// // // // //         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
// // // // //     }

// // // // //     const tabs = [
// // // // //         { key: 'description', name: 'Description', icon: BookOpen },
// // // // //         { key: 'editorial', name: 'Editorial', icon: FileText },
// // // // //         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
// // // // //         { key: 'submissions', name: 'Submissions', icon: History },
// // // // //     ];

// // // // //     return (
// // // // //         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
// // // // //             <PanelGroup direction="horizontal">
// // // // //                 {/* Left Panel */}
// // // // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col">
// // // // //                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
// // // // //                         {tabs.map(tab => {
// // // // //                             const Icon = tab.icon;
// // // // //                             return (
// // // // //                                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// // // // //                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
// // // // //                                     ${activeTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
// // // // //                                     <Icon className="w-5 h-5" />
// // // // //                                     <span>{tab.name}</span>
// // // // //                                 </button>
// // // // //                             );
// // // // //                         })}
// // // // //                     </div>
// // // // //                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
// // // // //                         {activeTab === 'description' && (
// // // // //                             <div className="space-y-6">
// // // // //                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
// // // // //                                 <div className="flex items-center gap-3">
// // // // //                                     <DifficultyPill difficulty={problem.difficulty} />
// // // // //                                     {problem.tags.split(',').map((tag, i) => (
// // // // //                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
// // // // //                                     ))}
// // // // //                                 </div>
// // // // //                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
// // // // //                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
// // // // //                                 <div className="space-y-3">
// // // // //                                     {problem.visibleTestCases.map((tc, idx) => (
// // // // //                                         <TestCaseDisplay
// // // // //                                             key={tc._id}
// // // // //                                             testCase={tc}
// // // // //                                             index={idx}
// // // // //                                             isActive={activeTestCaseIndex === idx}
// // // // //                                             onClick={() => setActiveTestCaseIndex(idx === activeTestCaseIndex ? -1 : idx)}
// // // // //                                         />
// // // // //                                     ))}
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                         )}
// // // // //                         {activeTab !== 'description' && (
// // // // //                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">Content for {activeTab} tab placeholder.</div>
// // // // //                         )}
// // // // //                     </div>
// // // // //                 </Panel>

// // // // //                 {/* Horizontal Resize Handle */}
// // // // //                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
// // // // //                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // // // //                 </PanelResizeHandle>

// // // // //                 {/* Right Panel */}
// // // // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col">
// // // // //                     <PanelGroup direction="vertical">
// // // // //                         {/* Editor */}
// // // // //                         <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col">
// // // // //                             <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
// // // // //                                 <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
// // // // //                                     className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
// // // // //                                     {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
// // // // //                                 </select>
// // // // //                                 <div className="space-x-3">
// // // // //                                     <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
// // // // //                                     <button onClick={handleRunCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
// // // // //                                 </div>
// // // // //                             </div>
// // // // //                             <div className="flex-grow">
// // // // //                                 <MonacoEditor
// // // // //                                     height="100%"
// // // // //                                     language={selectedLanguage.toLowerCase()}
// // // // //                                     theme="vs-dark"
// // // // //                                     value={code}
// // // // //                                     onChange={(val) => setCode(val)}
// // // // //                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
// // // // //                                 />
// // // // //                             </div>
// // // // //                         </Panel>

// // // // //                         {/* Vertical Resize Handle */}
// // // // //                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
// // // // //                             <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // // // //                         </PanelResizeHandle>

// // // // //                         {/* Console */}
// // // // //                         <Panel defaultSize={20} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar">
// // // // //                             <div className="flex items-center space-x-2 mb-2">
// // // // //                                 <Terminal className="w-5 h-5 text-yellow-500" />
// // // // //                                 <h3 className="font-semibold text-white">Console</h3>
// // // // //                                 {runStatus && (
// // // // //                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
// // // // //                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
// // // // //                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
// // // // //                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
// // // // //                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                             <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
// // // // //                                 {isSubmitting && runStatus === 'running' ? 'Executing your code...' : consoleOutput || 'Click "Run Code" to test your solution.'}
// // // // //                             </pre>
// // // // //                         </Panel>
// // // // //                     </PanelGroup>
// // // // //                 </Panel>
// // // // //             </PanelGroup>
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default Problem;



// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// // // // import MonacoEditor from '@monaco-editor/react';
// // // // import axiosClient from '../utils/axiosConfig';
// // // // import { useParams } from 'react-router';
// // // // import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // // // // Difficulty Pill Component
// // // // const DifficultyPill = ({ difficulty }) => {
// // // //     let colorClass = 'bg-zinc-700 text-zinc-300';
// // // //     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
// // // //     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
// // // //     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

// // // //     return (
// // // //         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
// // // //             {difficulty}
// // // //         </span>
// // // //     );
// // // // };

// // // // // Test Case Display Component
// // // // const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
// // // //     <div
// // // //         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
// // // //             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
// // // //         }`}
// // // //         onClick={() => onClick(index)}
// // // //     >
// // // //         <div className="flex justify-between items-center">
// // // //             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
// // // //             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
// // // //         </div>
// // // //         {isActive && (
// // // //             <div className="mt-3 space-y-2 text-sm">
// // // //                 <div className="p-2 bg-zinc-900 rounded">
// // // //                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
// // // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
// // // //                 </div>
// // // //                 <div className="p-2 bg-zinc-900 rounded">
// // // //                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
// // // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
// // // //                 </div>
// // // //                 {testCase.explanation && (
// // // //                     <p className="text-zinc-400 mt-2">
// // // //                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
// // // //                     </p>
// // // //                 )}
// // // //             </div>
// // // //         )}
// // // //     </div>
// // // // );

// // // // // Main Problem Component
// // // // const Problem = () => {
// // // //     const { id } = useParams();
// // // //     const [problem, setProblem] = useState(null);
// // // //     const [activeTab, setActiveTab] = useState('description');
// // // //     const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
// // // //     const [code, setCode] = useState('');
// // // //     const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
// // // //     const [consoleOutput, setConsoleOutput] = useState('');
// // // //     const [runStatus, setRunStatus] = useState(null);
// // // //     const [isSubmitting, setIsSubmitting] = useState(false);

// // // //     // Fetch problem data from API
// // // //     useEffect(() => {
// // // //         const fetchProblem = async () => {
// // // //             try {
// // // //                 const response = await axiosClient.get(`/problem/id/${id}`);
// // // //                 setProblem(response.data);

// // // //                 if (response.data.boilerCode?.length > 0) {
// // // //                     setSelectedLanguage(response.data.boilerCode[0].language);
// // // //                     setCode(response.data.boilerCode[0].code);
// // // //                 }
// // // //             } catch (error) {
// // // //                 console.error('Error fetching problem:', error);
// // // //             }
// // // //         };
// // // //         fetchProblem();
// // // //     }, [id]);

// // // //     const handleLanguageChange = useCallback((lang) => {
// // // //         setSelectedLanguage(lang);
// // // //         const newBoiler = problem.boilerCode.find(b => b.language === lang);
// // // //         if (newBoiler) setCode(newBoiler.code);
// // // //     }, [problem]);

// // // //     const handleRunCode = () => {
// // // //         if (!problem || activeTestCaseIndex === -1) {
// // // //             setConsoleOutput('Please select an example test case to run.');
// // // //             setRunStatus('error');
// // // //             return;
// // // //         }
        
// // // //         setRunStatus('running');
// // // //         setConsoleOutput('Executing your code...');
// // // //         setIsSubmitting(true);

// // // //         // Simulate API call for running a single test case
// // // //         setTimeout(() => {
// // // //             const currentTest = problem.visibleTestCases[activeTestCaseIndex];
// // // //             // Mocking a successful or failed run
// // // //             const isCorrect = activeTestCaseIndex === 0;

// // // //             if (isCorrect) {
// // // //                 setRunStatus('success');
// // // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Passed! 🎉\n\nInput:\n${currentTest.input}\n\nExpected Output: ${currentTest.output}\nYour Output: ${currentTest.output}`);
// // // //             } else {
// // // //                 setRunStatus('error');
// // // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Failed! ❌\n\nInput:\n${currentTest.input}\n\nExpected Output: ${currentTest.output}\nYour Output: [9,1]`);
// // // //             }
// // // //             setIsSubmitting(false);
// // // //         }, 1200);
// // // //     };

// // // //     const handleSubmitCode = () => {
// // // //         if (!problem) return;

// // // //         setRunStatus('running');
// // // //         setConsoleOutput('Submitting your solution...');
// // // //         setIsSubmitting(true);

// // // //         // Simulate API call for submitting the solution against all test cases
// // // //         setTimeout(() => {
// // // //             const passedCount = 3;
// // // //             const totalCount = 5;
// // // //             const status = passedCount === totalCount ? 'success' : 'error';

// // // //             setRunStatus(status);
// // // //             if (status === 'success') {
// // // //                 setConsoleOutput(`All ${totalCount} test cases passed! ✅\n\nYour solution has been accepted.`);
// // // //             } else {
// // // //                 setConsoleOutput(`${passedCount} / ${totalCount} test cases passed. ❌\n\nTest Case 4 failed: Wrong Answer\nInput: [3,3]\nExpected: [0,1]\nYour Output: [1,1]\n\nSee submissions for more details.`);
// // // //             }
// // // //             setIsSubmitting(false);
// // // //         }, 2000);
// // // //     };

// // // //     if (!problem) {
// // // //         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
// // // //     }

// // // //     const tabs = [
// // // //         { key: 'description', name: 'Description', icon: BookOpen },
// // // //         { key: 'editorial', name: 'Editorial', icon: FileText },
// // // //         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
// // // //         { key: 'submissions', name: 'Submissions', icon: History },
// // // //     ];

// // // //     return (
// // // //         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
// // // //             <PanelGroup direction="horizontal">
// // // //                 {/* Left Panel */}
// // // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// // // //                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
// // // //                         {tabs.map(tab => {
// // // //                             const Icon = tab.icon;
// // // //                             return (
// // // //                                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// // // //                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
// // // //                                     ${activeTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
// // // //                                     <Icon className="w-5 h-5" />
// // // //                                     <span>{tab.name}</span>
// // // //                                 </button>
// // // //                             );
// // // //                         })}
// // // //                     </div>
// // // //                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
// // // //                         {activeTab === 'description' && (
// // // //                             <div className="space-y-6">
// // // //                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
// // // //                                 <div className="flex items-center gap-3">
// // // //                                     <DifficultyPill difficulty={problem.difficulty} />
// // // //                                     {problem.tags.split(',').map((tag, i) => (
// // // //                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
// // // //                                     ))}
// // // //                                 </div>
// // // //                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
// // // //                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
// // // //                                 <div className="space-y-3">
// // // //                                     {problem.visibleTestCases.map((tc, idx) => (
// // // //                                         <TestCaseDisplay
// // // //                                             key={tc._id}
// // // //                                             testCase={tc}
// // // //                                             index={idx}
// // // //                                             isActive={activeTestCaseIndex === idx}
// // // //                                             onClick={() => setActiveTestCaseIndex(idx === activeTestCaseIndex ? -1 : idx)}
// // // //                                         />
// // // //                                     ))}
// // // //                                 </div>
// // // //                             </div>
// // // //                         )}
// // // //                         {activeTab !== 'description' && (
// // // //                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">Content for {activeTab} tab placeholder.</div>
// // // //                         )}
// // // //                     </div>
// // // //                 </Panel>

// // // //                 {/* Horizontal Resize Handle */}
// // // //                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
// // // //                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // // //                 </PanelResizeHandle>

// // // //                 {/* Right Panel */}
// // // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// // // //                     <PanelGroup direction="vertical">
// // // //                         {/* Editor */}
// // // //                         <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
// // // //                             <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
// // // //                                 <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
// // // //                                     className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
// // // //                                     {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
// // // //                                 </select>
// // // //                                 <div className="space-x-3">
// // // //                                     <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
// // // //                                     <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
// // // //                                 </div>
// // // //                             </div>
// // // //                             <div className="flex-grow">
// // // //                                 <MonacoEditor
// // // //                                     height="100%"
// // // //                                     language={selectedLanguage.toLowerCase()}
// // // //                                     theme="vs-dark"
// // // //                                     value={code}
// // // //                                     onChange={(val) => setCode(val)}
// // // //                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
// // // //                                 />
// // // //                             </div>
// // // //                         </Panel>

// // // //                         {/* Vertical Resize Handle */}
// // // //                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
// // // //                             <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // // //                         </PanelResizeHandle>

// // // //                         {/* Console */}
// // // //                         <Panel defaultSize={20} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
// // // //                             <div className="flex items-center space-x-2 mb-2">
// // // //                                 <Terminal className="w-5 h-5 text-yellow-500" />
// // // //                                 <h3 className="font-semibold text-white">Console</h3>
// // // //                                 {runStatus && (
// // // //                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
// // // //                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
// // // //                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
// // // //                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
// // // //                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                             <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
// // // //                                 {isSubmitting && runStatus === 'running' ? 'Executing your code...' : consoleOutput || 'Click "Run Code" to test your solution or "Submit" to finalize.'}
// // // //                             </pre>
// // // //                         </Panel>
// // // //                     </PanelGroup>
// // // //                 </Panel>
// // // //             </PanelGroup>
// // // //         </div>
// // // //     );
// // // // };

// // // // export default Problem;


// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// // // import MonacoEditor from '@monaco-editor/react';
// // // // Assuming axiosClient is configured to handle the base URL and authentication
// // // import axiosClient from '../utils/axiosConfig'; 
// // // import { useParams } from 'react-router';
// // // import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // // // Difficulty Pill Component
// // // const DifficultyPill = ({ difficulty }) => {
// // //     let colorClass = 'bg-zinc-700 text-zinc-300';
// // //     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
// // //     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
// // //     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

// // //     return (
// // //         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
// // //             {difficulty}
// // //         </span>
// // //     );
// // // };

// // // // Test Case Display Component
// // // const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
// // //     <div
// // //         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
// // //             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
// // //         }`}
// // //         onClick={() => onClick(index)}
// // //     >
// // //         <div className="flex justify-between items-center">
// // //             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
// // //             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
// // //         </div>
// // //         {isActive && (
// // //             <div className="mt-3 space-y-2 text-sm">
// // //                 <div className="p-2 bg-zinc-900 rounded">
// // //                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
// // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
// // //                 </div>
// // //                 <div className="p-2 bg-zinc-900 rounded">
// // //                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
// // //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
// // //                 </div>
// // //                 {testCase.explanation && (
// // //                     <p className="text-zinc-400 mt-2">
// // //                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
// // //                     </p>
// // //                 )}
// // //             </div>
// // //         )}
// // //     </div>
// // // );

// // // // Main Problem Component
// // // const Problem = () => {
// // //     const { id } = useParams();
// // //     const [problem, setProblem] = useState(null);
// // //     const [activeTab, setActiveTab] = useState('description');
// // //     const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
// // //     const [code, setCode] = useState('');
// // //     const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
// // //     const [consoleOutput, setConsoleOutput] = useState('');
// // //     const [runStatus, setRunStatus] = useState(null);
// // //     const [isSubmitting, setIsSubmitting] = useState(false);

// // //     // Fetch problem data from API
// // //     useEffect(() => {
// // //         const fetchProblem = async () => {
// // //             try {
// // //                 // Assuming problem fetch is from a standard endpoint like /problem/id/123
// // //                 const response = await axiosClient.get(`/problem/id/${id}`);
// // //                 setProblem(response.data);

// // //                 if (response.data.boilerCode?.length > 0) {
// // //                     setSelectedLanguage(response.data.boilerCode[0].language);
// // //                     setCode(response.data.boilerCode[0].code);
// // //                 }
// // //             } catch (error) {
// // //                 console.error('Error fetching problem:', error);
// // //             }
// // //         };
// // //         fetchProblem();
// // //     }, [id]);

// // //     const handleLanguageChange = useCallback((lang) => {
// // //         setSelectedLanguage(lang);
// // //         const newBoiler = problem.boilerCode.find(b => b.language === lang);
// // //         if (newBoiler) setCode(newBoiler.code);
// // //     }, [problem]);

// // //     // Function to handle running code against a single visible test case
// // //     const handleRunCode = async () => {
// // //         if (!problem || activeTestCaseIndex === -1) {
// // //             setConsoleOutput('Please select an example test case to run.');
// // //             setRunStatus('error');
// // //             return;
// // //         }

// // //         setRunStatus('running');
// // //         setConsoleOutput('Executing your code against the selected test case...');
// // //         setIsSubmitting(true);
        
// // //         const currentTest = problem.visibleTestCases[activeTestCaseIndex];

// // //         const payload = {
// // //             problemId: id,
// // //             language: selectedLanguage,
// // //             code: code,
// // //             // Send the specific input for the active test case to the runner API
// // //             input: currentTest.input 
// // //         };

// // //         try {
// // //             // NOTE: Replace '/api/run' with your actual code runner endpoint
// // //             const response = await axiosClient.post(`/api/run`, payload);
// // //             const data = response.data;

// // //             // Assuming your run API returns an object with result status, expected, and actual output
// // //             if (data.status === 'PASS') {
// // //                 setRunStatus('success');
// // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Passed! 🎉\n\nInput:\n${data.input || currentTest.input}\n\nExpected Output: ${data.expectedOutput}\nYour Output: ${data.actualOutput}`);
// // //             } else {
// // //                 setRunStatus('error');
// // //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Failed! ❌\n\nInput:\n${data.input || currentTest.input}\n\nExpected Output: ${data.expectedOutput}\nYour Output: ${data.actualOutput}`);
// // //             }

// // //         } catch (error) {
// // //             setRunStatus('error');
// // //             const errorMsg = error.response?.data?.error || `Request failed. Check network or server status: ${error.message}`;
// // //             setConsoleOutput(`Runtime Error or API Failure:\n${errorMsg}`);
// // //         } finally {
// // //             setIsSubmitting(false);
// // //         }
// // //     };

// // //     // Function to handle submitting code against all hidden test cases
// // //     const handleSubmitCode = async () => {
// // //         if (!problem) return;

// // //         setRunStatus('running');
// // //         setConsoleOutput('Submitting your solution against all test cases...');
// // //         setIsSubmitting(true);

// // //         const payload = {
// // //             problemId: id,
// // //             language: selectedLanguage,
// // //             code: code,
// // //         };

// // //         try {
// // //             // NOTE: Replace '/api/submit' with your actual submission endpoint
// // //             const response = await axiosClient.post(`/submit/problem/${id}`, payload);
// // //             const data = response.data;

// // //             // Assuming submit API returns overall status and details
// // //             if (data.status === 'Accepted') {
// // //                 setRunStatus('success');
// // //                 setConsoleOutput(`Solution Accepted! ✅\n\nAll ${data.totalTests} test cases passed. Excellent work!`);
// // //             } else {
// // //                 setRunStatus('error');
// // //                 setConsoleOutput(`Submission Failed: ${data.status} ❌\n\nPassed: ${data.passedTests}/${data.totalTests} tests.\n\nFailure Details (Test Case ${data.failureDetails?.testCaseNumber}): ${data.failureDetails?.reason}`);
// // //             }

// // //         } catch (error) {
// // //             setRunStatus('error');
// // //             const errorMsg = error.response?.data?.error || `Submission API failed. Check connectivity or endpoint: ${error.message}`;
// // //             setConsoleOutput(`API Submission Failure:\n${errorMsg}`);
// // //         } finally {
// // //             setIsSubmitting(false);
// // //         }
// // //     };

// // //     if (!problem) {
// // //         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
// // //     }

// // //     const tabs = [
// // //         { key: 'description', name: 'Description', icon: BookOpen },
// // //         { key: 'editorial', name: 'Editorial', icon: FileText },
// // //         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
// // //         { key: 'submissions', name: 'Submissions', icon: History },
// // //     ];

// // //     return (
// // //         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
// // //             <PanelGroup direction="horizontal">
// // //                 {/* Left Panel */}
// // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// // //                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
// // //                         {tabs.map(tab => {
// // //                             const Icon = tab.icon;
// // //                             return (
// // //                                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// // //                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
// // //                                     ${activeTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
// // //                                     <Icon className="w-5 h-5" />
// // //                                     <span>{tab.name}</span>
// // //                                 </button>
// // //                             );
// // //                         })}
// // //                     </div>
// // //                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
// // //                         {activeTab === 'description' && (
// // //                             <div className="space-y-6">
// // //                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
// // //                                 <div className="flex items-center gap-3">
// // //                                     <DifficultyPill difficulty={problem.difficulty} />
// // //                                     {problem.tags.split(',').map((tag, i) => (
// // //                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
// // //                                     ))}
// // //                                 </div>
// // //                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
// // //                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
// // //                                 <div className="space-y-3">
// // //                                     {problem.visibleTestCases.map((tc, idx) => (
// // //                                         <TestCaseDisplay
// // //                                             key={tc._id}
// // //                                             testCase={tc}
// // //                                             index={idx}
// // //                                             isActive={activeTestCaseIndex === idx}
// // //                                             onClick={() => setActiveTestCaseIndex(idx === activeTestCaseIndex ? -1 : idx)}
// // //                                         />
// // //                                     ))}
// // //                                 </div>
// // //                             </div>
// // //                         )}
// // //                         {activeTab !== 'description' && (
// // //                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">Content for {activeTab} tab placeholder.</div>
// // //                         )}
// // //                     </div>
// // //                 </Panel>

// // //                 {/* Horizontal Resize Handle */}
// // //                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
// // //                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // //                 </PanelResizeHandle>

// // //                 {/* Right Panel */}
// // //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// // //                     <PanelGroup direction="vertical">
// // //                         {/* Editor */}
// // //                         <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
// // //                             <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
// // //                                 <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
// // //                                     className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
// // //                                     {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
// // //                                 </select>
// // //                                 <div className="space-x-3">
// // //                                     <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
// // //                                     <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
// // //                                 </div>
// // //                             </div>
// // //                             <div className="flex-grow">
// // //                                 <MonacoEditor
// // //                                     height="100%"
// // //                                     language={selectedLanguage.toLowerCase()}
// // //                                     theme="vs-dark"
// // //                                     value={code}
// // //                                     onChange={(val) => setCode(val)}
// // //                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
// // //                                 />
// // //                             </div>
// // //                         </Panel>

// // //                         {/* Vertical Resize Handle */}
// // //                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
// // //                             <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// // //                         </PanelResizeHandle>

// // //                         {/* Console */}
// // //                         <Panel defaultSize={20} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
// // //                             <div className="flex items-center space-x-2 mb-2">
// // //                                 <Terminal className="w-5 h-5 text-yellow-500" />
// // //                                 <h3 className="font-semibold text-white">Console</h3>
// // //                                 {runStatus && (
// // //                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
// // //                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
// // //                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
// // //                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
// // //                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                             <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
// // //                                 {isSubmitting && runStatus === 'running' ? 'Executing your code...' : consoleOutput || 'Click "Run Code" to test your solution or "Submit" to finalize.'}
// // //                             </pre>
// // //                         </Panel>
// // //                     </PanelGroup>
// // //                 </Panel>
// // //             </PanelGroup>
// // //         </div>
// // //     );
// // // };

// // // export default Problem;



// // import React, { useState, useEffect, useCallback } from 'react';
// // import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// // import MonacoEditor from '@monaco-editor/react';
// // import axiosClient from '../utils/axiosConfig'; 
// // import { useParams } from 'react-router';
// // import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // // Difficulty Pill Component
// // const DifficultyPill = ({ difficulty }) => {
// //     let colorClass = 'bg-zinc-700 text-zinc-300';
// //     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
// //     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
// //     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

// //     return (
// //         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
// //             {difficulty}
// //         </span>
// //     );
// // };

// // // Test Case Display Component
// // const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
// //     <div
// //         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
// //             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
// //         }`}
// //         onClick={() => onClick(index)}
// //     >
// //         <div className="flex justify-between items-center">
// //             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
// //             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
// //         </div>
// //         {isActive && (
// //             <div className="mt-3 space-y-2 text-sm">
// //                 <div className="p-2 bg-zinc-900 rounded">
// //                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
// //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
// //                 </div>
// //                 <div className="p-2 bg-zinc-900 rounded">
// //                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
// //                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
// //                 </div>
// //                 {testCase.explanation && (
// //                     <p className="text-zinc-400 mt-2">
// //                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
// //                     </p>
// //                 )}
// //             </div>
// //         )}
// //     </div>
// // );

// // // Main Problem Component
// // const Problem = () => {
// //     const { id } = useParams();
// //     const [problem, setProblem] = useState(null);
// //     const [activeTab, setActiveTab] = useState('description');
// //     const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
// //     const [code, setCode] = useState('');
// //     const [activeTestCaseIndex, setActiveTestCaseIndex] = useState(0);
// //     const [consoleOutput, setConsoleOutput] = useState('');
// //     const [runStatus, setRunStatus] = useState(null);
// //     const [isSubmitting, setIsSubmitting] = useState(false);

// //     // Fetch problem data from API
// //     useEffect(() => {
// //         const fetchProblem = async () => {
// //             try {
// //                 const response = await axiosClient.get(`/problem/id/${id}`);
// //                 setProblem(response.data);

// //                 if (response.data.boilerCode?.length > 0) {
// //                     setSelectedLanguage(response.data.boilerCode[0].language);
// //                     setCode(response.data.boilerCode[0].code);
// //                 }
// //             } catch (error) {
// //                 console.error('Error fetching problem:', error);
// //             }
// //         };
// //         fetchProblem();
// //     }, [id]);

// //     const handleLanguageChange = useCallback((lang) => {
// //         setSelectedLanguage(lang);
// //         const newBoiler = problem.boilerCode.find(b => b.language === lang);
// //         if (newBoiler) setCode(newBoiler.code);
// //     }, [problem]);

// //     // Function to handle running code against a single visible test case
// //     const handleRunCode = async () => {
// //         if (!problem || activeTestCaseIndex === -1) {
// //             setConsoleOutput('Please select an example test case to run.');
// //             setRunStatus('error');
// //             return;
// //         }

// //         setRunStatus('running');
// //         setConsoleOutput('Executing your code against the selected test case...');
// //         setIsSubmitting(true);
        
// //         const currentTest = problem.visibleTestCases[activeTestCaseIndex];

// //         const payload = {
// //             problemId: id,
// //             language: selectedLanguage,
// //             code: code,
// //             input: currentTest.input 
// //         };

// //         try {
// //             // NOTE: Replace '/api/run' with your actual code runner endpoint
// //             const response = await axiosClient.post(`/api/run`, payload);
// //             const data = response.data;

// //             if (data.status === 'PASS') {
// //                 setRunStatus('success');
// //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Passed! 🎉\n\nInput:\n${data.input || currentTest.input}\n\nExpected Output: ${data.expectedOutput}\nYour Output: ${data.actualOutput}`);
// //             } else {
// //                 setRunStatus('error');
// //                 setConsoleOutput(`Test Case ${activeTestCaseIndex + 1} Failed! ❌\n\nInput:\n${data.input || currentTest.input}\n\nExpected Output: ${data.expectedOutput}\nYour Output: ${data.actualOutput}`);
// //             }

// //         } catch (error) {
// //             setRunStatus('error');
// //             const errorMsg = error.response?.data?.error || `Request failed. Check network or server status: ${error.message}`;
// //             setConsoleOutput(`Runtime Error or API Failure:\n${errorMsg}`);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     // Function to handle submitting code against all hidden test cases
// //     const handleSubmitCode = async () => {
// //         if (!problem) return;

// //         setRunStatus('running');
// //         setConsoleOutput('Submitting your solution against all test cases...');
// //         setIsSubmitting(true);

// //         const payload = {
// //             problemId: id,
// //             language: selectedLanguage,
// //             code: code,
// //         };

// //         try {
// //             // NOTE: Replace '/api/submit' with your actual submission endpoint
// //             const response = await axiosClient.post(`/submit/problem/${id}`, payload);
// //             const data = response.data;

// //             // Handle the new API response format
// //             if (data.status === 'accepted') {
// //                 setRunStatus('success');
// //                 setConsoleOutput(`Solution Accepted! ✅\n\nTest cases passed: ${data.testCasesPassed}\nMemory: ${data.memory} KB\nRuntime: ${data.runtime} s`);
// //             } else {
// //                 setRunStatus('error');
// //                 const errorMessage = data.errorMessage || `Submission Failed with status: ${data.status}`;
// //                 setConsoleOutput(`Submission Failed ❌\n\nStatus: ${data.status.toUpperCase()}\n\nDetails:\n${errorMessage}`);
// //             }

// //         } catch (error) {
// //             setRunStatus('error');
// //             const errorMsg = error.response?.data?.error || `Submission API failed. Check connectivity or endpoint: ${error.message}`;
// //             setConsoleOutput(`API Submission Failure:\n${errorMsg}`);
// //         } finally {
// //             setIsSubmitting(false);
// //         }
// //     };

// //     if (!problem) {
// //         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>;
// //     }

// //     const tabs = [
// //         { key: 'description', name: 'Description', icon: BookOpen },
// //         { key: 'editorial', name: 'Editorial', icon: FileText },
// //         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
// //         { key: 'submissions', name: 'Submissions', icon: History },
// //     ];

// //     return (
// //         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
// //             <PanelGroup direction="horizontal">
// //                 {/* Left Panel */}
// //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// //                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
// //                         {tabs.map(tab => {
// //                             const Icon = tab.icon;
// //                             return (
// //                                 <button key={tab.key} onClick={() => setActiveTab(tab.key)}
// //                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
// //                                     ${activeTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
// //                                     <Icon className="w-5 h-5" />
// //                                     <span>{tab.name}</span>
// //                                 </button>
// //                             );
// //                         })}
// //                     </div>
// //                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
// //                         {activeTab === 'description' && (
// //                             <div className="space-y-6">
// //                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
// //                                 <div className="flex items-center gap-3">
// //                                     <DifficultyPill difficulty={problem.difficulty} />
// //                                     {problem.tags.split(',').map((tag, i) => (
// //                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
// //                                     ))}
// //                                 </div>
// //                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
// //                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
// //                                 <div className="space-y-3">
// //                                     {problem.visibleTestCases.map((tc, idx) => (
// //                                         <TestCaseDisplay
// //                                             key={tc._id}
// //                                             testCase={tc}
// //                                             index={idx}
// //                                             isActive={activeTestCaseIndex === idx}
// //                                             onClick={() => setActiveTestCaseIndex(idx === activeTestCaseIndex ? -1 : idx)}
// //                                         />
// //                                     ))}
// //                                 </div>
// //                             </div>
// //                         )}
// //                         {activeTab !== 'description' && (
// //                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">Content for {activeTab} tab placeholder.</div>
// //                         )}
// //                     </div>
// //                 </Panel>

// //                 {/* Horizontal Resize Handle */}
// //                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
// //                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// //                 </PanelResizeHandle>

// //                 {/* Right Panel */}
// //                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
// //                     <PanelGroup direction="vertical">
// //                         {/* Editor */}
// //                         <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
// //                             <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
// //                                 <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
// //                                     className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
// //                                     {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
// //                                 </select>
// //                                 <div className="space-x-3">
// //                                     <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
// //                                     <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
// //                                 </div>
// //                             </div>
// //                             <div className="flex-grow">
// //                                 <MonacoEditor
// //                                     height="100%"
// //                                     language={selectedLanguage.toLowerCase()}
// //                                     theme="vs-dark"
// //                                     value={code}
// //                                     onChange={(val) => setCode(val)}
// //                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
// //                                 />
// //                             </div>
// //                         </Panel>

// //                         {/* Vertical Resize Handle */}
// //                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
// //                             <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
// //                         </PanelResizeHandle>

// //                         {/* Console */}
// //                         <Panel defaultSize={20} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
// //                             <div className="flex items-center space-x-2 mb-2">
// //                                 <Terminal className="w-5 h-5 text-yellow-500" />
// //                                 <h3 className="font-semibold text-white">Console</h3>
// //                                 {runStatus && (
// //                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
// //                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
// //                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
// //                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
// //                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                             <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
// //                                 {isSubmitting && runStatus === 'running' ? 'Executing your code...' : consoleOutput || 'Click "Run Code" to test your solution or "Submit" to finalize.'}
// //                             </pre>
// //                         </Panel>
// //                     </PanelGroup>
// //                 </Panel>
// //             </PanelGroup>
// //         </div>
// //     );
// // };

// // export default Problem;


// import React, { useState, useEffect, useCallback } from 'react';
// import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// import MonacoEditor from '@monaco-editor/react';
// import axiosClient from '../utils/axiosConfig';
// import { useParams } from 'react-router';
// import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // Difficulty Pill Component
// const DifficultyPill = ({ difficulty }) => {
//     let colorClass = 'bg-zinc-700 text-zinc-300';
//     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
//     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
//     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

//     return (
//         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
//             {difficulty}
//         </span>
//     );
// };

// // Test Case Display Component
// const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
//     <div
//         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
//         }`}
//         onClick={() => onClick(index)}
//     >
//         <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
//             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
//         </div>
//         {isActive && (
//             <div className="mt-3 space-y-2 text-sm">
//                 <div className="p-2 bg-zinc-900 rounded">
//                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
//                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
//                 </div>
//                 <div className="p-2 bg-zinc-900 rounded">
//                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
//                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
//                 </div>
//                 {testCase.explanation && (
//                     <p className="text-zinc-400 mt-2">
//                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
//                     </p>
//                 )}
//             </div>
//         )}
//     </div>
// );

// // Main Problem Component
// const Problem = () => {
//     const { id } = useParams();
//     const [problem, setProblem] = useState(null);
//     const [activeLeftTab, setActiveLeftTab] = useState('description');
//     // activeRightTab stores the index of the currently active test case for display in the left panel.
//     // Setting it to 0 initially will show the first test case open by default.
//     const [activeRightTab, setActiveRightTab] = useState(0); 
//     const [selectedLanguage, setSelectedLanguage] = useState('javascript');
//     const [code, setCode] = useState('');
//     const [result, setResult] = useState(null);
//     const [runStatus, setRunStatus] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Fetch problem data from API
//     useEffect(() => {
//         const fetchProblem = async () => {
//             try {
//                 // Fetching problem details using the specified endpoint format
//                 const response = await axiosClient.get(`/problem/id/${id}`);
//                 const problemData = response.data;
//                 setProblem(problemData);
                
//                 // Determine initial language and code from boilerCode array
//                 const initialLang = problemData.boilerCode?.[0]?.language?.toLowerCase() || 'javascript';
//                 setSelectedLanguage(initialLang);
                
//                 // Use 'code' property from boilerCode array
//                 const initialCode = problemData.boilerCode?.find(b => b.language?.toLowerCase() === initialLang)?.code || '';
//                 setCode(initialCode);
//             } catch (error) {
//                 console.error('Error fetching problem:', error);
//             }
//         };
//         fetchProblem();
//     }, [id]);

//     const handleLanguageChange = useCallback((lang) => {
//         const lowerLang = lang.toLowerCase();
//         setSelectedLanguage(lowerLang);
//         // Look up code in boilerCode using the selected language
//         const newBoiler = problem?.boilerCode?.find(b => b.language?.toLowerCase() === lowerLang);
//         if (newBoiler) setCode(newBoiler.code);
//     }, [problem]);

//     const handleRunCode = async () => {
//         if (!problem) return;

//         setRunStatus('running');
//         setIsSubmitting(true);
//         // Switch to the console/result area to show execution status
//         setActiveLeftTab('description'); 
//         setResult(null);

//         const payload = {
//             code: code,
//             language: selectedLanguage,
//         };

//         try {
//             // Use the correct run endpoint
//             const response = await axiosClient.post(`/submit/problem/run/${id}`, payload);
//             const data = response.data;
//             setResult(data);
//             setRunStatus(data.success ? 'success' : 'error');
//         } catch (error) {
//             setRunStatus('error');
//             setResult({
//                 success: false,
//                 error: error.response?.data?.error || `Request failed. Check network or server status: ${error.message}`,
//                 testCases: []
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleSubmitCode = async () => {
//         if (!problem) return;

//         setRunStatus('running');
//         setIsSubmitting(true);
//         setActiveLeftTab('description'); // Switch to the console/result area
//         setResult(null);

//         const payload = {
//             code: code,
//             language: selectedLanguage,
//         };

//         try {
//             // Use the correct submit endpoint
//             console.log(payload)
//             const response = await axiosClient.post(`/submit/problem/${id}`, payload);
//             console.log(response)
//             const data = response.data;
//             console.log(data)
//             setResult(data);
//             setRunStatus(data.accepted ? 'success' : 'error');
//         } catch (error) {
//             setRunStatus('error');
//             setResult({
//                 accepted: false,
//                 error: error.response?.data?.error || `Submission API failed. Check connectivity or endpoint: ${error.message}`,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
    
//     // Function to handle the console/result display
//     const renderResultContent = () => {
//         if (!result) {
//             return (
//                 <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
//                     Click "Run Code" to test your solution or "Submit" to finalize.
//                 </pre>
//             );
//         }

//         const isRun = result.hasOwnProperty('success');

//         // Successful Run or Accepted Submit
//         if (isRun && result.success || !isRun && result.accepted) { 
//              const statusMessage = isRun ? "✅ All visible test cases passed!" : "🎉 Accepted!";
//              const testCases = isRun ? result.testCases : [];

//              return (
//                 <div className="space-y-4">
//                     <p className="text-green-400 font-bold">{statusMessage}</p>
//                     {result.passedTestCases && <p className="text-zinc-400">Test cases passed: {result.passedTestCases}/{result.totalTestCases}</p>}
//                     <p className="text-zinc-400">Runtime: {result.runtime} s</p>
//                     <p className="text-zinc-400">Memory: {result.memory} KB</p>
                    
//                     {/* Display test case details for 'Run' results */}
//                     {testCases.length > 0 && (
//                         <div className="space-y-2">
//                             {testCases.map((tc, i) => (
//                                 <div key={i} className="bg-zinc-700 p-3 rounded-md border-l-4 border-green-500">
//                                     <p className="font-semibold text-white">Test Case {i + 1}</p>
//                                     <pre className="text-xs font-mono text-zinc-300">
//                                         Input: {tc.stdin}
//                                         Output: {tc.stdout}
//                                         Expected: {tc.expected_output}
//                                     </pre>
//                                     <p className="text-green-500 mt-1">✓ Passed</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             );
//         }

//         // Failed Run or Rejected Submit
//         const testCases = result.testCases || [];
//         const errorMessage = result.error || result.errorMessage || 'Submission Failed';

//         return (
//             <div className="space-y-4">
//                 <p className="text-red-400 font-bold">❌ {errorMessage}</p>
//                  {result.passedTestCases && <p className="text-zinc-400">Test cases passed: {result.passedTestCases}/{result.totalTestCases}</p>}
                
//                 {testCases.length > 0 && (
//                     <div className="space-y-2">
//                         {testCases.map((tc, i) => (
//                             // Assuming status_id === 3 means accepted/passed for a single test case
//                             <div key={i} className={`bg-zinc-700 p-3 rounded-md ${tc.status_id === 3 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
//                                 <p className="font-semibold text-white">Test Case {i + 1}</p>
//                                 <pre className="text-xs font-mono text-zinc-300">
//                                     Input: {tc.stdin}
//                                     Output: {tc.stdout}
//                                     Expected: {tc.expected_output}
//                                 </pre>
//                                 <p className={`${tc.status_id === 3 ? 'text-green-500' : 'text-red-500'} mt-1`}>
//                                     {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     if (!problem) {
//         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></span></div>;
//     }

//     const tabs = [
//         { key: 'description', name: 'Description', icon: BookOpen },
//         { key: 'editorial', name: 'Editorial', icon: FileText },
//         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
//         { key: 'submissions', name: 'Submissions', icon: History },
//     ];

//     return (
//         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
//             <PanelGroup direction="horizontal">
//                 {/* Left Panel - Problem Details */}
//                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
//                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
//                         {tabs.map(tab => {
//                             const Icon = tab.icon;
//                             return (
//                                 <button key={tab.key} onClick={() => setActiveLeftTab(tab.key)}
//                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
//                                     ${activeLeftTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
//                                     <Icon className="w-5 h-5" />
//                                     <span>{tab.name}</span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
//                         {activeLeftTab === 'description' && (
//                             <div className="space-y-6">
//                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
//                                 <div className="flex items-center gap-3">
//                                     <DifficultyPill difficulty={problem.difficulty} />
//                                     {/* FIX: Check if tags is defined before splitting/mapping */}
//                                     {problem.tags && problem.tags.split(',').map((tag, i) => (
//                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
//                                     ))}
//                                 </div>
//                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
//                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
//                                 <div className="space-y-3">
//                                     {/* FIX: Check if visibleTestCases is defined before mapping */}
//                                     {problem.visibleTestCases && problem.visibleTestCases.map((tc, idx) => (
//                                         <TestCaseDisplay
//                                             key={tc._id || idx}
//                                             testCase={tc}
//                                             index={idx}
//                                             // isActive shows the details open when the index matches activeRightTab
//                                             isActive={idx === activeRightTab}
//                                             // Clicking sets the activeRightTab index
//                                             onClick={() => setActiveRightTab(idx === activeRightTab ? -1 : idx)}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {activeLeftTab === 'editorial' && problem?.editorial && (
//                             <div className="prose max-w-none text-zinc-300">
//                                 <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                                 <p className="whitespace-pre-wrap">{problem.editorial}</p>
//                             </div>
//                         )}
//                         {activeLeftTab === 'solutions' && problem && (
//                             <div className="space-y-6">
//                                 <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                                 {/* FIX: Use referenceSolution property */}
//                                 {problem.referenceSolution?.length > 0 ? (
//                                     problem.referenceSolution.map((solution, index) => (
//                                         <div key={index} className="border border-zinc-700 rounded-lg overflow-hidden">
//                                             <div className="bg-zinc-800 px-4 py-2">
//                                                 <h3 className="font-semibold text-lg">{problem.title} - {solution.language}</h3>
//                                             </div>
//                                             <div className="p-4 bg-zinc-900">
//                                                 <MonacoEditor
//                                                     height="300px"
//                                                     language={solution.language?.toLowerCase()}
//                                                     theme="vs-dark"
//                                                     value={solution.completeCode}
//                                                     options={{ readOnly: true, minimap: { enabled: false } }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
//                                         Solutions will be available after you solve the problem.
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                         {activeLeftTab === 'submissions' && (
//                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
//                                 Your submission history will appear here.
//                             </div>
//                         )}
//                     </div>
//                 </Panel>

//                 {/* Horizontal Resize Handle */}
//                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
//                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
//                 </PanelResizeHandle>

//                 {/* Right Panel - Editor & Console */}
//                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
//                     <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
//                         {/* Language Selector */}
//                         <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
//                             className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
//                             {/* FIX: Use boilerCode property */}
//                             {problem.boilerCode.map(b => <option key={b.language?.toLowerCase()} value={b.language?.toLowerCase()}>{b.language}</option>)}
//                         </select>
//                         <div className="space-x-3">
//                             <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
//                             <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
//                         </div>
//                     </div>
                    
//                     {/* Monaco Editor / Console Split */}
//                     <PanelGroup direction="vertical">
//                          <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
//                              <div className="flex-grow">
//                                 <MonacoEditor
//                                     height="100%"
//                                     // Language prop needs to be the lowercased monaco identifier
//                                     language={selectedLanguage} 
//                                     theme="vs-dark"
//                                     value={code}
//                                     onChange={(val) => setCode(val)}
//                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
//                                 />
//                              </div>
//                          </Panel>
                        
//                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
//                            <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
//                         </PanelResizeHandle>
                        
//                         <Panel defaultSize={30} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
//                              <div className="flex items-center space-x-2 mb-2">
//                                 <Terminal className="w-5 h-5 text-yellow-500" />
//                                 <h3 className="font-semibold text-white">Console</h3>
//                                 {runStatus && (
//                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
//                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
//                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
//                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
//                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             {isSubmitting && runStatus === 'running' ? (
//                                 <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">Executing your code...</pre>
//                             ) : (
//                                 renderResultContent()
//                             )}
//                         </Panel>
//                     </PanelGroup>
//                 </Panel>
//             </PanelGroup>
//         </div>
//     );
// };

// export default Problem;



// import React, { useState, useEffect, useCallback } from 'react';
// import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
// import MonacoEditor from '@monaco-editor/react';
// import axiosClient from '../utils/axiosConfig';
// import { useParams } from 'react-router';
// import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// // Difficulty Pill Component
// const DifficultyPill = ({ difficulty }) => {
//     let colorClass = 'bg-zinc-700 text-zinc-300';
//     if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
//     if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
//     if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

//     return (
//         <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
//             {difficulty}
//         </span>
//     );
// };

// // Test Case Display Component
// const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
//     <div
//         className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
//             isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
//         }`}
//         onClick={() => onClick(index)}
//     >
//         <div className="flex justify-between items-center">
//             <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
//             <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
//         </div>
//         {isActive && (
//             <div className="mt-3 space-y-2 text-sm">
//                 <div className="p-2 bg-zinc-900 rounded">
//                     <p className="text-zinc-400 font-mono text-xs">Input:</p>
//                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
//                 </div>
//                 <div className="p-2 bg-zinc-900 rounded">
//                     <p className="text-zinc-400 font-mono text-xs">Output:</p>
//                     <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
//                 </div>
//                 {testCase.explanation && (
//                     <p className="text-zinc-400 mt-2">
//                         <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
//                     </p>
//                 )}
//             </div>
//         )}
//     </div>
// );

// // Helper to map display language names to Monaco Editor identifiers
// const getMonacoLanguage = (lang) => {
//     if (!lang) return 'javascript';
//     const lower = lang.toLowerCase();
//     if (lower.includes('c++')) return 'cpp';
//     if (lower.includes('java')) return 'java';
//     return lower; // defaults to 'javascript' or similar
// };

// // Main Problem Component
// const Problem = () => {
//     const { id } = useParams();
//     const [problem, setProblem] = useState(null);
//     const [activeLeftTab, setActiveLeftTab] = useState('description');
//     // activeRightTab stores the index of the currently active test case for display in the left panel.
//     // Setting it to 0 initially will show the first test case open by default.
//     const [activeRightTab, setActiveRightTab] = useState(0); 
//     // State now stores the canonical name (e.g., "C++")
//     const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
//     const [code, setCode] = useState('');
//     const [result, setResult] = useState(null);
//     const [runStatus, setRunStatus] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     // Fetch problem data from API
//     useEffect(() => {
//         const fetchProblem = async () => {
//             try {
//                 // Fetching problem details using the specified endpoint format
//                 const response = await axiosClient.get(`/problem/id/${id}`);
//                 const problemData = response.data;
//                 setProblem(problemData);
                
//                 // Determine initial language and code from boilerCode array (using canonical name)
//                 const initialLangName = problemData.boilerCode?.[0]?.language || 'Javascript';
//                 setSelectedLanguage(initialLangName);
                
//                 // Find code using the exact language name
//                 const initialCode = problemData.boilerCode?.find(b => b.language === initialLangName)?.code || '';
//                 setCode(initialCode);
//             } catch (error) {
//                 console.error('Error fetching problem:', error);
//             }
//         };
//         fetchProblem();
//     }, [id]);

//     const handleLanguageChange = useCallback((lang) => {
//         // Store the canonical language name directly, which is what the API expects.
//         setSelectedLanguage(lang);
        
//         // Look up code in boilerCode using the exact selected language name
//         const newBoiler = problem?.boilerCode?.find(b => b.language === lang);
//         if (newBoiler) setCode(newBoiler.code);
//     }, [problem]);

//     const handleRunCode = async () => {
//         if (!problem) return;

//         setRunStatus('running');
//         setIsSubmitting(true);
//         setActiveLeftTab('description'); 
//         setResult(null);

//         const payload = {
//             code: code,
//             // Uses the canonical case (e.g., "C++")
//             language: selectedLanguage, 
//         };

//         try {
//             // Use the correct run endpoint
//             const response = await axiosClient.post(`/submit/problem/run/${id}`, payload);
//             const data = response.data;
//             setResult(data);
//             setRunStatus(data.success ? 'success' : 'error');
//         } catch (error) {
//             setRunStatus('error');
//             setResult({
//                 success: false,
//                 error: error.response?.data?.error || `Request failed. Check network or server status: ${error.message}`,
//                 testCases: []
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleSubmitCode = async () => {
//         if (!problem) return;

//         setRunStatus('running');
//         setIsSubmitting(true);
//         setActiveLeftTab('description'); // Switch to the console/result area
//         setResult(null);

//         // Payload uses canonical language case (e.g., "C++")
//         const payload = {
//             code: code,
//             language: selectedLanguage,
//         };

//         try {
//             console.log(payload)
//             // The problem ID is passed in the URL, using the correct submit endpoint
//             const response = await axiosClient.post(`/submit/problem/${id}`, payload);
//             console.log(response)
//             const data = response.data;
//             console.log(data)
//             setResult(data);
//             setRunStatus(data.accepted ? 'success' : 'error');
//         } catch (error) {
//             setRunStatus('error');
//             setResult({
//                 accepted: false,
//                 error: error.response?.data?.error || `Submission API failed. Check connectivity or endpoint: ${error.message}`,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
    
//     // Function to handle the console/result display
//     const renderResultContent = () => {
//         if (!result) {
//             return (
//                 <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
//                     Click "Run Code" to test your solution or "Submit" to finalize.
//                 </pre>
//             );
//         }

//         const isRun = result.hasOwnProperty('success');

//         // Successful Run or Accepted Submit
//         if (isRun && result.success || !isRun && result.accepted) { 
//              const statusMessage = isRun ? "✅ All visible test cases passed!" : "🎉 Accepted!";
//              const testCases = isRun ? result.testCases : [];

//              return (
//                 <div className="space-y-4">
//                     <p className="text-green-400 font-bold">{statusMessage}</p>
//                     {result.passedTestCases && <p className="text-zinc-400">Test cases passed: {result.passedTestCases}/{result.totalTestCases}</p>}
//                     <p className="text-zinc-400">Runtime: {result.runtime} s</p>
//                     <p className="text-zinc-400">Memory: {result.memory} KB</p>
                    
//                     {/* Display test case details for 'Run' results */}
//                     {testCases.length > 0 && (
//                         <div className="space-y-2">
//                             {testCases.map((tc, i) => (
//                                 <div key={i} className="bg-zinc-700 p-3 rounded-md border-l-4 border-green-500">
//                                     <p className="font-semibold text-white">Test Case {i + 1}</p>
//                                     <pre className="text-xs font-mono text-zinc-300">
//                                         Input: {tc.stdin}
//                                         Output: {tc.stdout}
//                                         Expected: {tc.expected_output}
//                                     </pre>
//                                     <p className="text-green-500 mt-1">✓ Passed</p>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </div>
//             );
//         }

//         // Failed Run or Rejected Submit
//         const testCases = result.testCases || [];
//         const errorMessage = result.error || result.errorMessage || 'Submission Failed';

//         return (
//             <div className="space-y-4">
//                 <p className="text-red-400 font-bold">❌ {errorMessage}</p>
//                  {result.passedTestCases && <p className="text-zinc-400">Test cases passed: {result.passedTestCases}/{result.totalTestCases}</p>}
                
//                 {testCases.length > 0 && (
//                     <div className="space-y-2">
//                         {testCases.map((tc, i) => (
//                             // Assuming status_id === 3 means accepted/passed for a single test case
//                             <div key={i} className={`bg-zinc-700 p-3 rounded-md ${tc.status_id === 3 ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}>
//                                 <p className="font-semibold text-white">Test Case {i + 1}</p>
//                                 <pre className="text-xs font-mono text-zinc-300">
//                                     Input: {tc.stdin}
//                                     Output: {tc.stdout}
//                                     Expected: {tc.expected_output}
//                                 </pre>
//                                 <p className={`${tc.status_id === 3 ? 'text-green-500' : 'text-red-500'} mt-1`}>
//                                     {tc.status_id === 3 ? '✓ Passed' : '✗ Failed'}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         );
//     };

//     if (!problem) {
//         return <div className="bg-black min-h-screen flex items-center justify-center"><span className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></span></div>;
//     }

//     const tabs = [
//         { key: 'description', name: 'Description', icon: BookOpen },
//         { key: 'editorial', name: 'Editorial', icon: FileText },
//         { key: 'solutions', name: 'Solutions', icon: FlaskConical },
//         { key: 'submissions', name: 'Submissions', icon: History },
//     ];

//     return (
//         <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
//             <PanelGroup direction="horizontal">
//                 {/* Left Panel - Problem Details */}
//                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
//                     <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
//                         {tabs.map(tab => {
//                             const Icon = tab.icon;
//                             return (
//                                 <button key={tab.key} onClick={() => setActiveLeftTab(tab.key)}
//                                     className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
//                                     ${activeLeftTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
//                                     <Icon className="w-5 h-5" />
//                                     <span>{tab.name}</span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                     <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
//                         {activeLeftTab === 'description' && (
//                             <div className="space-y-6">
//                                 <h1 className="text-3xl font-bold">{problem.title}</h1>
//                                 <div className="flex items-center gap-3">
//                                     <DifficultyPill difficulty={problem.difficulty} />
//                                     {/* FIX: Check if tags is defined before splitting/mapping */}
//                                     {problem.tags && problem.tags.split(',').map((tag, i) => (
//                                         <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
//                                     ))}
//                                 </div>
//                                 <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
//                                 <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
//                                 <div className="space-y-3">
//                                     {/* FIX: Check if visibleTestCases is defined before mapping */}
//                                     {problem.visibleTestCases && problem.visibleTestCases.map((tc, idx) => (
//                                         <TestCaseDisplay
//                                             key={tc._id || idx}
//                                             testCase={tc}
//                                             index={idx}
//                                             // isActive shows the details open when the index matches activeRightTab
//                                             isActive={idx === activeRightTab}
//                                             // Clicking sets the activeRightTab index
//                                             onClick={() => setActiveRightTab(idx === activeRightTab ? -1 : idx)}
//                                         />
//                                     ))}
//                                 </div>
//                             </div>
//                         )}
//                         {activeLeftTab === 'editorial' && problem?.editorial && (
//                             <div className="prose max-w-none text-zinc-300">
//                                 <h2 className="text-xl font-bold mb-4">Editorial</h2>
//                                 <p className="whitespace-pre-wrap">{problem.editorial}</p>
//                             </div>
//                         )}
//                         {activeLeftTab === 'solutions' && problem && (
//                             <div className="space-y-6">
//                                 <h2 className="text-xl font-bold mb-4">Solutions</h2>
//                                 {/* FIX: Use referenceSolution property */}
//                                 {problem.referenceSolution?.length > 0 ? (
//                                     problem.referenceSolution.map((solution, index) => (
//                                         <div key={index} className="border border-zinc-700 rounded-lg overflow-hidden">
//                                             <div className="bg-zinc-800 px-4 py-2">
//                                                 <h3 className="font-semibold text-lg">{problem.title} - {solution.language}</h3>
//                                             </div>
//                                             <div className="p-4 bg-zinc-900">
//                                                 <MonacoEditor
//                                                     height="300px"
//                                                     language={getMonacoLanguage(solution.language)}
//                                                     theme="vs-dark"
//                                                     value={solution.completeCode}
//                                                     options={{ readOnly: true, minimap: { enabled: false } }}
//                                                 />
//                                             </div>
//                                         </div>
//                                     ))
//                                 ) : (
//                                     <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
//                                         Solutions will be available after you solve the problem.
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                         {activeLeftTab === 'submissions' && (
//                             <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
//                                 Your submission history will appear here.
//                             </div>
//                         )}
//                     </div>
//                 </Panel>

//                 {/* Horizontal Resize Handle */}
//                 <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
//                     <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
//                 </PanelResizeHandle>

//                 {/* Right Panel - Editor & Console */}
//                 <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
//                     <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
//                         {/* Language Selector */}
//                         <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
//                             className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
//                             {/* Option values and labels are now the canonical language name (e.g., "C++") */}
//                             {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
//                         </select>
//                         <div className="space-x-3">
//                             <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
//                             <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
//                         </div>
//                     </div>
                    
//                     {/* Monaco Editor / Console Split */}
//                     <PanelGroup direction="vertical">
//                          <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
//                              <div className="flex-grow">
//                                 <MonacoEditor
//                                     height="100%"
//                                     // Use helper to convert canonical language name to Monaco identifier
//                                     language={getMonacoLanguage(selectedLanguage)} 
//                                     theme="vs-dark"
//                                     value={code}
//                                     onChange={(val) => setCode(val)}
//                                     options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
//                                 />
//                              </div>
//                          </Panel>
                        
//                         <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
//                            <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
//                         </PanelResizeHandle>
                        
//                         <Panel defaultSize={30} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
//                              <div className="flex items-center space-x-2 mb-2">
//                                 <Terminal className="w-5 h-5 text-yellow-500" />
//                                 <h3 className="font-semibold text-white">Console</h3>
//                                 {runStatus && (
//                                     <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
//                                         {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
//                                         {runStatus === 'error' && <XCircle className="w-3 h-3" />}
//                                         {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
//                                         <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
//                                     </div>
//                                 )}
//                             </div>
//                             {isSubmitting && runStatus === 'running' ? (
//                                 <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">Executing your code...</pre>
//                             ) : (
//                                 renderResultContent()
//                             )}
//                         </Panel>
//                     </PanelGroup>
//                 </Panel>
//             </PanelGroup>
//         </div>
//     );
// };

// export default Problem;



import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, BookOpen, Terminal, CheckCircle, XCircle, FileText, FlaskConical, History, GripVertical, GripHorizontal } from 'lucide-react';
import MonacoEditor from '@monaco-editor/react';
import axiosClient from '../utils/axiosConfig';
import { useParams } from 'react-router';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Difficulty Pill Component
const DifficultyPill = ({ difficulty }) => {
    let colorClass = 'bg-zinc-700 text-zinc-300';
    if (difficulty === 'Easy') colorClass = 'bg-green-700 text-green-100';
    if (difficulty === 'Medium') colorClass = 'bg-yellow-700 text-yellow-100';
    if (difficulty === 'Hard') colorClass = 'bg-red-700 text-red-100';

    return (
        <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${colorClass}`}>
            {difficulty}
        </span>
    );
};

// Test Case Display Component
const TestCaseDisplay = ({ testCase, index, isActive, onClick }) => (
    <div
        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive ? 'bg-zinc-700 border-l-4 border-yellow-500 shadow-xl' : 'bg-zinc-800 hover:bg-zinc-700'
        }`}
        onClick={() => onClick(index)}
    >
        <div className="flex justify-between items-center">
            <h4 className="font-semibold text-zinc-300">Example {index + 1}</h4>
            <ChevronDown className={`w-4 h-4 text-zinc-400 transform transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
        </div>
        {isActive && (
            <div className="mt-3 space-y-2 text-sm">
                <div className="p-2 bg-zinc-900 rounded">
                    <p className="text-zinc-400 font-mono text-xs">Input:</p>
                    <pre className="text-white whitespace-pre-wrap break-all">{testCase.input}</pre>
                </div>
                <div className="p-2 bg-zinc-900 rounded">
                    <p className="text-zinc-400 font-mono text-xs">Output:</p>
                    <pre className="text-white whitespace-pre-wrap break-all">{testCase.output}</pre>
                </div>
                {testCase.explanation && (
                    <p className="text-zinc-400 mt-2">
                        <span className="font-semibold text-zinc-300">Explanation:</span> {testCase.explanation}
                    </p>
                )}
            </div>
        )}
    </div>
);

// Helper to map display language names to Monaco Editor identifiers
const getMonacoLanguage = (lang) => {
    if (!lang) return 'javascript';
    const lower = lang.toLowerCase();
    if (lower.includes('c++')) return 'cpp';
    if (lower.includes('java')) return 'java';
    return lower; // defaults to 'javascript' or similar
};

// Main Problem Component
const Problem = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [activeLeftTab, setActiveLeftTab] = useState('description');
    // activeRightTab stores the index of the currently active test case for display in the left panel.
    // Setting it to 0 initially will show the first test case open by default.
    const [activeRightTab, setActiveRightTab] = useState(0); 
    // State now stores the canonical name (e.g., "C++")
    const [selectedLanguage, setSelectedLanguage] = useState('Javascript');
    const [code, setCode] = useState('');
    const [result, setResult] = useState(null);
    const [runStatus, setRunStatus] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch problem data from API
    useEffect(() => {
        const fetchProblem = async () => {
            try {
                // Fetching problem details using the specified endpoint format
                const response = await axiosClient.get(`/problem/id/${id}`);
                const problemData = response.data;
                setProblem(problemData);
                
                // Determine initial language and code from boilerCode array (using canonical name)
                const initialLangName = problemData.boilerCode?.[0]?.language || 'Javascript';
                setSelectedLanguage(initialLangName);
                
                // Find code using the exact language name
                const initialCode = problemData.boilerCode?.find(b => b.language === initialLangName)?.code || '';
                setCode(initialCode);
            } catch (error) {
                console.error('Error fetching problem:', error);
            }
        };
        fetchProblem();
    }, [id]);

    const handleLanguageChange = useCallback((lang) => {
        // Store the canonical language name directly, which is what the API expects.
        setSelectedLanguage(lang);
        
        // Look up code in boilerCode using the exact selected language name
        const newBoiler = problem?.boilerCode?.find(b => b.language === lang);
        if (newBoiler) setCode(newBoiler.code);
    }, [problem]);

    const handleRunCode = async () => {
        if (!problem) return;

        setRunStatus('running');
        setIsSubmitting(true);
        setActiveLeftTab('description'); 
        setResult(null);

        const payload = {
            code: code,
            // Uses the canonical case (e.g., "C++")
            language: selectedLanguage, 
        };

        try {
            // Use the correct run endpoint
            const response = await axiosClient.post(`/submit/problem/run/${id}`, payload);
            const data = response.data;
            setResult(data);
            // Check if all test cases passed for run operation
            setRunStatus(data.status === 'accepted' ? 'success' : 'error');
        } catch (error) {
            setRunStatus('error');
            setResult({
                status: 'error',
                errorMessage: error.response?.data?.error || `Request failed. Check network or server status: ${error.message}`,
                testCasesPassed: 0,
                runtime: 0,
                memory: 0
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitCode = async () => {
        if (!problem) return;

        setRunStatus('running');
        setIsSubmitting(true);
        setActiveLeftTab('description'); // Switch to the console/result area
        setResult(null);

        // Payload uses canonical language case (e.g., "C++")
        const payload = {
            code: code,
            language: selectedLanguage,
        };

        try {
            // The problem ID is passed in the URL, using the correct submit endpoint
            const response = await axiosClient.post(`/submit/problem/${id}`, payload);
            const data = response.data;
            setResult(data);
            // Check if submission was accepted
            setRunStatus(data.status === 'accepted' ? 'success' : 'error');
        } catch (error) {
            setRunStatus('error');
            setResult({
                status: 'error',
                errorMessage: error.response?.data?.error || `Submission API failed. Check connectivity or endpoint: ${error.message}`,
                testCasesPassed: 0,
                runtime: 0,
                memory: 0
            });
        } finally {
            setIsSubmitting(false);
        }
    };
    
    // Function to handle the console/result display
    const renderResultContent = () => {
        if (!result) {
            return (
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-zinc-400">
                        <Terminal className="w-4 h-4" />
                        <span className="text-sm font-medium">Console</span>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-4">
                        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">
                            Click "Run Code" to test your solution or "Submit" to finalize.
                        </pre>
                    </div>
                </div>
            );
        }

        // Check if the result indicates success
        const isSuccess = result.status === 'accepted';
        const isRun = result.hasOwnProperty('success'); // Check if it's a run operation

        if (isSuccess) { 
            return (
                <div className="space-y-4">
                    {/* Status Header */}
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-bold text-lg">
                            {isRun ? "✅ All visible test cases passed!" : "🎉 Accepted!"}
                        </span>
                    </div>

                    {/* Execution Summary */}
                    <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Test Cases:</span>
                                <span className="text-zinc-200 font-medium">
                                    {result.testCasesPassed}/{result.testCaseTotal}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Runtime:</span>
                                <span className="text-zinc-200 font-medium">
                                    {result.runtime ? `${result.runtime}s` : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Memory:</span>
                                <span className="text-zinc-200 font-medium">
                                    {result.memory ? `${result.memory} KB` : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-400">Status:</span>
                                <span className="text-green-400 font-medium">Passed</span>
                            </div>
                        </div>
                    </div>

                    {/* Test Case Details for Run Operations */}
                    {isRun && result.testCases && result.testCases.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-zinc-300">Test Case Results:</h4>
                            {result.testCases.map((testCase, index) => (
                                <div key={index} className="bg-zinc-800 rounded-lg p-3 border-l-4 border-green-500">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-zinc-200">Test Case {index + 1}</span>
                                        <span className="text-green-400 text-xs">✓ Passed</span>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <span className="text-zinc-400">Input: </span>
                                            <span className="text-zinc-200 font-mono">{testCase.stdin}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-400">Expected: </span>
                                            <span className="text-zinc-200 font-mono">{testCase.expected_output}</span>
                                        </div>
                                        <div>
                                            <span className="text-zinc-400">Output: </span>
                                            <span className="text-zinc-200 font-mono">{testCase.stdout}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Success Message */}
                    <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3">
                        <p className="text-green-400 text-sm">
                            {isRun 
                                ? "Your code executed successfully on all visible test cases!" 
                                : "Congratulations! Your solution passed all test cases and has been accepted!"
                            }
                        </p>
                    </div>
                </div>
            );
        }

        // Failed execution
        const errorMessage = result.errorMessage || 'Execution Failed';

        return (
            <div className="space-y-4">
                {/* Error Header */}
                <div className="flex items-center space-x-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-bold text-lg">❌ {errorMessage}</span>
                </div>

                {/* Execution Summary */}
                <div className="bg-zinc-800 rounded-lg p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Test Cases:</span>
                            <span className="text-zinc-200 font-medium">
                                {result.testCasesPassed || 0}/{result.testCaseTotal || 0}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Runtime:</span>
                            <span className="text-zinc-200 font-medium">
                                {result.runtime ? `${result.runtime}s` : 'N/A'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Memory:</span>
                            <span className="text-zinc-200 font-medium">
                                {result.memory ? `${result.memory} KB` : 'N/A'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-400">Status:</span>
                            <span className="text-red-400 font-medium">Failed</span>
                        </div>
                    </div>
                </div>

                {/* Error Details */}
                {result.errorMessage && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-red-400 mb-2">Error Details:</h4>
                        <pre className="text-xs font-mono text-red-300 whitespace-pre-wrap break-all">
                            {result.errorMessage}
                        </pre>
                    </div>
                )}

                {/* Test Case Details for Failed Cases */}
                {result.testCases && result.testCases.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-semibold text-zinc-300">Test Case Results:</h4>
                        {result.testCases.map((testCase, index) => (
                            <div key={index} className={`bg-zinc-800 rounded-lg p-3 border-l-4 ${
                                testCase.status_id === 3 ? 'border-green-500' : 'border-red-500'
                            }`}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-zinc-200">Test Case {index + 1}</span>
                                    <span className={`text-xs ${
                                        testCase.status_id === 3 ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {testCase.status_id === 3 ? '✓ Passed' : '✗ Failed'}
                                    </span>
                                </div>
                                <div className="space-y-2 text-xs">
                                    <div>
                                        <span className="text-zinc-400">Input: </span>
                                        <span className="text-zinc-200 font-mono">{testCase.stdin}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400">Expected: </span>
                                        <span className="text-zinc-200 font-mono">{testCase.expected_output}</span>
                                    </div>
                                    <div>
                                        <span className="text-zinc-400">Your Output: </span>
                                        <span className="text-zinc-200 font-mono">{testCase.stdout || 'No output'}</span>
                                    </div>
                                    {testCase.stderr && (
                                        <div>
                                            <span className="text-zinc-400">Error: </span>
                                            <span className="text-red-300 font-mono">{testCase.stderr}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Helpful Tips */}
                <div className="bg-zinc-800 rounded-lg p-3">
                    <h4 className="text-sm font-semibold text-zinc-300 mb-2">💡 Tips:</h4>
                    <ul className="text-xs text-zinc-400 space-y-1">
                        <li>• Check your logic and edge cases</li>
                        <li>• Verify input/output format matches exactly</li>
                        <li>• Make sure your code handles all test cases</li>
                        <li>• Check for syntax errors and typos</li>
                    </ul>
                </div>
            </div>
        );
    };

    if (!problem) {
        return <div className="bg-black min-h-screen flex items-center justify-center"><span className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></span></div>;
    }

    const tabs = [
        { key: 'description', name: 'Description', icon: BookOpen },
        { key: 'editorial', name: 'Editorial', icon: FileText },
        { key: 'solutions', name: 'Solutions', icon: FlaskConical },
        { key: 'submissions', name: 'Submissions', icon: History },
    ];

    return (
        <div className="font-sans antialiased text-zinc-100 bg-zinc-900 flex h-screen">
            <PanelGroup direction="horizontal">
                {/* Left Panel - Problem Details */}
                <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
                    <div className="flex-shrink-0 flex items-center border-b border-zinc-700 bg-zinc-800">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button key={tab.key} onClick={() => setActiveLeftTab(tab.key)}
                                    className={`p-4 flex items-center space-x-2 font-semibold text-lg transition-colors
                                    ${activeLeftTab === tab.key ? 'text-white border-b-2 border-yellow-500 bg-zinc-900' : 'text-zinc-400 hover:bg-zinc-700/50'}`}>
                                    <Icon className="w-5 h-5" />
                                    <span>{tab.name}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">
                        {activeLeftTab === 'description' && (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-bold">{problem.title}</h1>
                                <div className="flex items-center gap-3">
                                    <DifficultyPill difficulty={problem.difficulty} />
                                    {/* FIX: Check if tags is defined before splitting/mapping */}
                                    {problem.tags && problem.tags.split(',').map((tag, i) => (
                                        <span key={i} className="px-3 py-0.5 text-sm rounded-full bg-blue-900 text-blue-300 font-medium">{tag.trim()}</span>
                                    ))}
                                </div>
                                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: problem.description.replace(/\n/g, '<br/>') }} />
                                <h3 className="text-xl font-semibold text-white border-b border-zinc-700 pb-2">Examples</h3>
                                <div className="space-y-3">
                                    {/* FIX: Check if visibleTestCases is defined before mapping */}
                                    {problem.visibleTestCases && problem.visibleTestCases.map((tc, idx) => (
                                        <TestCaseDisplay
                                            key={tc._id || idx}
                                            testCase={tc}
                                            index={idx}
                                            // isActive shows the details open when the index matches activeRightTab
                                            isActive={idx === activeRightTab}
                                            // Clicking sets the activeRightTab index
                                            onClick={() => setActiveRightTab(idx === activeRightTab ? -1 : idx)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                        {activeLeftTab === 'editorial' && problem?.editorial && (
                            <div className="prose max-w-none text-zinc-300">
                                <h2 className="text-xl font-bold mb-4">Editorial</h2>
                                <p className="whitespace-pre-wrap">{problem.editorial}</p>
                            </div>
                        )}
                        {activeLeftTab === 'solutions' && problem && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">Solutions</h2>
                                {/* FIX: Use referenceSolution property */}
                                {problem.referenceSolution?.length > 0 ? (
                                    problem.referenceSolution.map((solution, index) => (
                                        <div key={index} className="border border-zinc-700 rounded-lg overflow-hidden">
                                            <div className="bg-zinc-800 px-4 py-2">
                                                <h3 className="font-semibold text-lg">{problem.title} - {solution.language}</h3>
                                            </div>
                                            <div className="p-4 bg-zinc-900">
                                                <MonacoEditor
                                                    height="300px"
                                                    language={getMonacoLanguage(solution.language)}
                                                    theme="vs-dark"
                                                    value={solution.completeCode}
                                                    options={{ readOnly: true, minimap: { enabled: false } }}
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
                        {activeLeftTab === 'submissions' && (
                            <div className="p-4 bg-zinc-800 rounded-lg text-zinc-300">
                                Your submission history will appear here.
                            </div>
                        )}
                    </div>
                </Panel>

                {/* Horizontal Resize Handle */}
                <PanelResizeHandle className="flex items-center justify-center w-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-col-resize">
                    <GripVertical className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
                </PanelResizeHandle>

                {/* Right Panel - Editor & Console */}
                <Panel defaultSize={50} minSize={20} maxSize={80} className="flex flex-col transition-all duration-300 ease-in-out">
                    <div className="flex-shrink-0 flex items-center justify-between p-3 border-b border-zinc-700 bg-zinc-800">
                        {/* Language Selector */}
                        <select value={selectedLanguage} onChange={(e) => handleLanguageChange(e.target.value)}
                            className="block bg-zinc-700 border border-zinc-600 text-white py-2 px-4 pr-8 rounded-lg shadow">
                            {/* Option values and labels are now the canonical language name (e.g., "C++") */}
                            {problem.boilerCode.map(b => <option key={b.language} value={b.language}>{b.language}</option>)}
                        </select>
                        <div className="space-x-3">
                            <button onClick={handleRunCode} disabled={isSubmitting} className={`px-4 py-2 text-sm font-semibold rounded-lg shadow-lg ${isSubmitting ? 'bg-zinc-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-500'}`}>Run Code</button>
                            <button onClick={handleSubmitCode} disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold rounded-lg shadow-lg bg-green-600 hover:bg-green-500">Submit</button>
                        </div>
                    </div>
                    
                    {/* Monaco Editor / Console Split */}
                    <PanelGroup direction="vertical">
                         <Panel minSize={10} maxSize={80} className="flex-grow relative flex flex-col transition-all duration-300 ease-in-out">
                             <div className="flex-grow">
                                <MonacoEditor
                                    height="100%"
                                    // Use helper to convert canonical language name to Monaco identifier
                                    language={getMonacoLanguage(selectedLanguage)} 
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(val) => setCode(val)}
                                    options={{ minimap: { enabled: false }, automaticLayout: true, fontSize: 14 }}
                                />
                             </div>
                         </Panel>
                        
                        <PanelResizeHandle className="flex items-center justify-center h-2 bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-row-resize">
                           <GripHorizontal className="h-5 w-5 text-zinc-400 hover:text-white transition-colors" />
                        </PanelResizeHandle>
                        
                        <Panel defaultSize={30} minSize={10} maxSize={50} className="flex-shrink-0 p-3 bg-zinc-800 border-t border-zinc-700 overflow-y-auto custom-scrollbar transition-all duration-300 ease-in-out">
                             <div className="flex items-center space-x-2 mb-2">
                                <Terminal className="w-5 h-5 text-yellow-500" />
                                <h3 className="font-semibold text-white">Console</h3>
                                {runStatus && (
                                    <div className={`flex items-center space-x-1 ml-4 px-2 py-1 rounded-full text-xs font-medium ${runStatus === 'success' ? 'bg-green-600 text-white' : runStatus === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'}`}>
                                        {runStatus === 'success' && <CheckCircle className="w-3 h-3" />}
                                        {runStatus === 'error' && <XCircle className="w-3 h-3" />}
                                        {runStatus === 'running' && <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>}
                                        <span>{runStatus.charAt(0).toUpperCase() + runStatus.slice(1)}</span>
                                    </div>
                                )}
                            </div>
                            {isSubmitting && runStatus === 'running' ? (
                                <pre className="text-xs font-mono whitespace-pre-wrap break-all text-zinc-300">Executing your code...</pre>
                            ) : (
                                renderResultContent()
                            )}
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default Problem;
