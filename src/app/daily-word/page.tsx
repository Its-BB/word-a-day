"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Volume2, PlusCircle, CheckCircle } from "react-feather";

const LOCAL_WORDS = ["serendipity", "ephemeral", "sonder", "luminous", "zenith", "quixotic", "sonder", "sonder", "sonder"];

async function fetchWordDefinition(word: string) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error("No definition found");
        const data = await res.json();
        const entry = data[0];
        return {
            word: entry.word,
            phonetic: entry.phonetic || (entry.phonetics && entry.phonetics[0]?.text) || "",
            audio: entry.phonetics && entry.phonetics.find((p: Record<string, unknown>) => p.audio)?.audio,
            definition: entry.meanings?.[0]?.definitions?.[0]?.definition || "No definition found.",
            partOfSpeech: entry.meanings?.[0]?.partOfSpeech || "",
        };
    } catch {
        return {
            word,
            phonetic: "",
            audio: null,
            definition: "No definition found.",
            partOfSpeech: "",
        };
    }
}

function getTodayKey() {
    return new Date().toISOString().slice(0, 10);
}

interface WordDefinition {
    word: string;
    phonetic: string;
    audio: string | null;
    definition: string;
    partOfSpeech: string;
}

export default function DailyWordPage() {
    const { user, loading } = useAuth();
    const [word, setWord] = useState<string | null>(null);
    const [definition, setDefinition] = useState<WordDefinition | null>(null);
    const [error, setError] = useState("");
    const [added, setAdded] = useState(false);

    // On mount, check for today's word in localStorage
    useEffect(() => {
        const today = getTodayKey();
        const saved = localStorage.getItem("wad-today-word");
        const savedDate = localStorage.getItem("wad-today-date");
        if (saved && savedDate === today) {
            setWord(saved);
            fetchWordDefinition(saved).then(setDefinition);
        }
    }, []);

    const revealWord = async () => {
        setError("");
        const today = getTodayKey();
        let todayWord = localStorage.getItem("wad-today-word");
        const savedDate = localStorage.getItem("wad-today-date");
        if (!todayWord || savedDate !== today) {
            todayWord = LOCAL_WORDS[Math.floor(Math.random() * LOCAL_WORDS.length)];
            localStorage.setItem("wad-today-word", todayWord);
            localStorage.setItem("wad-today-date", today);
        }
        setWord(todayWord);
        const def = await fetchWordDefinition(todayWord);
        setDefinition(def);
    };

    const addToVocab = async () => {
        if (!user || !word) return;
        try {
            const vocabRef = doc(db, "users", user.uid, "vocab", word);
            await setDoc(vocabRef, { word, mastered: false, review: false, addedAt: new Date().toISOString() });
            setAdded(true);
        } catch {
            setAdded(true); // allow local add if offline
        }
    };

    if (loading) return null;
    if (!user) {
        return <main className="flex flex-col items-center justify-center min-h-[70vh] p-8"><motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card text-center">Please log in to reveal today&apos;s word.</motion.div></main>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] p-4 sm:p-8">
            <motion.div
                className="card w-full max-w-md flex flex-col items-center gap-6 p-4 sm:p-8"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-2 text-[#bfc1c6]">Today&apos;s Word</h2>
                {loading ? (
                    <div className="text-gray-400">Loading...</div>
                ) : word && definition ? (
                    <>
                        <div className="flex flex-col sm:flex-row items-center gap-3 text-3xl sm:text-4xl font-extrabold text-[#ededed] select-text">
                            {definition.word}
                            {definition.phonetic && <span className="text-lg text-[#bfc1c6]">{definition.phonetic}</span>}
                            <button onClick={() => {
                                if (definition.audio) {
                                    new Audio(definition.audio).play();
                                } else {
                                    const utter = new window.SpeechSynthesisUtterance(word);
                                    window.speechSynthesis.speak(utter);
                                }
                            }} className="text-[#bfc1c6] hover:text-[#ededed] transition-colors mt-2 sm:mt-0" title="Pronounce">
                                <Volume2 size={28} />
                            </button>
                        </div>
                        <div className="text-[#bfc1c6] text-center text-lg">{definition.definition}</div>
                        <button onClick={addToVocab} disabled={added} className={`btn flex items-center gap-2 w-full sm:w-auto justify-center ${added ? "bg-[#bfc1c6] text-[#18181b] hover:bg-[#ededed]" : "bg-[#23272f] text-[#bfc1c6] hover:bg-[#bfc1c6] hover:text-[#18181b]"}`}>
                            {added ? <CheckCircle size={22} /> : <PlusCircle size={22} />}
                            {added ? "Added to My List" : "Add to My List"}
                        </button>
                    </>
                ) : (
                    <button onClick={revealWord} disabled={loading} className="btn flex items-center gap-2 w-full sm:w-auto justify-center">
                        <PlusCircle size={22} />
                        Reveal Today&apos;s Word
                    </button>
                )}
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </motion.div>
        </main>
    );
}