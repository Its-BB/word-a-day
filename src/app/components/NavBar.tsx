"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import AuthStatusBar from "@/app/components/AuthStatusBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowLeft } from "react-feather";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/daily-word", label: "Daily Word" },
    { href: "/vocab", label: "My Vocabulary" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/quiz", label: "Weekly Quiz" },
];

export default function NavBar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [goBackLink, setGoBackLink] = useState<string | null>(null);

    useEffect(() => {
        setGoBackLink(process.env.NEXT_PUBLIC_GO_BACK_LINK || null);
    }, []);

    return (
        <header className="sticky top-0 z-40 w-full glass shadow-lg backdrop-blur-md rounded-b-2xl border-b border-[#bfc1c6]/30 relative">
            <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
                <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight">
                </Link>
                <nav className="hidden md:flex gap-2">
                    {navLinks.map(link => (
                        <motion.a
                            key={link.href}
                            href={link.href}
                            className={`relative px-4 py-2 rounded-xl font-medium transition-colors flex items-center justify-center ${pathname === link.href ? "text-[#bfc1c6]" : "text-gray-100 hover:text-[#bfc1c6]"}`}
                            whileTap={{ scale: 0.96 }}
                            whileHover={{ scale: 1.06 }}
                        >
                            <span>{link.label}</span>
                            {pathname === link.href && (
                                <motion.span
                                    layoutId="nav-underline"
                                    className="absolute left-3 right-3 -bottom-1 h-1 rounded-full bg-[#bfc1c6]"
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                />
                            )}
                        </motion.a>
                    ))}
                </nav>
                <div className="flex-1 flex justify-end md:justify-end items-center gap-2">
                    <AuthStatusBar />
                    <button className="md:hidden ml-4 p-2 rounded-full hover:bg-[#23272f] focus:outline-none border border-[#bfc1c6]/40" onClick={() => setMobileOpen(true)} aria-label="Open menu">
                        <Menu size={28} color="#bfc1c6" />
                    </button>
                </div>
                {goBackLink && (
                    <Link href={goBackLink} className="absolute top-3 right-4 flex items-center justify-center w-9 h-9 rounded-full bg-[#bfc1c6] hover:bg-[#23272f] border border-[#bfc1c6]/40 transition-colors z-50" aria-label="Go Back">
                        <ArrowLeft size={20} color="#18181b" />
                    </Link>
                )}
            </div>
            {/* Mobile Drawer */}
            {mobileOpen && (
                <div className="fixed inset-0 z-50 bg-black/70 flex justify-end md:hidden">
                    <div className="w-64 glass h-full shadow-lg flex flex-col p-6 gap-4 animate-fade-in-up border-l border-[#bfc1c6]/30">
                        <button className="self-end mb-4 p-2 rounded-full hover:bg-[#23272f] border border-[#bfc1c6]/40" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                            <X size={28} color="#bfc1c6" />
                        </button>
                        {navLinks.map(link => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-lg text-lg font-medium transition-colors ${pathname === link.href ? "text-[#bfc1c6] bg-[#23272f]" : "text-gray-100 hover:text-[#bfc1c6]"}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
} 