
// // import React, { useEffect, useState } from 'react';
// // import Navbar from '../components/Navbar';
// // import axiosClient from '../utils/axiosConfig';
// // import { useSelector } from 'react-redux';
// // import { motion } from 'framer-motion';

// // const Adminpanel = () => {
// //     const { user, loading } = useSelector((state) => state.auth);
// //     const [stats, setStats] = useState({ totalUsers: 0, totalProblems: 0, totalSolvedProblems: 0 });
// //     const [leaderboard, setLeaderboard] = useState([]);
// //     const [loadingData, setLoadingData] = useState(true);

// //     // Fetch data for the admin dashboard
// //     useEffect(() => {
// //         const fetchData = async () => {
// //             setLoadingData(true);
// //             try {
// //                 // Fetch stats data
// //                 const statsRes = await axiosClient.get('/admin/stats'); // Replace with your actual endpoint
// //                 setStats(statsRes.data);

// //                 // Fetch leaderboard data
// //                 const leaderboardRes = await axiosClient.get('/admin/leaderboard'); // Replace with your actual endpoint
// //                 setLeaderboard(leaderboardRes.data);
// //             } catch (error) {
// //                 console.error("Failed to fetch admin data:", error);
// //             } finally {
// //                 setLoadingData(false);
// //             }
// //         };

// //         if (user && user.role === 'admin') {
// //             fetchData();
// //         }
// //     }, [user]);

// //     // Animation variants for Framer Motion
// //     const containerVariants = {
// //         hidden: { opacity: 0 },
// //         visible: {
// //             opacity: 1,
// //             transition: {
// //                 staggerChildren: 0.1,
// //                 delayChildren: 0.2,
// //             },
// //         },
// //     };

// //     const itemVariants = {
// //         hidden: { y: 20, opacity: 0 },
// //         visible: { y: 0, opacity: 1 },
// //     };

// //     if (loading || loadingData) {
// //         return (
// //             <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
// //                 <span className="loading loading-spinner loading-lg text-amber-400"></span>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen text-gray-100 pb-16">
// //             <Navbar props={user} />

// //             <div className="pt-32 px-4 w-full max-w-7xl mx-auto">
// //                 <motion.div
// //                     initial={{ opacity: 0, y: -20 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.5 }}
// //                     className="text-center mb-12"
// //                 >
// //                     <h1 className="text-5xl font-extrabold text-amber-400 drop-shadow-lg">
// //                         Admin Dashboard
// //                     </h1>
// //                     <p className="text-gray-400 text-lg mt-2">Manage the platform's vital statistics and content.</p>
// //                 </motion.div>

// //                 {/* Platform Stats & Leaderboard (Top Section) */}
// //                 <motion.div
// //                     className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
// //                     variants={containerVariants}
// //                     initial="hidden"
// //                     animate="visible"
// //                 >
// //                     {/* Stat Cards */}
// //                     <motion.div variants={itemVariants} className="bg-zinc-800/80 p-8 rounded-2xl shadow-2xl shadow-black/50 border border-zinc-700 backdrop-blur-sm">
// //                         <h2 className="text-2xl font-bold mb-6 text-gray-50">Platform Statistics 📈</h2>
// //                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// //                             <motion.div whileHover={{ scale: 1.05 }} className="bg-zinc-700/60 p-5 rounded-lg text-center transition-transform duration-300">
// //                                 <h3 className="text-sm uppercase font-medium text-gray-400">Total Users</h3>
// //                                 <p className="text-4xl font-bold text-amber-300 mt-2">{stats.totalUsers}</p>
// //                             </motion.div>
// //                             <motion.div whileHover={{ scale: 1.05 }} className="bg-zinc-700/60 p-5 rounded-lg text-center transition-transform duration-300">
// //                                 <h3 className="text-sm uppercase font-medium text-gray-400">Total Problems</h3>
// //                                 <p className="text-4xl font-bold text-blue-300 mt-2">{stats.totalProblems}</p>
// //                             </motion.div>
// //                             <motion.div whileHover={{ scale: 1.05 }} className="bg-zinc-700/60 p-5 rounded-lg text-center transition-transform duration-300">
// //                                 <h3 className="text-sm uppercase font-medium text-gray-400">Solved Problems</h3>
// //                                 <p className="text-4xl font-bold text-emerald-300 mt-2">{stats.totalSolvedProblems}</p>
// //                             </motion.div>
// //                         </div>
// //                     </motion.div>

