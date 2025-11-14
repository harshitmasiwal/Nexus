import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, Code, Eye, Copy, Download, Calendar, Zap, HardDrive } from 'lucide-react';
import axiosClient from '../utils/axiosConfig';
import { useParams } from 'react-router';
import MonacoEditor from '@monaco-editor/react';

const Submissions = () => {
    const { id } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showCode, setShowCode] = useState(false);

    useEffect(() => {
        fetchSubmissions();
    }, [id]);

    const fetchSubmissions = async () => {
        try {
            const response = await axiosClient.get(`/submit/problem/${id}/submissions`);
            if (response.data.success) {
                setSubmissions(response.data.submissions);
            }
        } catch (error) {
            console.error('Error fetching submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'accepted':
                return <CheckCircle className="w-4 h-4 text-green-400" />;
            case 'error':
                return <AlertCircle className="w-4 h-4 text-red-400" />;
            case 'wrong':
                return <XCircle className="w-4 h-4 text-red-400" />;
            default:
                return <Clock className="w-4 h-4 text-yellow-400" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'text-green-400 bg-green-900/20 border-green-500/30';
            case 'error':
                return 'text-red-400 bg-red-900/20 border-red-500/30';
            case 'wrong':
                return 'text-red-400 bg-red-900/20 border-red-500/30';
            default:
                return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const formatRuntime = (runtime) => {
        return runtime ? `${runtime.toFixed(3)}s` : 'N/A';
    };

    const formatMemory = (memory) => {
        return memory ? `${memory} KB` : 'N/A';
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // You could add a toast notification here
            console.log('Code copied to clipboard');
        } catch (err) {
            console.error('Failed to copy code: ', err);
        }
    };

    const downloadCode = (code, language, submissionNumber) => {
        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `submission-${submissionNumber}.${language.toLowerCase()}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin h-8 w-8 border-4 border-yellow-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    if (submissions.length === 0) {
        return (
            <div className="text-center py-12">
                <Code className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-zinc-300 mb-2">No Submissions Yet</h3>
                <p className="text-zinc-400">Submit your solution to see it appear here.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Your Submissions</h2>
                <span className="text-sm text-zinc-400">{submissions.length} submission{submissions.length !== 1 ? 's' : ''}</span>
            </div>

             <div className="space-y-3">
                 {submissions.map((submission, index) => (
                     <div
                         key={submission._id}
                         className={`bg-zinc-800/80 backdrop-blur-sm rounded-lg border border-zinc-700/50 hover:border-zinc-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-zinc-900/20 ${
                             selectedSubmission?._id === submission._id ? 'ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/10' : ''
                         }`}
                     >
                         <div className="p-4">
                             {/* Header Section */}
                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                 <div className="flex items-center space-x-3 flex-wrap">
                                     <span className="text-sm font-medium text-zinc-300 bg-zinc-700/50 px-2 py-1 rounded">
                                         Submission #{submissions.length - index}
                                     </span>
                                     <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                                         {getStatusIcon(submission.status)}
                                         <span className="capitalize">{submission.status}</span>
                                     </div>
                                 </div>
                                 
                                 {/* Metadata Grid */}
                                 <div className="grid grid-cols-2 sm:flex sm:items-center sm:space-x-4 gap-2 text-sm text-zinc-400">
                                     <div className="flex items-center space-x-1">
                                         <Code className="w-3 h-3 flex-shrink-0" />
                                         <span className="truncate">{submission.language}</span>
                                     </div>
                                     <div className="flex items-center space-x-1">
                                         <Zap className="w-3 h-3 flex-shrink-0" />
                                         <span className="truncate">{formatRuntime(submission.runtime)}</span>
                                     </div>
                                     <div className="flex items-center space-x-1">
                                         <HardDrive className="w-3 h-3 flex-shrink-0" />
                                         <span className="truncate">{formatMemory(submission.memory)}</span>
                                     </div>
                                     <span className="bg-zinc-700/50 px-2 py-1 rounded text-xs text-center">
                                         {submission.testCasesPassed}/{submission.testCaseTotal}
                                     </span>
                                 </div>
                             </div>


                             {/* Footer Section */}
                             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                 <div className="flex items-center space-x-2 text-xs text-zinc-500">
                                     <Calendar className="w-3 h-3 flex-shrink-0" />
                                     <span className="truncate">{formatDate(submission.createdAt)}</span>
                                 </div>
                                 
                                 {/* Action Buttons */}
                                 <div className="flex flex-wrap gap-2">
                                     <button
                                         onClick={() => {
                                             setSelectedSubmission(submission);
                                             setShowCode(true);
                                         }}
                                         className="flex items-center space-x-1 px-3 py-1 bg-blue-600/80 hover:bg-blue-600 text-white rounded-md transition-all duration-200 text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 whitespace-nowrap"
                                     >
                                         <Eye className="w-3 h-3 flex-shrink-0" />
                                         <span className="hidden sm:inline">View Full Code</span>
                                         <span className="sm:hidden">View</span>
                                     </button>
                                     <button
                                         onClick={() => copyToClipboard(submission.code)}
                                         className="flex items-center space-x-1 px-3 py-1 bg-zinc-700/80 hover:bg-zinc-600 text-zinc-300 rounded-md transition-all duration-200 text-sm whitespace-nowrap"
                                     >
                                         <Copy className="w-3 h-3 flex-shrink-0" />
                                         <span className="hidden sm:inline">Copy</span>
                                     </button>
                                     <button
                                         onClick={() => downloadCode(submission.code, submission.language, submissions.length - index)}
                                         className="flex items-center space-x-1 px-3 py-1 bg-zinc-700/80 hover:bg-zinc-600 text-zinc-300 rounded-md transition-all duration-200 text-sm whitespace-nowrap"
                                     >
                                         <Download className="w-3 h-3 flex-shrink-0" />
                                         <span className="hidden sm:inline">Download</span>
                                     </button>
                                 </div>
                             </div>

                             {submission.errorMessage && (
                                 <div className="mt-3 p-3 bg-red-900/20 border border-red-500/30 rounded-md">
                                     <div className="text-sm text-red-400 font-medium mb-1">Error:</div>
                                     <div className="text-xs text-red-300 font-mono whitespace-pre-wrap break-words overflow-hidden">
                                         {submission.errorMessage}
                                     </div>
                                 </div>
                             )}
                         </div>
                     </div>
                 ))}
             </div>

            {/* Enhanced Code Modal */}
            {showCode && selectedSubmission && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900/95 backdrop-blur-lg rounded-xl border border-zinc-700/50 w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl shadow-black/50">
                        <div className="flex items-center justify-between p-4 border-b border-zinc-700/50 bg-zinc-800/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-white">
                                        Submission #{submissions.length - submissions.findIndex(s => s._id === selectedSubmission._id)}
                                    </h3>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSubmission.status)}`}>
                                            {getStatusIcon(selectedSubmission.status)}
                                            <span className="capitalize">{selectedSubmission.status}</span>
                                        </div>
                                        <span className="text-xs text-zinc-400">{formatDate(selectedSubmission.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => copyToClipboard(selectedSubmission.code)}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200"
                                    title="Copy Code"
                                >
                                    <Copy className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => downloadCode(selectedSubmission.code, selectedSubmission.language, submissions.length - submissions.findIndex(s => s._id === selectedSubmission._id))}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200"
                                    title="Download Code"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setShowCode(false)}
                                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-all duration-200"
                                >
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        
                        <div className="flex-1 overflow-hidden flex">
                            {/* Code Editor Section */}
                            <div className="flex-1 flex flex-col">
                                <div className="p-3 border-b border-zinc-700/50 bg-zinc-800/30">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Code className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm font-medium text-zinc-300">{selectedSubmission.language}</span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-xs text-zinc-400">
                                            <span>Runtime: {formatRuntime(selectedSubmission.runtime)}</span>
                                            <span>Memory: {formatMemory(selectedSubmission.memory)}</span>
                                            <span>Tests: {selectedSubmission.testCasesPassed}/{selectedSubmission.testCaseTotal}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <MonacoEditor
                                        height="100%"
                                        language={selectedSubmission.language.toLowerCase()}
                                        theme="vs-dark"
                                        value={selectedSubmission.code}
                                        options={{
                                            readOnly: true,
                                            minimap: { enabled: false },
                                            fontSize: 14,
                                            wordWrap: 'on',
                                            lineNumbers: 'on',
                                            scrollBeyondLastLine: false,
                                            automaticLayout: true
                                        }}
                                    />
                                </div>
                            </div>
                            
                            {/* Details Panel */}
                            <div className="w-80 border-l border-zinc-700/50 bg-zinc-800/30 flex flex-col">
                                <div className="p-4 border-b border-zinc-700/50">
                                    <h4 className="text-sm font-semibold text-white mb-3">Execution Details</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Status:</span>
                                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedSubmission.status)}`}>
                                                {getStatusIcon(selectedSubmission.status)}
                                                <span className="capitalize">{selectedSubmission.status}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Language:</span>
                                            <span className="text-zinc-200 text-sm">{selectedSubmission.language}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Runtime:</span>
                                            <span className="text-zinc-200 text-sm">{formatRuntime(selectedSubmission.runtime)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Memory:</span>
                                            <span className="text-zinc-200 text-sm">{formatMemory(selectedSubmission.memory)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Test Cases:</span>
                                            <span className="text-zinc-200 text-sm">{selectedSubmission.testCasesPassed}/{selectedSubmission.testCaseTotal}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-zinc-400 text-sm">Submitted:</span>
                                            <span className="text-zinc-200 text-sm">{formatDate(selectedSubmission.createdAt)}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {selectedSubmission.errorMessage && (
                                    <div className="p-4 border-b border-zinc-700/50">
                                        <h4 className="text-sm font-semibold text-red-400 mb-2">Error Details</h4>
                                        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
                                            <pre className="text-xs text-red-300 font-mono whitespace-pre-wrap break-all">
                                                {selectedSubmission.errorMessage}
                                            </pre>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="flex-1 p-4">
                                    <h4 className="text-sm font-semibold text-white mb-3">Code Statistics</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Lines of Code:</span>
                                            <span className="text-zinc-200">{selectedSubmission.code.split('\n').length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Characters:</span>
                                            <span className="text-zinc-200">{selectedSubmission.code.length}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-zinc-400">Complexity:</span>
                                            <span className="text-zinc-200">N/A</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Submissions;
