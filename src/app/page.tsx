"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Book, List, Users, HelpCircle } from "react-feather";

const navCards = [
  { href: "/daily-word", label: "Reveal Today's Word", desc: "Get your new word and start your streak!", icon: <Book size={28} className="text-[#bfc1c6]" /> },
  { href: "/vocab", label: "My Vocabulary", desc: "Review, master, and grow your word list.", icon: <List size={28} className="text-[#bfc1c6]" /> },
  { href: "/leaderboard", label: "Leaderboard", desc: "See the top learners and your rank.", icon: <Users size={28} className="text-[#bfc1c6]" /> },
  { href: "/quiz", label: "Quiz", desc: "Test your memory and earn bonus XP any time!", icon: <HelpCircle size={28} className="text-[#bfc1c6]" /> },
];

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[80vh] gap-10 px-2 sm:px-4">
      <motion.section
        className="w-full flex flex-col items-center justify-center gap-4 mt-8"
        initial={{ opacity: 0, y: -32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-2">
          Word-A-Day
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 text-center max-w-xl mb-4">
          Learn a new word every day, test your memory, and climb the leaderboard!
        </p>
        <Link href="/daily-word" className="btn mt-2 w-full sm:w-auto text-center">
          Start Now
        </Link>
      </motion.section>
      <section className="grid grid-cols-1 gap-4 sm:gap-6 w-full max-w-3xl mt-8 md:grid-cols-2">
        {navCards.map((card, idx) => (
          <motion.a
            key={card.href}
            href={card.href}
            className="card flex items-center gap-4 hover:shadow-lg transition-shadow group w-full min-h-[80px] sm:min-h-[100px]"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.5, type: "spring", stiffness: 60 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex-shrink-0">{card.icon}</div>
            <div>
              <div className="text-lg font-semibold text-[#ededed] group-hover:text-[#bfc1c6] transition-colors">
                {card.label}
              </div>
              <div className="text-[#bfc1c6] text-sm">{card.desc}</div>
            </div>
          </motion.a>
        ))}
      </section>
    </main>
  );
}