// //                     {/* Leaderboard */}
// //                     <motion.div variants={itemVariants} className="bg-zinc-800/80 p-8 rounded-2xl shadow-2xl shadow-black/50 border border-zinc-700 backdrop-blur-sm">
// //                         <h2 className="text-2xl font-bold mb-6 text-gray-50">Top Coders 🏆</h2>
// //                         <div className="space-y-4">
// //                             {leaderboard.slice(0, 5).map((user, index) => (
// //                                 <motion.div
// //                                     key={user.id}
// //                                     variants={itemVariants}
// //                                     className="flex items-center justify-between p-4 bg-zinc-700/60 rounded-lg transition-transform duration-300"
// //                                 >
// //                                     <div className="flex items-center space-x-4">
// //                                         <span className="text-lg font-bold text-amber-400 w-6 text-center">{index + 1}</span>
// //                                         <span className="font-medium text-gray-200">{user.name}</span>
// //                                     </div>
// //                                     <span className="text-sm font-semibold text-gray-400">{user.solved} solved</span>
// //                                 </motion.div>
// //                             ))}
// //                         </div>
// //                     </motion.div>
// //                 </motion.div>
                
// //                 {/* Quick Actions (Bottom Section) */}
// // <motion.div
// //     className="mb-12"
// //     variants={containerVariants}
// //     initial="hidden"
// //     animate="visible"
// // >
// //     <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">Quick Actions 🚀</motion.h2>
// //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //         {/* Card 1: Create Problem */}
// //         <motion.a
// //             href="/admin/create-problem"
// //             variants={itemVariants}
// //             whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
// //             className="relative overflow-hidden bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-2xl shadow-2xl p-8 transform transition-transform duration-300"
// //         >
// //             <div className="absolute inset-0 bg-black opacity-20 transform -skew-y-6"></div>
// //             <div className="relative z-10">
// //                 <h3 className="text-2xl font-extrabold mb-2">Create Problem</h3>
// //                 <p className="text-gray-200">Add a new coding challenge for users.</p>
// //             </div>
// //         </motion.a>

// //         {/* Card 2: Update Problem */}
// //         <motion.a
// //             href="/admin/update-problem"
// //             variants={itemVariants}
// //             whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
// //             className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-2xl p-8 transform transition-transform duration-300"
// //         >
// //             <div className="absolute inset-0 bg-black opacity-20 transform -skew-y-6"></div>
// //             <div className="relative z-10">
// //                 <h3 className="text-2xl font-extrabold mb-2">Update Problem</h3>
// //                 <p className="text-gray-200">Modify an existing problem's details.</p>
// //             </div>
// //         </motion.a>

// //         {/* Card 3: Delete Problem */}
// //         <motion.a
// //             href="/admin/delete-problem"
// //             variants={itemVariants}
// //             whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
// //             className="relative overflow-hidden bg-gradient-to-br from-red-500 to-orange-500 text-white rounded-2xl shadow-2xl p-8 transform transition-transform duration-300"
// //         >
// //             <div className="absolute inset-0 bg-black opacity-20 transform -skew-y-6"></div>
// //             <div className="relative z-10">
// //                 <h3 className="text-2xl font-extrabold mb-2">Delete Problem</h3>
// //                 <p className="text-gray-200">Remove a problem from the platform.</p>
// //             </div>
// //         </motion.a>
// //     </div>
// // </motion.div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Adminpanel;


// import React, { useEffect, useState } from 'react';
// import Navbar from '../components/Navbar';
// import axiosClient from '../utils/axiosConfig';
// import { useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { PlusCircle, Edit3, Trash2, Trophy } from 'lucide-react';

// const Adminpanel = () => {
//     const { user, loading } = useSelector((state) => state.auth);
//     const [stats, setStats] = useState({ totalUsers: 0, totalProblems: 0, totalSolvedProblems: 0 });
//     const [leaderboard, setLeaderboard] = useState([]);
//     const [loadingData, setLoadingData] = useState(true);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoadingData(true);
//             try {
//                 const statsRes = await axiosClient.get('/admin/stats');
//                 setStats(statsRes.data);

//                 const leaderboardRes = await axiosClient.get('/admin/leaderboard');
//                 setLeaderboard(leaderboardRes.data);
//             } catch (error) {
//                 console.error("Failed to fetch admin data:", error);
//             } finally {
//                 setLoadingData(false);
//             }
//         };

//         if (user && user.role === 'admin') fetchData();
//     }, [user]);

//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: { y: 0, opacity: 1 },
//     };

//     if (loading || loadingData) {
//         return (
//             <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
//                 <span className="loading loading-spinner loading-lg text-amber-400"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen text-gray-100 pb-16">
//             <Navbar props={user} />

