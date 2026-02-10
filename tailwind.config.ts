import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    light: '#60a5fa',
                    DEFAULT: '#2563eb',
                    dark: '#1e40af',
                },
                gray: {
                    900: '#18181b',
                    800: '#23272f',
                    100: '#f3f4f6',
                    50: '#fafafa',
                },
                blue: {
                    500: '#2563eb',
                    400: '#60a5fa',
                },
                yellow: {
                    400: '#facc15',
                },
                white: '#fff',
                black: '#000',
                glass: 'rgba(255,255,255,0.15)',
                darkglass: 'rgba(30,41,59,0.6)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            boxShadow: {
                glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                glow: '0 0 16px 4px rgba(99,102,241,0.4), 0 0 32px 8px rgba(139,92,246,0.2)',
            },
            borderColor: {
                glow: '#6366f1',
            },
            ringColor: {
                glow: '#a5b4fc',
            },
            dropShadow: {
                glass: '0 4px 24px rgba(31,38,135,0.25)',
                glow: '0 0 8px #a5b4fc',
            },
            animation: {
                fade: 'fadeIn 0.8s ease-in',
                bounce: 'bounce 1s infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 1 },
                },
            },
        },
    },
    plugins: [],
};
export default config; 