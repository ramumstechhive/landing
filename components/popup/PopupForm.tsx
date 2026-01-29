'use client';

import React, { useState, useEffect } from 'react';
import {
    User,
    Phone,
    Mail,
    Building2,
    MapPin,
    Calendar,
    Clock,
    X,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import TimeSlotPicker from '@/components/ui/TimeSlotPicker';
import { submitToGoogleSheets } from '@/lib/googleSheetService';

interface Contact {
    name: string;
    phone: string;
    email: string;
    businessName: string;
    address: string;
    demoDate: string;
    demoTime: string;
    timestamp: string;
}

export default function PopupForm() {
    const [isVisible, setIsVisible] = useState(false);

    // Show popup 5 seconds after component mounts
    // Show popup 5 seconds after component mounts or closes
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (!isVisible) {
            timer = setTimeout(() => {
                setIsVisible(true);
            }, 60000);
        }

        return () => clearTimeout(timer);
    }, [isVisible]);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        businessName: '',
        address: '',
        demoDate: '',
        demoTime: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // Name
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Alphabets only';
        }

        // Phone
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = '10 digits required';
        }

        // Email
        if (!formData.email.trim()) {
            newErrors.email = 'Email required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.com$/.test(formData.email)) {
            newErrors.email = 'Invalid email';
        }

        // Business Name (Optional)
        if (formData.businessName.trim() && !/^[A-Za-z\s]+$/.test(formData.businessName)) {
            newErrors.businessName = 'Alphabets only';
        }

        // Address
        if (!formData.address.trim()) {
            newErrors.address = 'Address required';
        }

        // Demo Details
        if (!formData.demoDate) {
            newErrors.demoDate = 'Date required';
        }
        if (!formData.demoTime) {
            newErrors.demoTime = 'Time required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            const newContact: Contact = {
                ...formData,
                timestamp: new Date().toLocaleString(),
            };

            // Save to local storage (same key as ContactPage)
            const saved = localStorage.getItem('mscure_contacts');
            const contacts = saved ? JSON.parse(saved) : [];
            const updatedContacts = [newContact, ...contacts];
            localStorage.setItem('mscure_contacts', JSON.stringify(updatedContacts));

            // Submit to Google Sheets (Async)
            submitToGoogleSheets(formData).then(result => {
                if (!result.success) {
                    console.error("Failed to sync with Google Sheets");
                }
            });

            setSubmitted(true);

            // Auto close after success message
            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    businessName: '',
                    address: '',
                    demoDate: '',
                    demoTime: '',
                });
                setIsVisible(false);
            }, 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else if (name === 'name' || name === 'businessName') {
            if (/^[A-Za-z\s]*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl relative overflow-hidden flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[600px] overflow-y-auto md:overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={() => { setIsVisible(false); }}
                    className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center text-slate-500 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="grid md:grid-cols-12 h-full min-h-full md:min-h-[400px]">
                    {/* Left Sidebar - Branding */}
                    <div className="hidden md:flex md:col-span-4 bg-slate-900 relative flex-col justify-between p-8 text-white">
                        <div className="absolute inset-0 bg-primary-theme/10 z-0"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-theme/20 blur-3xl z-0"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                                <span className="font-bold text-lg tracking-tight">MSCureChain</span>
                            </div>
                            <h2 className="text-3xl font-black leading-tight mb-4">
                                Future of <br />
                                <span className="text-primary-theme">Healthcare</span>
                            </h2>
                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                Book a personalized demo to see how our AI-powered platform transforms hospital operations.
                            </p>
                        </div>

                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary-theme">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span>No credit card required</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-slate-300">
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary-theme">
                                    <CheckCircle2 size={14} />
                                </div>
                                <span>30-minute walkthrough</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="md:col-span-8 flex flex-col h-full bg-white">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between md:hidden">
                            <div className="flex items-center gap-2">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src="/assets/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
                                <span className="font-bold text-slate-900">MSCureChain</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar p-5 md:p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-bold text-slate-900">Book your Demo</h3>
                                <p className="text-slate-500 text-xs">Fill in your details below.</p>
                            </div>
                            {submitted ? (
                                <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center">
                                    <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-lg mb-2">
                                        <CheckCircle2 size={32} />
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 uppercase">Request Sent!</h3>
                                    <p className="text-slate-500 font-medium max-w-xs">We&apos;ll be in touch shortly to confirm your demo slot.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-3">
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {/* Name */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <User size={12} className="text-primary-theme" /> Full Name
                                            </label>
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Phone size={12} className="text-primary-theme" /> Phone
                                            </label>
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="9876543210"
                                                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                            />
                                            {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        {/* Email */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Mail size={12} className="text-primary-theme" /> Email
                                            </label>
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                            />
                                            {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                                        </div>

                                        {/* Hospital Name */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Building2 size={12} className="text-primary-theme" /> Hospital (Optional)
                                            </label>
                                            <input
                                                name="businessName"
                                                value={formData.businessName}
                                                onChange={handleChange}
                                                placeholder="Hospital Name"
                                                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium ${errors.businessName ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                            />
                                            {errors.businessName && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.businessName}</p>}
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        {/* Date */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Calendar size={12} className="text-primary-theme" /> Demo Date
                                            </label>
                                            <input
                                                name="demoDate"
                                                type="date"
                                                value={formData.demoDate}
                                                onChange={handleChange}
                                                min={new Date().toISOString().split('T')[0]}
                                                className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium ${errors.demoDate ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                            />
                                            {errors.demoDate && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.demoDate}</p>}
                                        </div>

                                        {/* Time */}
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                                <Clock size={12} className="text-primary-theme" /> Demo Time
                                            </label>
                                            <select
                                                name="demoTime"
                                                value={formData.demoTime}
                                                onChange={handleChange}
                                                className="hidden" // Hiding original select to keep logic if needed, but replacing UI
                                            />
                                            <TimeSlotPicker
                                                value={formData.demoTime}
                                                onChange={(val) => setFormData(prev => ({ ...prev, demoTime: val }))}
                                                error={errors.demoTime}
                                            />
                                            {errors.demoTime && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.demoTime}</p>}
                                        </div>
                                    </div>

                                    {/* Address */}
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                                            <MapPin size={12} className="text-primary-theme" /> Physical Address
                                        </label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            rows={2}
                                            placeholder="Enter full address"
                                            className={`w-full px-3 py-2 border rounded-lg outline-none text-sm transition-all font-medium resize-none ${errors.address ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-2 focus:ring-primary-theme/5'}`}
                                        />
                                        {errors.address && <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-primary-theme text-white py-3 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg hover:bg-primary-dark transition-all active:scale-[0.98] mt-1"
                                    >
                                        Book Demo
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
