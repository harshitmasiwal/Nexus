import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import BannerImg from "../assets/images/banner.png";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/slices/authSlice";
import { useEffect } from "react";

function Signup() {
  const signupSchema = z.object({
    firstName: z.string().min(3, "Name cannot contain less than 3 char"),
    emailID: z.string().email(),
    password: z
      .string()
      .min(8, "Password should be strong with one upper, num & (@,#,$)"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated,navigate]);

  const submitData = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <>
      <div className="w-screen h-screen flex bg-black flex-col md:flex-row">
        {/* Left side with image and text (hidden on mobile) */}
        <div className="hidden md:block w-1/2 h-full relative">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={BannerImg}
            alt="background"
          />
          <div className="absolute inset-0 flex mt-5 justify-center">
            <h2 className="text-6xl font-bold text-white">Code Masti!</h2>
          </div>
        </div>

        {/* Right side - always visible */}
        <div className="bg-zinc-950 h-full w-full md:w-1/2 flex items-center justify-center text-white">
          <div className="flex flex-col w-full justify-center p-5 items-center ">
            <h2 className="font-bold text-3xl mb-10">Sign up!</h2>
            <div className="w-full flex justify-center items-center">
              <form
                className="w-full flex flex-col items-center"
                onSubmit={handleSubmit(submitData)}
              >
                {/* firstName */}
                <div className="w-full h-15 max-w-sm mb-4">
                  <label className="input validator w-full flex items-center gap-2 mx-auto">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </g>
                    </svg>
                    <input
                      className="w-full bg-transparent outline-none"
                      placeholder="Your Name"
                      {...register("firstName")}
                    />
                  </label>
                  {errors.firstName && (
                    <p className="validator hint text-gray-400 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                {/* email */}
                <div className="w-full h-15 max-w-sm mb-4">
                  <label className="input validator w-full flex items-center gap-2 mx-auto">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </g>
                    </svg>
                    <input
                      className="w-full bg-transparent outline-none"
                      placeholder="mail@site.com"
                      {...register("emailID")}
                    />
                  </label>
                  {errors.emailID && (
                    <p className="validator hint text-gray-400 text-sm mt-1">
                      {errors.emailID.message}
                    </p>
                  )}
                </div>

                {/* password */}
                <div className="w-full h-15 max-w-sm mb-4">
                  <label className="input validator w-full flex items-center gap-2 mx-auto">
                    <svg
                      className="h-[1em] opacity-50"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                        <circle
                          cx="16.5"
                          cy="7.5"
                          r=".5"
                          fill="currentColor"
                        ></circle>
                      </g>
                    </svg>
                    <input
                      type="password"
                      className="w-full bg-transparent outline-none"
                      placeholder="Password"
                      {...register("password")}
                    />
                  </label>
                  {errors.password && (
                    <p className="validator hint text-gray-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* submit button */}
                <button className="btn mt-4 bg-green-600 hover:bg-green-800 w-full max-w-sm">
                  Submit
                </button>
              </form>
            </div>

            <div className="flex items-center my-6 w-1/3">
              <div className="flex-grow h-[1px] bg-gray-600"></div>
              <span className="px-3 text-gray-400 text-sm">or</span>
              <div className="flex-grow h-[1px] bg-gray-600"></div>
            </div>

            {/* other login  */}
            <div className="flex flex-col gap-2 mt-5 md:flex-row">
              {/* google login */}
              <div>
                <button className="btn bg-white text-black border-[#e5e5e5]">
                  <svg
                    aria-label="Google logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  Login with Google
                </button>
              </div>
              {/* github login */}
              <div>
                <button className="btn bg-black text-white border-black">
                  <svg
                    aria-label="GitHub logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                    ></path>
                  </svg>
                  Login with GitHub
                </button>
              </div>
            </div>

            <div className="text-gray-400 text-sm mt-10">
              Already an existing user ?{" "}
              <Link to="/login">
                <p className=" inline text-green-500 font-semibold">Signin</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
