import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import axiosClient from '../utils/axiosConfig';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { PlusCircle, Edit3, Trash2, Trophy, Users, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';

const Adminpanel = () => {
    const { user, loading } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({ totalUsers: 0, totalProblems: 0, totalSolvedProblems: 0 });
    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoadingData(true);
            try {
                // Mock data for now since these endpoints might not exist
                setStats({ 
                    totalUsers: 150, 
                    totalProblems: 25, 
                    totalSolvedProblems: 1200 
                });
                
                setLeaderboard([
                    { id: 1, name: 'John Doe', solved: 45 },
                    { id: 2, name: 'Jane Smith', solved: 38 },
                    { id: 3, name: 'Mike Johnson', solved: 32 },
                    { id: 4, name: 'Sarah Wilson', solved: 28 },
                    { id: 5, name: 'Alex Brown', solved: 25 },
                ]);
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
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
                    <p className="text-zinc-300">Loading admin dashboard...</p>
                </div>
            </div>
        );
    }

    const quickActions = [
        {
            title: 'Create Problem',
            desc: 'Add a new coding challenge for users.',
            path: '/admin/create-problem',
            icon: <PlusCircle className="w-8 h-8" />,
            color: 'from-green-600 to-emerald-600',
        },
        {
            title: 'Update Problem',
            desc: 'Modify an existing problem\'s details.',
            path: '/admin/update-problem',
            icon: <Edit3 className="w-8 h-8" />,
            color: 'from-blue-600 to-cyan-600',
        },
        {
            title: 'Delete Problem',
            desc: 'Remove a problem from the platform.',
            path: '/admin/delete-problem',
            icon: <Trash2 className="w-8 h-8" />,
            color: 'from-red-600 to-orange-600',
        },
    ];

    return (
        <div className="bg-zinc-900 pt-24 min-h-screen text-zinc-100">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-zinc-100 mb-4">
                        Admin Dashboard
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Manage the platform's vital statistics and content.
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div 
                        variants={itemVariants}
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-amber-900/20 rounded-lg">
                                <Users className="w-6 h-6 text-amber-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100">Total Users</h3>
                        </div>
                        <p className="text-3xl font-bold text-amber-400">{stats.totalUsers}</p>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-blue-900/20 rounded-lg">
                                <BookOpen className="w-6 h-6 text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100">Total Problems</h3>
                        </div>
                        <p className="text-3xl font-bold text-blue-400">{stats.totalProblems}</p>
                    </motion.div>

                    <motion.div 
                        variants={itemVariants}
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-green-900/20 rounded-lg">
                                <Target className="w-6 h-6 text-green-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100">Solved Problems</h3>
                        </div>
                        <p className="text-3xl font-bold text-green-400">{stats.totalSolvedProblems}</p>
                    </motion.div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                    {/* Leaderboard */}
                    <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-yellow-900/20 rounded-lg">
                                <Trophy className="w-6 h-6 text-yellow-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-100">Top Coders</h2>
                        </div>
                        <div className="space-y-3">
                            {leaderboard.map((user, index) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-3 bg-zinc-700 rounded-lg hover:bg-zinc-700/80 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-lg font-bold text-amber-400 w-6 text-center">
                                            {index + 1}
                                        </span>
                                        <span className="font-medium text-zinc-200">{user.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold text-zinc-400">
                                        {user.solved} solved
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div 
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="bg-zinc-800 rounded-xl p-6 border border-zinc-700"
                    >
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-purple-900/20 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <h2 className="text-xl font-semibold text-zinc-100">Quick Actions</h2>
                        </div>
                        <div className="space-y-3">
                            {quickActions.map((action, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => navigate(action.path)}
                                    className="w-full flex items-center space-x-3 p-4 bg-zinc-700 rounded-lg hover:bg-zinc-700/80 transition-colors group"
                                >
                                    <div className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                                        {action.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3 className="font-semibold text-zinc-100 group-hover:text-zinc-50">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-zinc-400 group-hover:text-zinc-300">
                                            {action.desc}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Action Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {quickActions.map((action, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ y: -5, scale: 1.02 }}
                            className="cursor-pointer"
                            onClick={() => navigate(action.path)}
                        >
                            <div className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
                                <div className="flex items-center space-x-3 mb-4">
                                    {action.icon}
                                    <h3 className="text-xl font-bold">{action.title}</h3>
                                </div>
                                <p className="text-white/90">{action.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Adminpanel;