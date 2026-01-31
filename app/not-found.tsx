'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-white"
    >
      {/* Main Content Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Content & Actions */}
        <div className="space-y-6">
          {/* Emergency Code Badge */}
          <div className="flex items-center gap-2 text-sm font-medium" style={{ color: '#ef4444' }}>
            <span className="text-xl">✱</span>
            <span>EMERGENCY CODE 404</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 transition-colors duration-300" style={{ color: 'var(--text-color)' }}>
              Stat! We have a{' '}
              <span className="transition-colors duration-300" style={{ color: 'var(--primary-color)' }}>missing page!</span>
            </h1>
            <p className="text-base md:text-lg transition-colors duration-300" style={{ color: 'var(--secondary-color)' }}>
              The page you are looking for seems to have been discharged early without completing its paperwork. Don't worry, the rest of the hospital is fully operational.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:opacity-90 shadow-lg shadow-blue-500/20"
              style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Return to Lobby
            </Link>
            <button
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 border-2"
              style={{
                borderColor: '#1e293b',
                color: '#1e293b',
                backgroundColor: 'transparent',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Appointment
            </button>
          </div>
        </div>

        {/* Right Side - Error Display Card */}
        <div className="relative flex justify-center items-center lg:ml-auto">
          {/* Blue Frame Container */}
          <div
            className="relative rounded-[40px] p-12 w-full max-w-md border-[14px]"
            style={{
              borderColor: '#2563eb',
              backgroundColor: '#ffffff'
            }}
          >
            {/* 404 Badge - Positioned at top right, overlapping frame */}
            <div
              className="absolute -top-10 -right-10 w-24 h-24 rounded-full flex items-center justify-center z-20 shadow-xl"
              style={{ backgroundColor: '#2563eb' }}
            >
              <div className="text-center text-white">
                <div className="text-3xl font-black leading-none">404</div>
                <div className="text-[10px] font-bold tracking-widest mt-1">ERROR</div>
              </div>
            </div>

            {/* Status Section - Positioned at bottom-left, overlapping frame */}
            <div
              className="absolute -bottom-8 -left-12 rounded-3xl px-6 py-4 flex items-center gap-4 z-20 shadow-2xl bg-white border border-gray-100"
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-red-500 animate-ping opacity-75"></div>
              </div>
              <div>
                <div className="text-[10px] font-black tracking-widest text-gray-400">STATUS</div>
                <div className="font-bold text-[#1e293b]">Page Vital Signs: Flatline</div>
              </div>
            </div>

            {/* Robot Image */}
            <div className="flex justify-center items-center min-h-[320px]">
              <img
                src="/assets/error.png"
                alt="404 Robot"
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}