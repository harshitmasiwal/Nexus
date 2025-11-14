// import React, { useState, useEffect } from "react";
// import axiosClient from "../utils/axiosConfig";
// import axios from "axios";
// import { useLocation } from "react-router"; // Ensure 'react-router-dom' is the correct import path
// import { UploadCloud, FileVideo, UserCheck, Zap, XCircle  , CheckCircle} from "lucide-react"; // Added Lucide Icons

// const VideoAdd = () => {
//   const location = useLocation();
//   const initialState = location.state || {};

//   const [formData, setFormData] = useState({
//     problemId: initialState.problemId || "",
//     title: initialState.problemTitle || "",
//     explanation: "",
//   });

//   const [video, setVideo] = useState(null);
//   const [videoPreviewUrl, setVideoPreviewUrl] = useState(null); // NEW: Local preview URL
//   const [uploading, setUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [videoData, setVideoData] = useState(null); // Cloudinary response data
//   const [currentUser, setCurrentUser] = useState(null);
//   const [isUserVerified, setIsUserVerified] = useState(false);
//   const [globalError, setGlobalError] = useState(null);

//   // User verification
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await axiosClient.get("/user/check", { withCredentials: true });
//         const user = res.data.user;

//         setCurrentUser(user);
//         setIsUserVerified(true);
//       } catch (err) {
//         console.error("User not authenticated ❌", err.response?.data);
//         setIsUserVerified(false);
//       }
//     };
//     fetchUser();
//   }, []);

//   // Handle file selection and local preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideo(file);
      
//       // Clear previous Cloudinary preview
//       setVideoData(null); 
      
//       // Create a local URL for instant preview/thumbnail
//       if (videoPreviewUrl) {
//         URL.revokeObjectURL(videoPreviewUrl); // Clean up previous object URL
//       }
//       setVideoPreviewUrl(URL.createObjectURL(file));
//       setGlobalError(null);
//     } else {
//       setVideo(null);
//       setVideoPreviewUrl(null);
//     }
//   };

//   // Handle input changes for text fields
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Main upload handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { problemId, title, explanation } = formData;
//     setGlobalError(null);

//     if (!video) {
//       setGlobalError("Please select a video file!");
//       return;
//     }
//     if (!problemId || !title || !explanation) {
//       setGlobalError("Please fill in all editorial details!");
//       return;
//     }
//     if (!isUserVerified || !currentUser) {
//       setGlobalError("User not verified. Please log in.");
//       return;
//     }

//     setUploading(true);
//     setUploadProgress(0);

//     try {
//       // 1️⃣ Get signature
//       const sigRes = await axiosClient.get("/video/upload/signature");
//       const { timestamp, signature, apiKey, cloudName } = sigRes.data;

//       // 2️⃣ Prepare form data
//       const cloudinaryFormData = new FormData();
//       cloudinaryFormData.append("file", video);
//       cloudinaryFormData.append("api_key", apiKey);
//       cloudinaryFormData.append("timestamp", timestamp);
//       cloudinaryFormData.append("signature", signature);
//       cloudinaryFormData.append("resource_type", "video");

//       // 3️⃣ Upload directly to Cloudinary
//       const uploadRes = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
//         cloudinaryFormData,
//         {
//           onUploadProgress: (progressEvent) => {
//             const percentCompleted = Math.round(
//               (progressEvent.loaded * 100) / progressEvent.total
//             );
//             setUploadProgress(percentCompleted);
//           },
//         }
//       );

//       const uploadedVideoData = uploadRes.data;
//       setVideoData(uploadedVideoData);

//       // 4️⃣ Save video data + editorial data to backend
//       const backendPayload = {
//         problem: problemId,
//         title: title,
//         explanation: explanation,
//         author: currentUser._id, // Send the ID to the backend
//         videoUrl: uploadedVideoData.secure_url,
//         videoPublicId: uploadedVideoData.public_id,
//         videoLength: uploadedVideoData.duration,
//         // Cloudinary automatically generates a thumbnail URL:
//         thumbnailUrl: uploadedVideoData.secure_url.replace(/\.mp4$/, '.jpg'),
//       };

