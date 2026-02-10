"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { db } from "@/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    streak: number;
    xp: number;
    signingIn: boolean;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    streak: 0,
    xp: 0,
    signingIn: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [streak, setStreak] = useState(0);
    const [xp, setXp] = useState(0);
    const [signingIn, setSigningIn] = useState(false);
    const [loginError, setLoginError] = useState("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
            if (firebaseUser) {
                // Streak/XP logic
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);
                const today = new Date().toISOString().slice(0, 10);
                let newStreak = 1;
                let newXp = 0;
                if (userSnap.exists()) {
                    const data = userSnap.data();
                    const lastLogin = data.lastLogin;
                    newXp = data.xp || 0;
                    newStreak = data.streak || 1;
                    if (lastLogin) {
                        const last = new Date(lastLogin);
                        const now = new Date(today);
                        const diff = (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24);
                        if (diff === 1) {
                            newStreak += 1;
                            newXp += 5; // XP for streak
                        } else if (diff > 1) {
                            newStreak = 1;
                        }
                    }
                } else {
                    newXp = 0;
                    newStreak = 1;
                }
                await setDoc(userRef, {
                    lastLogin: today,
                    streak: newStreak,
                    xp: newXp,
                    updatedAt: serverTimestamp(),
                    displayName: firebaseUser.displayName || "",
                    email: firebaseUser.email || ""
                }, { merge: true });
                setStreak(newStreak);
                setXp(newXp);
            } else {
                setStreak(0);
                setXp(0);
            }
        });
        return () => unsubscribe();
    }, []);

    const login = async () => {
        if (signingIn) return;
        setSigningIn(true);
        setLoginError("");
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message === "Sign-in was cancelled. Please try again and allow popups." || err.message === "Sign-in was cancelled. Please try again and allow popups.") {
                    setLoginError("Sign-in was cancelled. Please try again and allow popups.");
                } else {
                    setLoginError("Sign-in failed. Please try again.");
                }
            }
        } finally {
            setSigningIn(false);
        }
    };

    const logout = async () => {
        await signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, streak, xp, signingIn }}>
            {loginError && <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow z-50">{loginError}</div>}
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext); 