// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router";
// import BannerImg from "../assets/images/banner.png";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../store/slices/authSlice";
// import { useEffect, useState } from "react";

// const signinSchema = z.object({
//   emailID: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be ≥ 8 chars"),
// });

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const [showError, setShowError] = useState(null);
//   const [showPass, setShowPass] = useState("password");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signinSchema),
//   });

//   // Navigate on successful login
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   // Show toast popup for login/register errors only
//   useEffect(() => {
//     if (error) {
//       setShowError(error);
//       const timer = setTimeout(() => setShowError(null), 4000); // hide after 4 sec
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const submitData = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <>
//       <div className="w-screen h-screen flex bg-black flex-col md:flex-row relative">
//         {/* Left side with image */}
//         <div className="hidden md:block w-1/2 h-full relative">
//           <img
//             className="absolute inset-0 w-full h-full object-cover"
//             src={BannerImg}
//             alt="background"
//           />
//           <div className="absolute inset-0 flex mt-5 justify-center">
//             <h2 className="text-6xl font-bold text-white">Code Masti!</h2>
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="bg-zinc-950 h-full w-full md:w-1/2 flex items-center justify-center text-white">
//           <div className="flex flex-col w-full justify-center p-5 items-center ">
//             <h2 className="font-bold text-3xl mb-10">Sign in!</h2>
//             <div className="w-full flex justify-center items-center">
//               <form
//                 className="w-full flex flex-col items-center"
//                 onSubmit={handleSubmit(submitData)}
//               >
//                 {/* Email */}
//                 <div className="w-full h-15 max-w-sm mb-4">
//                   <label className="input validator w-full flex items-center gap-2 mx-auto">
//                     <svg
//                       className="h-[1em] opacity-50"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                     >
//                       <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         strokeWidth="2.5"
//                         fill="none"
//                         stroke="currentColor"
//                       >
//                         <rect width="20" height="16" x="2" y="4" rx="2"></rect>
//                         <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
//                       </g>
//                     </svg>
//                     <input
//                       className="w-full bg-transparent outline-none"
//                       placeholder="mail@site.com"
//                       {...register("emailID")}
//                     />
//                   </label>
//                   {errors.emailID && (
//                     <p className="validator hint text-red-500 text-xs mt-1">
//                       {errors.emailID.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Password */}
//                 <div className="w-full h-15 max-w-sm mb-4">
//                   <label className="input validator w-full flex items-center gap-2 mx-auto">
//                     <svg
//                       className="h-[1em] opacity-50"
//                       xmlns="http://www.w3.org/2000/svg"
//                       viewBox="0 0 24 24"
//                     >
//                       <g
//                         strokeLinejoin="round"
//                         strokeLinecap="round"
//                         strokeWidth="2.5"
//                         fill="none"
//                         stroke="currentColor"
//                       >
//                         <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
//                         <circle
//                           cx="16.5"
//                           cy="7.5"
//                           r=".5"
//                           fill="currentColor"
//                         ></circle>
//                       </g>
//                     </svg>
//                     <input
//                       type={showPass}
//                       className="w-full bg-transparent outline-none"
//                       placeholder="●●●●●●●●●●●"
//                       {...register("password")}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPass(
//                           showPass === "password" ? "text" : "password"
//                         )
//                       }
//                     >
//                       {showPass === "password" ? (
//                         <svg
//                           width="1rem"
//                           height="1rem"
//                           viewBox="0 0 24 24"
//                           fill="white"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             d="M20 14.8335C21.3082 13.3317 22 12 22 12C22 12 18.3636 5 12 5C11.6588 5 11.3254 5.02013 11 5.05822C10.6578 5.09828 10.3244 5.15822 10 5.23552M12 9C12.3506 9 12.6872 9.06015 13 9.17071C13.8524 9.47199 14.528 10.1476 14.8293 11C14.9398 11.3128 15 11.6494 15 12M3 3L21 21M12 15C11.6494 15 11.3128 14.9398 11 14.8293C10.1476 14.528 9.47198 13.8524 9.1707 13C9.11386 12.8392 9.07034 12.6721 9.04147 12.5M4.14701 9C3.83877 9.34451 3.56234 9.68241 3.31864 10C2.45286 11.1282 2 12 2 12C2 12 5.63636 19 12 19C12.3412 19 12.6746 18.9799 13 18.9418"
//                             stroke="white"
//                             strokeWidth="1.5"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                           />
//                         </svg>
//                       ) : (
//                         <svg
//                           fill="white"
//                           width="1rem"
//                           height="1rem"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
//                         </svg>
//                       )}
//                     </button>
//                   </label>
//                   {errors.password && (
//                     <p className="validator hint text-red-500 text-xs mt-1">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit */}
//                 <button
//                 disabled={loading}
//                  className="btn mt-4 bg-green-600 hover:bg-green-800 w-full max-w-sm">
//                   Submit
//                 </button>
//               </form>
//             </div>

