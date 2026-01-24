'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import SelectionChat from './SelectionChat';

import { usePathname } from 'next/navigation';

const FloatingChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Define allowed routes (Landing & Marketing pages only)
    const allowedRoutes = ['/about', '/features', '/pricing', '/solutions', '/portals'];
    const isAllowed = pathname === '/' || allowedRoutes.some(route => pathname.startsWith(route));

    if (!isAllowed) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4">
            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="w-[400px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
                    >
                        <SelectionChat onClose={() => setIsOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${isOpen ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare className="w-6 h-6" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulsing Notification Dot */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-500 border-2 border-white"></span>
                    </span>
                )}
            </motion.button>
        </div>
    );
};

export default FloatingChat;
