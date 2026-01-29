'use client';

import React, { useState, useEffect } from "react";
import {
    Menu,
    X,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface LandingNavbarProps {
    variant?: 'home' | 'about' | 'detail' | 'pricing';
    title?: string;
}

export default function LandingNavbar({ variant = 'home', title }: LandingNavbarProps) {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        // Force Light Mode on all pages using this navbar
        document.documentElement.classList.remove('dark');
        localStorage.setItem("theme", "light");
        document.documentElement.style.colorScheme = 'light';

        // Inject high-specificity styles to override extensions like Dark Reader
        const styleId = 'force-light-mode-style';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                html, body {
                    background-color: #ffffff !important;
                    color: #0f172a !important;
                    color-scheme: light !important;
                }
                /* Attempt to override Dark Reader's dynamic variables */
                [data-darkreader-scheme="dark"] {
                    --darkreader-bg--background: #ffffff !important;
                    --darkreader-text--foreground: #0f172a !important;
                }
            `;
            document.head.appendChild(style);
        }

        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            // Optional: Remove style on unmount if we want to allow other pages to be dark
            // const styleParams = document.getElementById(styleId);
            // if(styleParams) styleParams.remove();
        };
    }, []);

    const navLinks = [
        { name: 'About', href: '/about' },
        { name: 'Portals', href: '/portals' },
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Solutions', href: '/solutions' },
        { name: 'Contact', href: '/contact' },
    ];

    const isSticky = scrolled || mobileMenuOpen || variant === 'detail' || variant === 'pricing';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isSticky
            ? 'bg-white/95 backdrop-blur-md  shadow-sm py-3'
            : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo Section */}
                <div
                    className="flex items-center gap-2 group cursor-pointer"
                    onClick={() => router.push('/')}
                >

                    <div className="relative w-8 h-8">
                        <img
                            src="/assets/logo.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>

                    <span className="text-xl font-bold bg-linear-to-r from-primary-theme to-blue-400 bg-clip-text text-transparent">
                        MSCureChain
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`text-[18px] font-medium transition-colors relative group ${variant === 'about' && item.name === 'About'
                                ? 'text-primary-theme'
                                : 'text-muted hover:text-primary-theme'
                                }`}
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-theme origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-3">


                    <button
                        onClick={() => {
                            if (variant === 'detail') {
                                router.push('/auth/login');
                            } else {
                                router.push('/contact');
                            }
                        }}
                        className="hidden sm:block bg-primary-theme hover:bg-primary-theme/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-primary-theme/20 hover:-translate-y-0.5"
                    >
                        {variant === 'detail' ? 'Sign In' : 'Request a Free Demo'}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2.5 rounded-xl hover:bg-muted/10 text-muted transition-all"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-x-0 top-[72px] bg-background border-b border-border transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen py-8 opacity-100' : 'max-h-0 py-0 opacity-0'
                }`}>
                <div className="flex flex-col items-center gap-6 px-6">
                    {navLinks.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-lg font-semibold text-foreground hover:text-primary-theme transition-colors w-full text-center"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            setMobileMenuOpen(false);
                            router.push('/contact');
                        }}
                        className="w-full bg-primary-theme text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary-theme/20"
                    >
                        Request a Free Demo
                    </button>
                </div>
            </div>
        </nav>
    );
}