//       await axiosClient.post("/video/upload/toBackend", backendPayload);

//       setGlobalError("Upload and Editorial saved successfully! ✅");
//       // Reset video-specific fields
//       setVideo(null);
//       setVideoPreviewUrl(null);

//     } catch (err) {
//       console.error("Upload failed ❌", err.response?.data || err);
//       setGlobalError("Upload failed. " + (err.response?.data?.message || err.message));
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto my-10 bg-gray-900 rounded-xl shadow-2xl border border-blue-600/50">
//       <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-8 flex items-center justify-center space-x-3">
//         <Zap className="w-8 h-8"/>
//         <span>New Editorial Video</span>
//       </h2>

//       {/* --- User/Author Display --- */}
//       {currentUser && (
//         <div className="mb-6 p-4 bg-gray-800 rounded-lg flex justify-between items-center border border-green-500/50">
//           <div className="flex items-center space-x-3">
//             <UserCheck className="w-5 h-5 text-green-400" />
//             <p className="text-base text-gray-300">
//               **Author:** <span className="text-white font-semibold">{currentUser.firstName}</span> 
//               <span className="text-gray-400"> ({currentUser.emailID})</span> {/* ✅ SHOWING EMAIL ID */}
//             </p>
//           </div>
//           <span className="text-xs text-blue-400 px-3 py-1 bg-blue-900/30 rounded-full">{currentUser.role}</span>
//         </div>
//       )}
      
//       {/* --- Global Messages --- */}
//       {globalError && (
//         <div className={`mb-6 p-3 rounded-lg flex items-center space-x-3 ${globalError.includes("✅") ? 'bg-green-900/30 border border-green-500/30 text-green-400' : 'bg-red-900/30 border border-red-500/30 text-red-400'}`}>
//           {globalError.includes("✅") ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
//           <span className="font-medium">{globalError}</span>
//         </div>
//       )}

//       {!isUserVerified && (
//         <div className="mb-6 p-4 text-red-400 text-center font-medium bg-red-900/30 rounded-lg border border-red-500/30">
//           ❌ User not authenticated. Please log in.
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-8">
//         {/* --- Editorial Details Section --- */}
//         <div className="space-y-4 border-b border-gray-700 pb-6">
//           <h3 className="text-2xl font-semibold text-gray-200">Editorial Metadata</h3>
          
//           <div>
//             <label htmlFor="problemId" className="block text-sm font-medium text-gray-400 mb-1">
//               Problem ID (Source)
//             </label>
//             <input
//               type="text"
//               id="problemId"
//               name="problemId"
//               value={formData.problemId}
//               onChange={handleInputChange}
//               required
//               readOnly={!!initialState.problemId} 
//               className={`w-full px-4 py-2 bg-gray-800 border ${initialState.problemId ? 'border-green-600/50 cursor-not-allowed opacity-80' : 'border-gray-700 focus:border-blue-500'} rounded-lg text-white`}
//             />
//              {initialState.problemId && <p className="text-xs text-green-500 mt-1">Field pre-filled from problem selection.</p>}
//           </div>

//           <div>
//             <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1">
//               Editorial Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               placeholder="Descriptive and catchy title"
//               required
//               readOnly={!!initialState.problemTitle} 
//               className={`w-full px-4 py-2 bg-gray-800 border ${initialState.problemTitle ? 'border-green-600/50 cursor-not-allowed opacity-80' : 'border-gray-700 focus:border-blue-500'} rounded-lg text-white`}
//             />
//           </div>

//           <div>
//             <label htmlFor="explanation" className="block text-sm font-medium text-gray-400 mb-1">
//               Text Explanation (Markdown/HTML)
//             </label>
//             <textarea
//               id="explanation"
//               name="explanation"
//               value={formData.explanation}
//               onChange={handleInputChange}
//               rows="6"
//               placeholder="Provide a detailed written explanation for the problem solution."
//               required
//               className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 resize-none"
//             ></textarea>
//           </div>
//         </div>