//             <div className="flex items-center my-6 w-1/3">
//               <div className="flex-grow h-[1px] bg-gray-600"></div>
//               <span className="px-3 text-gray-400 text-xs">OR</span>
//               <div className="flex-grow h-[1px] bg-gray-600"></div>
//             </div>

//             {/* Other login buttons */}
//             <div className="flex flex-col gap-2 mt-5 md:flex-row">
//               {/* Google */}
//               <div>
//                 <button className="btn bg-white text-black border-[#e5e5e5]">
//                   Login with Google
//                 </button>
//               </div>
//               {/* GitHub */}
//               <div>
//                 <button className="btn bg-black text-white border-black">
//                   Login with GitHub
//                 </button>
//               </div>
//             </div>

//             <div className="text-gray-200 text-xs mt-10">
//               Are you a new user ?{" "}
//               <Link to="/signup">
//                 <p className=" inline text-green-500 font-semibold">Signup</p>
//               </Link>
//             </div>
//           </div>

//           {/* Error Popup */}
//           {showError && (
//             <div className="fixed top-5 right-5 bg-red-600 text-white text-sm px-4 py-3 rounded shadow-lg z-50">
//               {showError}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Login;

// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Link, useNavigate } from "react-router";
// import BannerImg from "../assets/images/banner.png";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../store/slices/authSlice";
// import { useEffect, useState } from "react";
// import { Eye, EyeOff, Mail, Key, Github, Loader2 } from "lucide-react";

// const signinSchema = z.object({
//   emailID: z.string().email("Invalid email"),
//   password: z.string().min(8, "Password must be ≥ 8 chars"),
// });

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const [showError, setShowError] = useState(null);
//   const [showPass, setShowPass] = useState("password");
//   const [isVisible, setIsVisible] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(signinSchema),
//   });

//   // Trigger entrance animation
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   // Navigate on successful login
//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate("/");
//     }
//   }, [isAuthenticated, navigate]);

//   // Show toast popup for login/register errors only
//   useEffect(() => {
//     if (error) {
//       setShowError(error);
//       const timer = setTimeout(() => setShowError(null), 4000);
//       return () => clearTimeout(timer);
//     }
//   }, [error]);

//   const submitData = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <div className="w-screen h-screen flex bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex-col md:flex-row relative overflow-hidden">
//       {/* Animated background particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
//         <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-green-400 rounded-full opacity-40 animate-ping"></div>
//         <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-50 animate-bounce"></div>
//         <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-pulse"></div>
//       </div>

//       {/* Left side with image */}
//       <div className="hidden md:block w-1/2 h-full relative group">
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
//         <img
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//           src={BannerImg}
//           alt="background"
//         />
//         <div className="absolute inset-0 flex mt-5 justify-center z-20">
//           <h2 className={`text-6xl font-bold text-white transition-all duration-1000 ${
//             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
//           }`}>
//             <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
//               Code Masti!
//             </span>
//           </h2>
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="bg-slate-900/95 backdrop-blur-sm h-full w-full md:w-1/2 flex items-center justify-center text-white relative">
//         <div className={`flex flex-col w-full justify-center p-8 items-center transition-all duration-1000 ${
//           isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
//         }`}>

//           {/* Header with staggered animation */}
//           <div className="text-center mb-10">
//             <h2 className={`font-bold text-4xl mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//             }`}>
//               Welcome Back
//             </h2>
//             <p className={`text-gray-400 text-sm transition-all duration-1000 delay-300 ${
//               isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//             }`}>
//               Sign in to continue your coding journey
//             </p>
//           </div>

