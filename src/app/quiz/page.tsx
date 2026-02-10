"use client";
import React, { useEffect, useState } from "react";
// @ts-expect-error - Reason: confetti has no types
import confetti from "canvas-confetti";
import { useAuth } from "@/app/providers/AuthProvider";
import { db } from "@/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "react-feather";

function getRandomElements<T>(arr: T[], n: number): T[] {
    const shuffled = arr.slice().sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}

const FAKE_DEFS = [
    "A made-up definition.",
    "Another possible meaning.",
    "A random guess.",
    "A plausible but incorrect answer."
];

async function fetchWordDefinition(word: string) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!res.ok) throw new Error("No definition found");
        const data = await res.json();
        const entry = data[0];
        return (
            entry.meanings?.[0]?.definitions?.[0]?.definition || "No definition found."
        );
    } catch {
        return "No definition found.";
    }
}

export default function QuizPage() {
    const { user, streak, loading } = useAuth();
    const [questions, setQuestions] = useState<Array<{ word: string; options: string[]; correct: string }>>([]);
    const [answers, setAnswers] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!user) return;
        const fetchQuiz = async () => {
            const vocabCol = collection(db, "users", user.uid, "vocab");
            const snap = await getDocs(vocabCol);
            const words = snap.docs.map(doc => doc.data().word);
            if (words.length < 5) {
                return;
            }
            const selected = getRandomElements(words, 5);
            // Fetch real definitions for each word
            const defs = await Promise.all(selected.map(w => fetchWordDefinition(w)));
            setQuestions(selected.map((word, i) => {
                const correct = defs[i];
                const options = getRandomElements([...FAKE_DEFS, correct], 4).sort(() => 0.5 - Math.random());
                return { word, options, correct };
            }));
        };
        fetchQuiz();
    }, [user, streak]);

    useEffect(() => {
        if (submitted && score >= 4) {
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        }
    }, [submitted, score]);

    const handleAnswer = (qIdx: number, optIdx: number) => {
        setAnswers(ans => {
            const copy = [...ans];
            copy[qIdx] = optIdx;
            return copy;
        });
    };

    const handleSubmit = async () => {
        let correct = 0;
        questions.forEach((q, i) => {
            if (q.options[answers[i]] === q.correct) correct++;
        });
        setScore(correct);
        setSubmitted(true);
        if (user && correct >= 4) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, { xp: (prev: number | undefined) => (typeof prev === 'number' ? prev : 0) + 20 });
        }
    };

    if (loading) return null;
    if (!user) {
        return <main className="flex flex-col items-center justify-center min-h-[70vh] p-8"><motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card text-center">Please log in to take the quiz.</motion.div></main>;
    }
    if (questions.length === 0) {
        return <main className="flex flex-col items-center justify-center min-h-[70vh] p-8"><motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card text-center">You need at least 5 words in your vocab to take the quiz.</motion.div></main>;
    }
    if (submitted) {
        return <main className="flex flex-col items-center justify-center min-h-[70vh] p-4 sm:p-8">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card w-full max-w-md flex flex-col items-center gap-6">
                <h2 className="text-2xl font-bold mb-2 text-blue-400">Quiz Results</h2>
                <p className="mb-4 text-lg">You got {score} out of 5 correct.</p>
                {score >= 4 ? <p className="text-[#bfc1c6] font-bold flex items-center gap-2"><CheckCircle size={24} className="text-[#bfc1c6]" /> Bonus XP awarded!</p> : <p className="text-[#bfc1c6] flex items-center gap-2"><XCircle size={24} className="text-[#bfc1c6]" /> Try again next week for a bonus!</p>}
            </motion.div>
        </main>;
    }
    return (
        <main className="flex flex-col items-center justify-center min-h-[70vh] p-4 sm:p-8">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="card w-full max-w-xl flex flex-col gap-8">
                <h2 className="text-2xl font-bold mb-4 text-[#bfc1c6] text-center">Quiz</h2>
                <form onSubmit={e => { e.preventDefault(); handleSubmit(); }} className="w-full">
                    {questions.map((q, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.4, type: "spring", stiffness: 60 }} className="mb-6">
                            <div className="font-semibold mb-2">{i + 1}. What is the meaning of &quot;{q.word}&quot;?</div>
                            <div className="flex flex-col gap-2">
                                {q.options.map((opt: string, j: number) => (
                                    <label key={j} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all border border-gray-700 hover:border-blue-400 text-base sm:text-base ${answers[i] === j ? "bg-blue-500/10 border-blue-400" : "hover:bg-gray-800"}`} style={{ minHeight: 44 }}>
                                        <input type="radio" name={`q${i}`} checked={answers[i] === j} onChange={() => handleAnswer(i, j)} className="accent-blue-500" />
                                        {opt}
                                    </label>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                    <button type="submit" className="btn w-full mt-4 text-base sm:text-lg py-3">Submit Quiz</button>
                </form>
            </motion.div>
        </main>
    );
} 