//         {/* --- Video Upload Section --- */}
//         <div className="space-y-4">
//           <h3 className="text-2xl font-semibold text-gray-200">Video File Upload</h3>

//           {/* Custom File Input/Dropzone */}
//           <label 
//             htmlFor="videoFile" 
//             className={`block p-6 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer 
//               ${video ? 'border-blue-500 bg-blue-900/20' : 'border-gray-700 hover:border-blue-500 bg-gray-800'}`}
//           >
//             <input
//               type="file"
//               id="videoFile"
//               accept="video/*"
//               onChange={handleFileChange}
//               className="sr-only"
//             />
//             {video ? (
//                 <div className="flex items-center justify-center space-x-3">
//                     <FileVideo className="w-6 h-6 text-blue-400" />
//                     <span className="text-white font-medium">{video.name}</span>
//                     <span className="text-gray-400 text-sm">({(video.size / (1024 * 1024)).toFixed(2)} MB)</span>
//                 </div>
//             ) : (
//                 <div className="text-gray-400">
//                     <UploadCloud className="w-8 h-8 mx-auto mb-2 text-blue-500" />
//                     Drag & drop your video here, or <span className="text-blue-400 font-semibold">click to select file</span>.
//                 </div>
//             )}
//           </label>
          
//           {/* Upload Progress Bar */}
//           {uploading && (
//             <div className="mt-4 p-2 bg-gray-800 rounded-lg border border-blue-500/50">
//               <p className="text-sm text-blue-400 mb-1 font-medium">Cloudinary Upload: {uploadProgress}%</p>
//               <div className="w-full bg-gray-700 rounded-full h-3">
//                 <div
//                   className="bg-blue-600 h-3 rounded-full transition-all duration-500"
//                   style={{ width: `${uploadProgress}%` }}
//                 ></div>
//               </div>
//             </div>
//           )}

//           {/* Local Video Thumbnail/Preview */}
//           {videoPreviewUrl && !videoData && (
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold text-gray-300 mb-2">Local Video Preview (Selected)</h4>
//               <video 
//                 controls 
//                 src={videoPreviewUrl} 
//                 className="w-full h-auto max-h-96 object-contain rounded-lg shadow-xl border border-gray-700"
//                 // Adding a preload or poster might enhance UX for larger files
//                 poster={videoPreviewUrl} 
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           )}
//         </div>

//         {/* --- Submit Button --- */}
//         <button
//           type="submit"
//           disabled={uploading || !isUserVerified || !video}
//           className={`w-full py-3 rounded-lg font-bold text-white transition duration-200 
//             ${uploading || !isUserVerified || !video
//               ? "bg-gray-500 cursor-not-allowed opacity-70"
//               : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/50"
//             }`}
//         >
//           {uploading ? `Uploading... (${uploadProgress}%)` : "Publish Editorial & Upload Video"}
//         </button>
//       </form>

//       {/* --- Cloudinary Video Preview (After Upload) --- */}
//       {videoData && (
//         <div className="mt-8 border-t pt-6 border-gray-700 space-y-4">
//           <h3 className="text-xl font-semibold text-green-400">Upload Complete: Cloudinary Preview</h3>
//           <p className="text-sm text-gray-400">Public ID: <span className="text-white font-mono">{videoData.public_id}</span> | Duration: <span className="text-white font-mono">{videoData.duration.toFixed(1)}s</span></p>

//           <video controls className="w-full rounded-xl shadow-xl border border-green-600/50" key={videoData.secure_url}>
//             <source src={videoData.secure_url} type={`video/${videoData.format}`} />
//             Your browser does not support the video tag.
//           </video>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoAdd;


