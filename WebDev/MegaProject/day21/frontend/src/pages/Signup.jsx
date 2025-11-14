

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import BannerImg from "../assets/images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Key, Github, Loader2 } from "lucide-react";

const signupSchema = z.object({
  firstName: z.string().min(3, "Name too short"),
  emailID: z.string().email("Invalid email"),
  password: z.string().min(8, "Include uppercase, number & special char"),
});

function Signup() {
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
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setShowError(error);
      const timer = setTimeout(() => setShowError(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const submitData = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <div className="w-screen h-screen flex bg-gradient-to-br from-gray-950 via-black to-gray-900 flex-col md:flex-row relative overflow-hidden">
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
            <span className="bg-gradient-to-r from-green-400 via-white to-orange-400 bg-clip-text text-transparent">
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
          {/* Header */}
          <div className="text-center mb-10">
            <h2
              className={`font-bold text-4xl mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-1000 delay-200 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              Create Account
            </h2>
            <p
              className={`text-gray-500 text-sm transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0"
              }`}
            >
              Sign up to join the coding journey
            </p>
          </div>

          {/* Form */}
          <div className="w-full flex justify-center items-center max-w-md">
            <form
              className="w-full flex flex-col items-center space-y-6"
              onSubmit={handleSubmit(submitData)}
            >
              {/* Name */}
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
                      placeholder="Your Name"
                      {...register("firstName")}
                    />
                  </div>
                </div>
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-2 animate-shake">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Email */}
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

              {/* Password */}
              <div
                className={`w-full transition-all duration-1000 delay-600 ${
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

              {/* Submit */}
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
                style={{ transitionDelay: "700ms" }}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          </div>

          {/* Divider */}
          <div
            className={`flex items-center my-8 w-full max-w-md transition-all duration-1000 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>

          {/* Social login */}
          <div
            className={`flex flex-col gap-3 w-full max-w-md transition-all duration-1000 delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
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

            <button className="group relative w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center border border-gray-700">
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Github className="h-5 w-5 mr-3" />
              <span className="relative">Continue with GitHub</span>
            </button>
          </div>

          {/* Login link */}
          <div
            className={`text-gray-300 text-sm mt-8 transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-400 hover:text-red-300 font-semibold transition-colors duration-300 hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Error Popup */}
        {showError && (
          <div className="fixed top-6 right-6 z-50 animate-fade-in">
            <div className="alert shadow-xl rounded-lg bg-zinc-200 text-black w-80 border border-gray-200 flex items-center">
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
              <div className="flex-1">
                <h3 className="font-bold text-black">Authentication Error</h3>
                <p className="text-sm text-zinc-700 mt-1">{showError}</p>
              </div>
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

export default Signup;