//           <div className="w-full flex justify-center items-center max-w-md">
//             <form
//               className="w-full flex flex-col items-center space-y-6"
//               onSubmit={handleSubmit(submitData)}
//             >
//               {/* Email Input */}
//               <div className={`w-full transition-all duration-1000 delay-400 ${
//                 isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//               }`}>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="relative flex items-center bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 transition-all duration-300">
//                     <Mail className="h-5 w-5 text-gray-400 mr-3 transition-colors duration-300 group-focus-within:text-blue-400" />
//                     <input
//                       className="w-full bg-transparent outline-none text-white placeholder-gray-400 transition-all duration-300"
//                       placeholder="Enter your email"
//                       {...register("emailID")}
//                     />
//                   </div>
//                 </div>
//                 {errors.emailID && (
//                   <p className="text-red-400 text-xs mt-2 animate-shake">
//                     {errors.emailID.message}
//                   </p>
//                 )}
//               </div>

//               {/* Password Input */}
//               <div className={`w-full transition-all duration-1000 delay-500 ${
//                 isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//               }`}>
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                   <div className="relative flex items-center bg-slate-800/80 border border-slate-700 rounded-lg px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-400/20 transition-all duration-300">
//                     <Key className="h-5 w-5 text-gray-400 mr-3 transition-colors duration-300 group-focus-within:text-blue-400" />
//                     <input
//                       type={showPass}
//                       className="w-full bg-transparent outline-none text-white placeholder-gray-400 transition-all duration-300"
//                       placeholder="Enter your password"
//                       {...register("password")}
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         setShowPass(showPass === "password" ? "text" : "password")
//                       }
//                       className="ml-2 p-1 rounded-md hover:bg-slate-700 transition-colors duration-300"
//                     >
//                       {showPass === "password" ? (
//                         <EyeOff className="h-4 w-4 text-gray-400 hover:text-white transition-colors duration-300" />
//                       ) : (
//                         <Eye className="h-4 w-4 text-gray-400 hover:text-white transition-colors duration-300" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-400 text-xs mt-2 animate-shake">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

//               {/* Submit Button */}
//               <button
//                 disabled={loading}
//                 className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
//                           text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl
//                           transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed
//                           disabled:transform-none transition-all duration-300 flex items-center justify-center
//                           ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
//                 style={{ transitionDelay: '600ms' }}
//               >
//                 {loading ? (
//                   <>
//                     <Loader2 className="h-5 w-5 mr-2 animate-spin" />
//                     Signing In...
//                   </>
//                 ) : (
//                   'Sign In'
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Divider */}
//           <div className={`flex items-center my-8 w-full max-w-md transition-all duration-1000 delay-700 ${
//             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//           }`}>
//             <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
//             <span className="px-4 text-gray-400 text-sm font-medium">OR</span>
//             <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
//           </div>

//           {/* Social Login Buttons */}
//           <div className={`flex flex-col gap-3 w-full max-w-md transition-all duration-1000 delay-800 ${
//             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//           }`}>
//             {/* Google */}
//             <button className="group relative w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
//                 <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                 <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                 <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//                 <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//               </svg>
//               <span className="relative">Continue with Google</span>
//             </button>

//             {/* GitHub */}
//             <button className="group relative w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center border border-gray-700">
//               <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               <Github className="h-5 w-5 mr-3" />
//               <span className="relative">Continue with GitHub</span>
//             </button>
//           </div>

//           {/* Sign Up Link */}
//           <div className={`text-gray-300 text-sm mt-8 transition-all duration-1000 delay-900 ${
//             isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
//           }`}>
//             New to Code Masti?{" "}
//             <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 hover:underline">
//               Create account
//             </Link>
//           </div>
//         </div>

//         {/* Enhanced Error Popup */}
//         {showError && (
//           <div className="fixed top-6 right-6 bg-red-500 text-white text-sm px-6 py-4 rounded-lg shadow-2xl z-50 border border-red-400 animate-slide-in-right">
//             <div className="flex items-center">
//               <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//               <span className="font-medium">{showError}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import BannerImg from "../assets/images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Key, Github, Loader2 } from "lucide-react";

