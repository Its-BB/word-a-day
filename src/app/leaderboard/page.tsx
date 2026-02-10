"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { motion } from "framer-motion";
import { Award, User, Star, Zap } from "react-feather";

interface LeaderboardUser {
    displayName?: string;
    email?: string;
    xp: number;
    streak: number;
}

export default function LeaderboardPage() {
    const [users, setUsers] = useState<LeaderboardUser[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            setLoading(true);
            const usersCol = collection(db, "users");
            const q = query(usersCol, orderBy("xp", "desc"), limit(10));
            const snap = await getDocs(q);
            setUsers(snap.docs.map(doc => doc.data() as LeaderboardUser));
            setLoading(false);
        };
        fetchLeaderboard();
    }, []);

    return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
            <motion.div
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold mb-6 text-[#bfc1c6] text-center">Leaderboard</h2>
                {loading ? <p>Loading...</p> : (
                    users.length === 0 ? (
                        <div className="card text-center text-gray-400">No users yet.</div>
                    ) : (
                        <>
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full text-left text-sm">
                                    <thead>
                                        <tr className="text-[#bfc1c6]/80">
                                            <th className="py-2 px-4">Rank</th>
                                            <th className="py-2 px-4">User</th>
                                            <th className="py-2 px-4">XP</th>
                                            <th className="py-2 px-4">Streak</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, i) => (
                                            <motion.tr
                                                key={i}
                                                initial={{ opacity: 0, y: 24 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: i * 0.07, duration: 0.4, type: "spring", stiffness: 60 }}
                                                className={`bg-[#23272f] ${i < 3 ? "font-bold" : ""} ${i % 2 === 1 ? "bg-opacity-80" : ""}`}
                                            >
                                                <td className="py-2 px-4">
                                                    {i < 3 ? <Award size={20} className="text-[#bfc1c6]" /> : <span className="text-[#bfc1c6]">{i + 1}</span>}
                                                </td>
                                                <td className="py-2 px-4 flex items-center gap-2"><User size={18} className="text-[#bfc1c6]" /> <span className="text-[#ededed]">{user.displayName || user.email || "Anonymous"}</span></td>
                                                <td className="py-2 px-4 text-[#bfc1c6] font-semibold"><Star size={18} className="inline align-middle mr-1 text-[#bfc1c6]" />{user.xp}</td>
                                                <td className="py-2 px-4 text-[#bfc1c6] font-semibold"><Zap size={18} className="inline align-middle mr-1 text-[#bfc1c6]" />{user.streak}</td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Mobile List */}
                            <div className="flex flex-col gap-3 md:hidden">
                                {users.map((user, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.07, duration: 0.4, type: "spring", stiffness: 60 }}
                                        className={`card flex flex-row items-center gap-3 ${i < 3 ? "font-bold" : ""}`}
                                        style={{ background: 'linear-gradient(135deg, #18181b 0%, #23272f 60%, #bfc1c6 100%)', border: '1.5px solid #bfc1c6' }}
                                    >
                                        <div className="flex flex-col items-center justify-center w-10">
                                            {i < 3 ? <Award size={20} className="text-[#bfc1c6]" /> : <span className="text-lg text-[#bfc1c6]">{i + 1}</span>}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-[#bfc1c6]"><User size={18} /> <span className="text-[#ededed]">{user.displayName || user.email || "Anonymous"}</span></div>
                                            <div className="flex gap-4 mt-1">
                                                <span className="text-[#bfc1c6] font-semibold"><Star size={18} className="inline align-middle mr-1 text-[#bfc1c6]" />{user.xp}</span>
                                                <span className="text-[#bfc1c6] font-semibold"><Zap size={18} className="inline align-middle mr-1 text-[#bfc1c6]" />{user.streak}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )
                )}
            </motion.div>
        </main>
    );
} 