//             <div className="pt-32 px-4 w-full max-w-7xl mx-auto">
//                 <motion.div
//                     initial={{ opacity: 0, y: -20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5 }}
//                     className="text-center mb-12"
//                 >
//                     <h1 className="text-5xl font-extrabold text-amber-400 drop-shadow-lg">
//                         Admin Dashboard
//                     </h1>
//                     <p className="text-gray-400 text-lg mt-2">Manage the platform's vital statistics and content.</p>
//                 </motion.div>

//                 {/* Stats & Leaderboard */}
//                 <motion.div
//                     className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     {/* Stats Cards */}
//                     <motion.div 
//                         variants={itemVariants} 
//                         className="bg-zinc-800/70 p-8 rounded-3xl shadow-xl backdrop-blur-md border border-zinc-700"
//                     >
//                         <h2 className="text-2xl font-bold mb-6 text-gray-50">Platform Statistics 📊</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//                             {[
//                                 { label: 'Total Users', value: stats.totalUsers, color: 'text-amber-400' },
//                                 { label: 'Total Problems', value: stats.totalProblems, color: 'text-blue-400' },
//                                 { label: 'Solved Problems', value: stats.totalSolvedProblems, color: 'text-emerald-400' },
//                             ].map((stat, idx) => (
//                                 <motion.div
//                                     key={idx}
//                                     whileHover={{ scale: 1.05 }}
//                                     className="bg-zinc-700/50 p-6 rounded-2xl text-center transition-transform duration-300 backdrop-blur-sm shadow-md"
//                                 >
//                                     <h3 className="text-sm uppercase font-medium text-gray-400">{stat.label}</h3>
//                                     <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>

//                     {/* Leaderboard */}
//                     <motion.div 
//                         variants={itemVariants} 
//                         className="bg-zinc-800/70 p-8 rounded-3xl shadow-xl backdrop-blur-md border border-zinc-700"
//                     >
//                         <h2 className="text-2xl font-bold mb-6 text-gray-50 flex items-center gap-2">
//                             <Trophy className="text-amber-400" /> Top Coders
//                         </h2>
//                         <div className="space-y-4">
//                             {leaderboard.slice(0, 5).map((user, index) => (
//                                 <motion.div
//                                     key={user.id}
//                                     variants={itemVariants}
//                                     className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-2xl backdrop-blur-sm shadow-md hover:bg-zinc-700/70 transition-colors duration-300"
//                                 >
//                                     <div className="flex items-center space-x-4">
//                                         <span className="text-lg font-bold text-amber-400 w-6 text-center">{index + 1}</span>
//                                         <span className="font-medium text-gray-200">{user.name}</span>
//                                     </div>
//                                     <span className="text-sm font-semibold text-gray-400">{user.solved} solved</span>
//                                 </motion.div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 </motion.div>

//                 {/* Quick Actions */}
//                 <motion.div
//                     className="mb-12"
//                     variants={containerVariants}
//                     initial="hidden"
//                     animate="visible"
//                 >
//                     <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">Quick Actions 🚀</motion.h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {[
//                             {
//                                 title: 'Create Problem',
//                                 desc: 'Add a new coding challenge for users.',
//                                 href: '/admin/create-problem',
//                                 from: 'green-500',
//                                 to: 'blue-500',
//                                 icon: <PlusCircle className="w-8 h-8" />,
//                             },
//                             {
//                                 title: 'Update Problem',
//                                 desc: 'Modify an existing problem\'s details.',
//                                 href: '/admin/update-problem',
//                                 from: 'purple-500',
//                                 to: 'pink-500',
//                                 icon: <Edit3 className="w-8 h-8" />,
//                             },
//                             {
//                                 title: 'Delete Problem',
//                                 desc: 'Remove a problem from the platform.',
//                                 href: '/admin/delete-problem',
//                                 from: 'red-500',
//                                 to: 'orange-500',
//                                 icon: <Trash2 className="w-8 h-8" />,
//                             },
//                         ].map((action, idx) => (
//                             <motion.a
//                                 key={idx}
//                                 href={action.href}
//                                 variants={itemVariants}
//                                 whileHover={{ y: -5, scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
//                                 className={`relative overflow-hidden bg-gradient-to-br from-${action.from} to-${action.to} text-white rounded-3xl shadow-2xl p-8 transform transition-transform duration-300`}
//                             >
//                                 <div className="absolute inset-0 bg-black opacity-20 transform -skew-y-6"></div>
//                                 <div className="relative z-10 flex flex-col gap-3">
//                                     <div className="flex items-center gap-3">{action.icon} <h3 className="text-2xl font-extrabold">{action.title}</h3></div>
//                                     <p className="text-gray-200">{action.desc}</p>
//                                 </div>
//                             </motion.a>
//                         ))}
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default Adminpanel;




