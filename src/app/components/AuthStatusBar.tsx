"use client";
import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";

export default function AuthStatusBar() {
    const { user, loading, login, logout, streak, xp, signingIn } = useContext(AuthContext);
    if (loading) return null;
    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-[#18181b]/90 border border-[#bfc1c6]/30 rounded-xl shadow-md text-sm font-medium text-[#ededed]">
            {user ? (
                <>
                    <span className="truncate max-w-[120px] text-[#bfc1c6]">{user.displayName || user.email}</span>
                    <span className="flex items-center gap-1 bg-[#23272f] px-2 py-1 rounded-full text-[#bfc1c6] border border-[#bfc1c6]/30"><span role="img" aria-label="streak">🔥</span> {streak}</span>
                    <span className="flex items-center gap-1 bg-[#23272f] px-2 py-1 rounded-full text-[#bfc1c6] border border-[#bfc1c6]/30"><span role="img" aria-label="xp">⭐</span> {xp}</span>
                    <button className="ml-2 px-3 py-1 bg-gradient-to-r from-[#23272f] to-[#bfc1c6] hover:from-[#bfc1c6] hover:to-[#23272f] text-[#18181b] rounded-full font-semibold transition-colors border border-[#bfc1c6]/40" onClick={logout}>Logout</button>
                </>
            ) : (
                <button className="px-3 py-1 bg-gradient-to-r from-[#23272f] to-[#bfc1c6] hover:from-[#bfc1c6] hover:to-[#23272f] text-[#18181b] rounded-full font-semibold transition-colors border border-[#bfc1c6]/40 disabled:opacity-60" onClick={login} disabled={signingIn}>{signingIn ? "Signing in..." : "Login with Google"}</button>
            )}
        </div>
    );
} 