const signinSchema = z.object({
  emailID: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be ≥ 8 chars"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [showError, setShowError] = useState(null);
  const [showPass, setShowPass] = useState("password");
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });

  // Trigger entrance animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Navigate on successful login
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Show toast popup for login/register errors only
  useEffect(() => {
    if (error) {
      setShowError(error);
      const timer = setTimeout(() => setShowError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const submitData = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 flex-col md:flex-row relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-3/4 left-1/3 w-1 h-1 bg-orange-400 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-red-400 rounded-full opacity-35 animate-bounce"></div>
        <div className="absolute top-1/6 right-1/3 w-1 h-1 bg-yellow-500 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute top-2/3 left-1/6 w-1 h-1 bg-pink-400 rounded-full opacity-30 animate-ping"></div>
      </div>

      {/* Left side with image */}
      <div className="hidden md:block w-1/2 h-full relative group">
        <div className="absolute inset-0 z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={BannerImg}
          alt="background"
        />
        <div className="absolute inset-0 flex mt-5 justify-center z-20">
          <h2
            className={`text-6xl font-bold text-white transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
              Code Masti!
            </span>
          </h2>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-zinc-950/98 backdrop-blur-sm h-full w-full md:w-1/2 flex items-center justify-center text-white relative">
        <div
          className={`flex flex-col w-full justify-center p-8 items-center transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          {/* Header with staggered animation */}
          <div className="text-center mb-10">
            <h2
              className={`font-bold text-4xl mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              Welcome Back
            </h2>
            <p
              className={`text-gray-500 text-sm transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              Sign in to continue your coding journey
            </p>
          </div>

          <div className="w-full flex justify-center items-center max-w-md">
            <form
              className="w-full flex flex-col items-center space-y-6"
              onSubmit={handleSubmit(submitData)}
            >
              {/* Email Input */}
              <div
                className={`w-full transition-all duration-1000 delay-400 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center bg-gray-900/80 border border-gray-800 rounded-lg px-4 py-3 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20 transition-all duration-300">
                    <Mail className="h-5 w-5 text-gray-500 mr-3 transition-colors duration-300 group-focus-within:text-red-400" />
                    <input
                      className="w-full bg-transparent outline-none text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="Enter your email"
                      {...register("emailID")}
                    />
                  </div>
                </div>
                {errors.emailID && (
                  <p className="text-red-400 text-xs mt-2 animate-shake">
                    {errors.emailID.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div
                className={`w-full transition-all duration-1000 delay-500 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-5 opacity-0"
                }`}
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 to-orange-500/15 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center bg-gray-900/80 border border-gray-800 rounded-lg px-4 py-3 focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/20 transition-all duration-300">
                    <Key className="h-5 w-5 text-gray-500 mr-3 transition-colors duration-300 group-focus-within:text-red-400" />
                    <input
                      type={showPass}
                      className="w-full bg-transparent outline-none text-white placeholder-gray-500 transition-all duration-300"
                      placeholder="Enter your password"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPass(
                          showPass === "password" ? "text" : "password"
                        )
                      }
                      className="ml-2 p-1 rounded-md hover:bg-gray-800 transition-colors duration-300"
                    >
                      {showPass === "password" ? (
                        <EyeOff className="h-4 w-4 text-gray-500 hover:text-white transition-colors duration-300" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500 hover:text-white transition-colors duration-300" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-xs mt-2 animate-shake">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                disabled={loading}
                className={`w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 
                          text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl 
                          transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed 
                          disabled:transform-none transition-all duration-300 flex items-center justify-center
                          ${
                            isVisible
                              ? "translate-y-0 opacity-100"
                              : "translate-y-5 opacity-0"
                          }`}
                style={{ transitionDelay: "600ms" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div
            className={`flex items-center my-8 w-full max-w-md transition-all duration-1000 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          {/* Social Login Buttons */}
          <div
            className={`flex flex-col gap-3 w-full max-w-md transition-all duration-1000 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            {/* Google */}
            <button className="group relative w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="relative">Continue with Google</span>
            </button>

            {/* GitHub */}
            <button className="group relative w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Github className="h-5 w-5 mr-3" />
              <span className="relative">Continue with GitHub</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div
            className={`text-gray-300 text-sm mt-8 transition-all duration-1000 delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            New to Code Masti?{" "}
            <Link
              to="/signup"
              className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300 hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>

        {/* Error Popup */}
        {showError && (
          <div className="fixed top-6 right-6 z-50">
            <div className="alert shadow-xl rounded-lg bg-zinc-200 text-black w-80 border border-white flex items-center">
              {/* Error Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6 text-black animate-pulse mr-3"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01M4.93 4.93a10.003 10.003 0 
             0114.14 0 10.003 10.003 0 010 14.14 10.003 
             10.003 0 01-14.14 0 10.003 10.003 0 010-14.14z"
                />
              </svg>

              {/* Content */}
              <div className="flex-1">
                <h3 className="font-bold text-black">Authentication Error</h3>
                <p className="text-sm text-zinc-700 mt-1">{showError}</p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowError(null)}
                className="btn btn-xs btn-circle btn-ghost hover:bg-black transition-colors ml-2"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
