'use client';

import React, { useState, useEffect } from 'react';
import LandingNavbar from '@/components/navbar/LandingNavbar';
import Footer from '@/components/footer/Footer';
import {
    User,
    Phone,
    Mail,
    Building2,
    MapPin,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

interface Contact {
    name: string;
    phone: string;
    email: string;
    businessName: string;
    address: string;
    timestamp: string;
}

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        businessName: '',
        address: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [submitted, setSubmitted] = useState(false);

    // Load contacts from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('mscure_contacts');
        if (saved) {
            try {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setContacts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved contacts', e);
            }
        }
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};

        // Name: Alphabetic characters only
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = 'Name must contain only alphabetic characters';
        }

        // Phone: Numeric only, exactly 10 digits
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }

        // Email: Standard email validation + strict .com check
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.com$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address ending with .com (e.g., user@example.com)';
        }

        // Business/Hospital Name: Alphabetic characters only (Optional field, but validate if present)
        if (formData.businessName.trim() && !/^[A-Za-z\s]+$/.test(formData.businessName)) {

            newErrors.businessName = 'Hospital Name must contain only alphabetic characters';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
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

            const updatedContacts = [newContact, ...contacts];
            setContacts(updatedContacts);
            localStorage.setItem('mscure_contacts', JSON.stringify(updatedContacts));

            setFormData({
                name: '',
                phone: '',
                email: '',
                businessName: '',
                address: '',
            });
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Strict restriction for phone field
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
        } else if (name === 'name' || name === 'businessName') {
            // Allow only alphabets and spaces
            if (/^[A-Za-z\s]*$/.test(value)) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
            <header>
                <LandingNavbar variant="home" />
            </header>

            <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">
                        Let&apos;s <span className="text-primary-theme">Connect</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                        Scale your healthcare infrastructure with the world&apos;s most advanced digital curing platform.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Submission History / Info Side */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-sm space-y-6">
                            <h3 className="text-xl font-bold text-slate-900 tracking-tight uppercase">Contact Information</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">
                                Fill out the form and our team will get back to you within 24 hours to discuss how we can transform your clinical operations.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-theme/10 flex items-center justify-center text-primary-theme">
                                        <Mail size={18} />
                                    </div>
                                    <span className="text-slate-700 font-bold">info@mstechhive.com</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary-theme/10 flex items-center justify-center text-primary-theme">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-slate-700 font-bold">+91 9032223352</span>
                                    <div className="w-10 h-10 rounded-full bg-primary-theme/10 flex items-center justify-center text-primary-theme">
                                        <Phone size={18} />
                                    </div>
                                    <span className="text-slate-700 font-bold">+91 9492321619</span>

                                </div>
                            </div>
                        </div>


                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-10 md:p-14 rounded-[2rem] border border-slate-200 shadow-2xl relative overflow-hidden">
                            {submitted && (
                                <div className="absolute inset-0 z-50 bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all">
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                                            <CheckCircle2 size={40} />
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase">Message Received</h3>
                                        <p className="text-slate-500 font-medium">Your submission has been stored in our local pool.</p>
                                        <button
                                            onClick={() => setSubmitted(false)}
                                            className="text-primary-theme font-black text-sm uppercase underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <User size={14} className="text-primary-theme" /> Full Name
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. John Doe"
                                            className={`w-full px-5 py-4 border rounded-xl outline-none transition-all font-medium ${errors.name ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Phone size={14} className="text-primary-theme" /> Phone Number
                                        </label>
                                        <input
                                            name="phone"
                                            type="text"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="e.g. 9876543210"
                                            className={`w-full px-5 py-4 border rounded-xl outline-none transition-all font-medium ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5'}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Mail size={14} className="text-primary-theme" /> Email Address
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="e.g. john@example.com"
                                            className={`w-full px-5 py-4 border rounded-xl outline-none transition-all font-medium ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
                                    </div>

                                    {/* Business Name */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Building2 size={14} className="text-primary-theme" /> Hospital Name
                                        </label>
                                        <input
                                            name="businessName"
                                            type="text"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            className={`w-full px-5 py-4 border rounded-xl outline-none transition-all font-medium ${errors.businessName ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5'}`}
                                        />
                                        {errors.businessName && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {errors.businessName}</p>}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={14} className="text-primary-theme" /> Physical Address
                                    </label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Enter your full business or residence address"
                                        className={`w-full px-5 py-4 border rounded-xl outline-none transition-all font-medium resize-none ${errors.address ? 'border-red-500 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5'}`}
                                    />
                                    {errors.address && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1"><AlertCircle size={10} /> {errors.address}</p>}
                                </div>

                                <div className="pt-4">
                                    <button
                                        type="submit"
                                        className="w-full bg-primary-theme text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-primary-dark transition-all active:scale-[0.98] group"
                                    >
                                        Submit Details
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Submissions Table Section */}

            </main>

            <Footer />
        </div>
    );
}
