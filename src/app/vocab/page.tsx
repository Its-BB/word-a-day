"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { db } from "@/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle, Bookmark, Volume2 } from "react-feather";

interface VocabWord {
    word: string;
    mastered: boolean;
    review: boolean;
    addedAt: string;
}

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
        return null;
    }
}

export default function VocabPage() {
    const { user, loading } = useAuth();
    const [vocab, setVocab] = useState<VocabWord[]>([]);
    const [definitions, setDefinitions] = useState<Record<string, { word: string; phonetic: string; audio: string | null; definition: string; partOfSpeech: string }>>({});
    const [buttonLoading, setButtonLoading] = useState<Record<string, boolean>>({});
    const [buttonError, setButtonError] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!user) return;
        const fetchVocab = async () => {
            const vocabCol = collection(db, "users", user.uid, "vocab");
            const snap = await getDocs(vocabCol);
            const vocabWords = snap.docs.map(doc => doc.data() as VocabWord);
            setVocab(vocabWords);
            // Fetch definitions for all words
            const defs: Record<string, { word: string; phonetic: string; audio: string | null; definition: string; partOfSpeech: string }> = {};
            await Promise.all(vocabWords.map(async (w) => {
                const def = await fetchWordDefinition(w.word);
                if (def) defs[w.word] = def;
            }));
            setDefinitions(defs);
        };
        fetchVocab();
    }, [user]);

    const updateStatus = async (word: string, field: "mastered" | "review", value: boolean) => {
        if (!user) return;
        setButtonLoading(prev => ({ ...prev, [word]: true }));
        setButtonError(prev => ({ ...prev, [word]: "" }));
        setVocab(vocab => vocab.map(w => w.word === word ? { ...w, [field]: value } : w));
        try {
            const vocabRef = doc(db, "users", user.uid, "vocab", word);
            await updateDoc(vocabRef, { [field]: value });
        } catch {
            setButtonError(prev => ({ ...prev, [word]: "Failed to update. Try again." }));
            setVocab(vocab => vocab.map(w => w.word === word ? { ...w, [field]: !value } : w));
        } finally {
            setButtonLoading(prev => ({ ...prev, [word]: false }));
        }
    };

    if (loading) return null;
    if (!user) {
        return <main className="flex flex-col items-center justify-center min-h-[70vh] p-8"><div className="card text-center">Please log in to view your vocabulary.</div></main>;
    }

    return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] p-8">
            <div className="w-full max-w-2xl">
                <h2 className="text-3xl font-bold mb-6 text-[#bfc1c6] text-center">My Vocabulary</h2>
                {vocab.length === 0 ? (
                    <div className="card text-center text-gray-400">No words yet. Add some from the Daily Word page!</div>
                ) : (
                    <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                        {vocab.map((word, idx) => {
                            const def = definitions[word.word];
                            return (
                                <motion.li
                                    key={word.word}
                                    className="card flex flex-col gap-3 p-4 sm:p-6"
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.07, duration: 0.4, type: "spring", stiffness: 60 }}
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-2">
                                        <span className="text-2xl font-bold text-[#ededed] mb-2 sm:mb-0">{word.word}</span>
                                        {def && def.phonetic && <span className="text-[#bfc1c6] text-lg">{def.phonetic}</span>}
                                        <button
                                            onClick={() => {
                                                if (def && def.audio) {
                                                    new Audio(def.audio).play();
                                                } else {
                                                    const utter = new window.SpeechSynthesisUtterance(word.word);
                                                    window.speechSynthesis.speak(utter);
                                                }
                                            }}
                                            className="text-[#bfc1c6] hover:text-[#ededed] transition-colors"
                                            title="Pronounce"
                                        >
                                            <Volume2 size={20} />
                                        </button>
                                    </div>
                                    {def && <div className="text-[#bfc1c6] text-base mb-1">{def.definition}</div>}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 mt-2 w-full">
                                        <button
                                            className={`btn flex items-center gap-2 text-sm w-full sm:w-auto justify-center ${word.mastered ? "bg-[#bfc1c6] text-[#18181b] hover:bg-[#ededed]" : "bg-[#23272f] text-[#bfc1c6] hover:bg-[#bfc1c6] hover:text-[#18181b]"}`}
                                            disabled={buttonLoading[word.word]}
                                            onClick={() => updateStatus(word.word, "mastered", !word.mastered)}
                                        >
                                            <CheckCircle size={18} className={word.mastered ? "text-[#18181b]" : "text-[#bfc1c6] opacity-50"} />
                                            {word.mastered ? " Mastered" : "Mark Mastered"}
                                        </button>
                                        <button
                                            className={`btn flex items-center gap-2 text-sm w-full sm:w-auto justify-center ${word.review ? "bg-[#bfc1c6] text-[#18181b] hover:bg-[#ededed]" : "bg-[#23272f] text-[#bfc1c6] hover:bg-[#bfc1c6] hover:text-[#18181b]"}`}
                                            disabled={buttonLoading[word.word]}
                                            onClick={() => updateStatus(word.word, "review", !word.review)}
                                        >
                                            <Bookmark size={18} className={word.review ? "text-[#18181b]" : "text-[#bfc1c6] opacity-50"} />
                                            {word.review ? " Review" : "Mark Review"}
                                        </button>
                                    </div>
                                    {buttonError[word.word] && <div className="text-red-500 text-xs mt-1">{buttonError[word.word]}</div>}
                                </motion.li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </main>
    );
} 