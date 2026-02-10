"use client";
import FloatingIcons from "./FloatingIcons";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <FloatingIcons />
            {children}
        </>
    );
} 