import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axiosClient from '../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { PlusCircle, Edit3, Trash2, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router';

const Adminpanel = () => {
    const { user, loading } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({ totalUsers: 0, totalProblems: 0, totalSolvedProblems: 0 });
    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate(); // <-- useNavigate hook

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            try {
                const statsRes = await axiosClient.get('/admin/stats');
                setStats(statsRes.data);

                const leaderboardRes = await axiosClient.get('/admin/leaderboard');
                setLeaderboard(leaderboardRes.data);
            } catch (error) {
                console.error("Failed to fetch admin data:", error);
            } finally {
                setLoadingData(false);
            }
        };

        if (user && user.role === 'admin') fetchData();
    }, [user]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    if (loading || loadingData) {
        return (
            <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg text-amber-400"></span>
            </div>
        );
    }

    const quickActions = [
        {
            title: 'Create Problem',
            desc: 'Add a new coding challenge for users.',
            path: '/admin/create-problem',
            from: 'green-500',
            to: 'blue-500',
            icon: <PlusCircle className="w-8 h-8" />,
        },
        {
            title: 'Update Problem',
            desc: 'Modify an existing problem\'s details.',
            path: '/admin/update-problem',
            from: 'purple-500',
            to: 'pink-500',
            icon: <Edit3 className="w-8 h-8" />,
        },
        {
            title: 'Delete Problem',
            desc: 'Remove a problem from the platform.',
            path: '/admin/delete-problem',
            from: 'red-500',
            to: 'orange-500',
            icon: <Trash2 className="w-8 h-8" />,
        },
    ];

    return (
        <div className="bg-gradient-to-b from-zinc-900 to-black min-h-screen text-gray-100 pb-16">
            <Navbar props={user} />

            <div className="pt-32 px-4 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-extrabold text-amber-400 drop-shadow-lg">
                        Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-lg mt-2">Manage the platform's vital statistics and content.</p>
                </motion.div>

                {/* Stats & Leaderboard */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Stats Cards */}
                    <motion.div 
                        variants={itemVariants} 
                        className="bg-zinc-800/70 p-8 rounded-3xl shadow-xl backdrop-blur-md border border-zinc-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-50">Platform Statistics 📊</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            {[ 
                                { label: 'Total Users', value: stats.totalUsers, color: 'text-amber-400' },
                                { label: 'Total Problems', value: stats.totalProblems, color: 'text-blue-400' },
                                { label: 'Solved Problems', value: stats.totalSolvedProblems, color: 'text-emerald-400' },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-zinc-700/50 p-6 rounded-2xl text-center transition-transform duration-300 backdrop-blur-sm shadow-md"
                                >
                                    <h3 className="text-sm uppercase font-medium text-gray-400">{stat.label}</h3>
                                    <p className={`text-4xl font-bold mt-2 ${stat.color}`}>{stat.value}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Leaderboard */}
                    <motion.div 
                        variants={itemVariants} 
                        className="bg-zinc-800/70 p-8 rounded-3xl shadow-xl backdrop-blur-md border border-zinc-700"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-50 flex items-center gap-2">
                            <Trophy className="text-amber-400" /> Top Coders
                        </h2>
                        <div className="space-y-4">
                            {leaderboard.slice(0, 5).map((user, index) => (
                                <motion.div
                                    key={user.id}
                                    variants={itemVariants}
                                    className="flex items-center justify-between p-4 bg-zinc-700/50 rounded-2xl backdrop-blur-sm shadow-md hover:bg-zinc-700/70 transition-colors duration-300"
                                >
                                    <div className="flex items-center space-x-4">
                                        <span className="text-lg font-bold text-amber-400 w-6 text-center">{index + 1}</span>
                                        <span className="font-medium text-gray-200">{user.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-gray-400">{user.solved} solved</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    className="mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2 variants={itemVariants} className="text-3xl font-bold text-center mb-8">Quick Actions 🚀</motion.h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {quickActions.map((action, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => navigate(action.path)} // <-- navigate programmatically
                                variants={itemVariants}
                                whileHover={{ y: -5, scale: 1.03, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                                className={`relative cursor-pointer overflow-hidden bg-gradient-to-br from-${action.from} to-${action.to} text-white rounded-3xl shadow-2xl p-8 transform transition-transform duration-300`}
                            >
                                <div className="absolute inset-0 bg-black opacity-20 transform -skew-y-6"></div>
                                <div className="relative z-10 flex flex-col gap-3">
                                    <div className="flex items-center gap-3">{action.icon} <h3 className="text-2xl font-extrabold">{action.title}</h3></div>
                                    <p className="text-gray-200">{action.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Adminpanel;