import React, { useState, useEffect } from "react";
import axiosClient from "../utils/axiosConfig";
import axios from "axios";
import { useLocation } from "react-router"; 
import { UploadCloud, FileVideo, UserCheck, Zap, XCircle, CheckCircle, Video, BookOpen } from "lucide-react"; 

// --- Component Start ---
const VideoAdd = () => {
    const location = useLocation();
    const initialState = location.state || {};

    // --- State Management ---
    const [formData, setFormData] = useState({
        problemId: initialState.problemId || "",
        title: initialState.problemTitle || "",
        explanation: "",
    });

    const [video, setVideo] = useState(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState(null); 
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [videoData, setVideoData] = useState(null); // Cloudinary response data
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserVerified, setIsUserVerified] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    // --- Effects & Handlers (Unchanged Logic for brevity, but moved for cleaner structure) ---

    // User verification
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get("/user/check", { withCredentials: true });
                const user = res.data.user;

                setCurrentUser(user);
                setIsUserVerified(true);
            } catch (err) {
                console.error("User not authenticated ❌", err.response?.data);
                setIsUserVerified(false);
            }
        };
        fetchUser();
    }, []);

    // Handle file selection and local preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setVideo(file);
            setVideoData(null); 
            if (videoPreviewUrl) {
                URL.revokeObjectURL(videoPreviewUrl); 
            }
            setVideoPreviewUrl(URL.createObjectURL(file));
            setGlobalError(null);
        } else {
            setVideo(null);
            setVideoPreviewUrl(null);
        }
    };

    // Handle input changes for text fields
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Main upload handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { problemId, title, explanation } = formData;
        setGlobalError(null);

        if (!video) {
            setGlobalError("Please select a video file!");
            return;
        }
        if (!problemId || !title || !explanation) {
            setGlobalError("Please fill in all editorial details!");
            return;
        }
        if (!isUserVerified || !currentUser) {
            setGlobalError("User not verified. Please log in.");
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        try {
            // 1️⃣ Get signature
            const sigRes = await axiosClient.get("/video/upload/signature");
            const { timestamp, signature, apiKey, cloudName } = sigRes.data;

            // 2️⃣ Prepare form data
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", video);
            cloudinaryFormData.append("api_key", apiKey);
            cloudinaryFormData.append("timestamp", timestamp);
            cloudinaryFormData.append("signature", signature);
            cloudinaryFormData.append("resource_type", "video");

            // 3️⃣ Upload directly to Cloudinary
            const uploadRes = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
                cloudinaryFormData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    },
                }
            );

            const uploadedVideoData = uploadRes.data;
            setVideoData(uploadedVideoData);

            // 4️⃣ Save video data + editorial data to backend
            const backendPayload = {
                problem: problemId,
                title: title,
                explanation: explanation,
                author: currentUser._id, 
                videoUrl: uploadedVideoData.secure_url,
                videoPublicId: uploadedVideoData.public_id,
                videoLength: uploadedVideoData.duration,
                // Cloudinary automatically generates a thumbnail URL:
                thumbnailUrl: uploadedVideoData.secure_url.replace(/\.mp4$/, '.jpg'),
            };

            await axiosClient.post("/video/upload/toBackend", backendPayload);

            setGlobalError("Upload and Editorial saved successfully! ✅");
            // Reset video-specific fields
            setVideo(null);
            setVideoPreviewUrl(null);

        } catch (err) {
            console.error("Upload failed ❌", err.response?.data || err);
            setGlobalError("Upload failed. " + (err.response?.data?.message || err.message));
        } finally {
            setUploading(false);
        }
    };
    
    // --- UI Structure (Refactored) ---
    return (
        // Main container uses a zinc-900 background for a deep dark theme, slightly rounded and shadowed
        <div className="min-h-screen bg-zinc-900 text-white p-4 sm:p-8">
            <div className="max-w-6xl mx-auto my-6">

                {/* --- Header --- */}
                <h2 className="text-4xl font-extrabold text-blue-400 mb-2 flex items-center space-x-3">
                    <Video className="w-8 h-8"/>
                    <span>Upload Editorial Video</span>
                </h2>
                <p className="text-zinc-400 mb-8">
                    Add the video and metadata for your solution. All fields are required.
                </p>

                {/* --- User/Author Display --- */}
                {currentUser && (
                    <div className="mb-6 p-4 bg-zinc-800 rounded-xl flex justify-between items-center border border-zinc-700">
                        <div className="flex items-center space-x-3">
                            <UserCheck className="w-5 h-5 text-green-400" />
                            <p className="text-base text-zinc-300">
                                **Author:** <span className="text-white font-semibold">{currentUser.firstName}</span> 
                                <span className="text-zinc-400"> ({currentUser.emailID})</span>
                            </p>
                        </div>
                        <span className="text-xs text-blue-400 px-3 py-1 bg-blue-900/30 rounded-full font-medium">{currentUser.role}</span>
                    </div>
                )}
                
                {/* --- Global Messages --- */}
                {globalError && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center space-x-3 ${globalError.includes("✅") ? 'bg-green-900/30 border border-green-500/30 text-green-400' : 'bg-red-900/30 border border-red-500/30 text-red-400'}`}>
                        {globalError.includes("✅") ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        <span className="font-medium">{globalError}</span>
                    </div>
                )}

                {!isUserVerified && (
                    <div className="mb-6 p-4 text-red-400 text-center font-medium bg-red-900/30 rounded-xl border border-red-500/30">
                        ❌ User not authenticated. Please log in to upload videos.
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* --- Editorial Details Card (2/3 width on large screens) --- */}
                        <div className="lg:col-span-2 p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 space-y-6">
                            <h3 className="text-2xl font-bold text-white flex items-center space-x-2 border-b border-zinc-700 pb-3">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                                <span>Details and Metadata</span>
                            </h3>

                            <div className="space-y-4">
                                {/* Problem ID */}
                                <div>
                                    <label htmlFor="problemId" className="block text-sm font-medium text-zinc-400 mb-1">
                                        Problem ID (Source) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="problemId"
                                        name="problemId"
                                        value={formData.problemId}
                                        onChange={handleInputChange}
                                        required
                                        readOnly={!!initialState.problemId} 
                                        className={`w-full px-4 py-2 bg-zinc-900 border ${initialState.problemId ? 'border-green-600/50 cursor-not-allowed opacity-80' : 'border-zinc-700 focus:border-blue-500'} rounded-lg text-white placeholder-zinc-500`}
                                    />
                                    {initialState.problemId && <p className="text-xs text-green-500 mt-1">Field pre-filled from problem selection.</p>}
                                </div>

                                {/* Title */}
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-zinc-400 mb-1">
                                        Editorial Title <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="A clear and descriptive title for the solution"
                                        required
                                        readOnly={!!initialState.problemTitle} 
                                        className={`w-full px-4 py-2 bg-zinc-900 border ${initialState.problemTitle ? 'border-green-600/50 cursor-not-allowed opacity-80' : 'border-zinc-700 focus:border-blue-500'} rounded-lg text-white placeholder-zinc-500`}
                                    />
                                </div>

                                {/* Explanation */}
                                <div>
                                    <label htmlFor="explanation" className="block text-sm font-medium text-zinc-400 mb-1">
                                        Text Explanation (Optional fallback/SEO) <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        id="explanation"
                                        name="explanation"
                                        value={formData.explanation}
                                        onChange={handleInputChange}
                                        rows="8"
                                        placeholder="Provide a detailed written explanation, supporting code, or key concepts."
                                        required
                                        className="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:ring-blue-500 focus:border-blue-500 resize-none placeholder-zinc-500"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* --- Video Upload Card (1/3 width on large screens) --- */}
                        <div className="lg:col-span-1 space-y-6">
                            
                            {/* File Uploader Section */}
                            <div className="p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center space-x-2 border-b border-zinc-700 pb-3">
                                    <UploadCloud className="w-5 h-5 text-blue-400" />
                                    <span>Video File</span>
                                </h3>

                                {/* Custom File Input/Dropzone */}
                                <label 
                                    htmlFor="videoFile" 
                                    className={`block p-8 border-2 border-dashed rounded-xl text-center transition-colors cursor-pointer 
                                        ${video ? 'border-green-500 bg-green-900/10' : 'border-zinc-700 hover:border-blue-500 bg-zinc-900'}`}
                                >
                                    <input
                                        type="file"
                                        id="videoFile"
                                        accept="video/*"
                                        onChange={handleFileChange}
                                        className="sr-only"
                                    />
                                    {video ? (
                                        <div className="flex flex-col items-center justify-center space-y-2">
                                            <FileVideo className="w-8 h-8 text-green-400" />
                                            <span className="text-white font-medium break-all">{video.name}</span>
                                            <span className="text-zinc-400 text-sm">({(video.size / (1024 * 1024)).toFixed(2)} MB)</span>
                                            <span className="text-blue-400 text-sm mt-1">Click to change file</span>
                                        </div>
                                    ) : (
                                        <div className="text-zinc-400">
                                            <UploadCloud className="w-10 h-10 mx-auto mb-2 text-blue-500" />
                                            <p>Drag & drop file, or <span className="text-blue-400 font-semibold">select video</span></p>
                                            <p className="text-xs mt-1">MP4, MOV, WEBM recommended</p>
                                        </div>
                                    )}
                                </label>
                            </div>

                            {/* Preview Section */}
                            <div className="p-6 bg-zinc-800 rounded-xl shadow-lg border border-zinc-700/50 space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center space-x-2 border-b border-zinc-700 pb-3">
                                    <Zap className="w-5 h-5 text-blue-400" />
                                    <span>Preview & Status</span>
                                </h3>

                                {/* Video Player */}
                                {videoPreviewUrl && !videoData ? (
                                    <div className="aspect-video">
                                        <video 
                                            controls 
                                            src={videoPreviewUrl} 
                                            className="w-full rounded-lg shadow-xl border border-zinc-700"
                                            poster={videoPreviewUrl} 
                                        >
                                            Your browser does not support the video tag.
                                        </video>
                                        <p className="text-sm text-zinc-400 mt-2">Local preview of selected file.</p>
                                    </div>
                                ) : videoData ? (
                                    // Cloudinary Uploaded Video
                                    <div className="aspect-video">
                                        <video controls className="w-full rounded-lg shadow-xl border border-green-600/50" key={videoData.secure_url}>
                                            <source src={videoData.secure_url} type={`video/${videoData.format}`} />
                                            Your browser does not support the video tag.
                                        </video>
                                        <p className="text-sm text-green-400 mt-2 font-medium">Upload successful! Public ID: {videoData.public_id.substring(0, 15)}...</p>
                                    </div>
                                ) : (
                                    <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-700">
                                        <p className="text-zinc-500 text-sm">No video selected for preview.</p>
                                    </div>
                                )}
                                
                                {/* Upload Progress Bar */}
                                {uploading && (
                                    <div className="p-3 bg-zinc-900 rounded-lg border border-blue-500/50">
                                        <p className="text-sm text-blue-400 mb-1 font-medium">Uploading: {uploadProgress}%</p>
                                        <div className="w-full bg-zinc-700 rounded-full h-3">
                                            <div
                                                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                                                style={{ width: `${uploadProgress}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    
                    {/* --- Submit Button --- */}
                    <button
                        type="submit"
                        disabled={uploading || !isUserVerified || !video}
                        className={`w-full py-4 rounded-xl text-lg font-bold text-white transition duration-200 uppercase tracking-wider 
                            ${uploading || !isUserVerified || !video
                                ? "bg-zinc-700 cursor-not-allowed opacity-70"
                                : "bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/30"
                            }`}
                    >
                        {uploading ? `Processing Upload... (${uploadProgress}%)` : "Publish Video & Save Editorial"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default VideoAdd;