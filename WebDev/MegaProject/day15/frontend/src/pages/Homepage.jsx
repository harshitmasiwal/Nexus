import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosClient from "../utils/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/slices/authSlice";
import ProblemCardAnimated from "../components/ProblemCard";


function Homepage() {
  const [problems, setProblems] = useState([]);
  const [solvedProblem , setSolvedProblem] = useState([])
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const { data } = await axiosClient.get("problem/all/page=1/limit=100");
        setProblems(data);
        console.log(problems)
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchSolvedProblems = async ()=>{
      try{
        const {data} = await axiosClient.get("problem/user")
        setSolvedProblem(data)
        console.log(solvedProblem)
      }
      catch(error){
        console.error('Error fetching problems:', error);
      }
    }

    fetchProblems();
    if (user) fetchSolvedProblems();

  } , [user]);

  



  return (
    <>
       <div className="bg-zinc-900 min-h-screen">
            <Navbar props={user} />
            
            {/* Main Content Area */}
            <div className="pt-32 pb-8 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-gray-50 mb-3">
                        <span className="text-amber-400">Code</span> Challenges
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Dive into {problems.length} problems and sharpen your skills.
                    </p>
                </div>

                {/* Main Problem List Container */}
                <div className="bg-zinc-800/80 p-4 rounded-xl shadow-2xl shadow-black/50 overflow-hidden border border-zinc-700">


                    {/* Problem List Header Row - Updated for new card layout */}
                    <div className="hidden sm:flex items-center text-xs font-semibold uppercase text-gray-500 px-4 py-2 mb-2 border-b border-zinc-700">
                        <div className="w-12 flex-shrink-0 text-center pr-2">#</div>
                        <div className="flex-1 min-w-0 pr-4">Title</div>
                        <div className="w-32 text-center pr-4">Tags</div>
                        <div className="w-24 text-right pr-4">Difficulty</div>
                    </div>
                    
                    {/* Problem List Rows */}
                    <div className="space-y-3">
                        {problems.map((problem, index) => (
                            <ProblemCardAnimated
                                key={problem._id}
                                problem={problem}
                                idx={index + 1}
                            />
                        ))}
                    </div>
                </div>

                {/* Padding to ensure space below content */}
                <div className="h-20"></div> 
            </div>
        </div>
    </>
  );
}

export default Homepage;
