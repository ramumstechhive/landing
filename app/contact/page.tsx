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
    Download,
    AlertCircle
} from 'lucide-react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

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

        // Email: Standard email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
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

    const handleExport = async () => {
        if (contacts.length === 0) {
            alert('No data to export!');
            return;
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Contacts');

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Phone Number', key: 'phone', width: 15 },
            { header: 'Email', key: 'email', width: 25 },
            { header: 'Business Name', key: 'businessName', width: 25 },
            { header: 'Address', key: 'address', width: 40 },
            { header: 'Date Submitted', key: 'timestamp', width: 20 },
        ];

        // Add style to headers
        worksheet.getRow(1).font = { bold: true };
        worksheet.getRow(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE0E0E0' }
        };

        contacts.forEach(contact => {
            worksheet.addRow(contact);
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `MSCure_Contacts_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Strict restriction for phone field
        if (name === 'phone') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: numericValue }));
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
            <LandingNavbar variant="home" />

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
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary-theme p-8 rounded-[1.5rem] text-white space-y-4 shadow-xl">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-black uppercase tracking-widest">Submissions Pool</h3>

                            </div>
                            <p className="text-white/80 text-sm font-medium">
                                Review and export all captured contact details for your business records.
                            </p>
                            <button
                                onClick={handleExport}
                                className="w-full bg-white text-primary-theme py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95 shadow-lg"
                            >
                                <Download size={16} className='rotate-180' /> Export
                            </button>
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
                                            <Building2 size={14} className="text-primary-theme" /> Business Name
                                        </label>
                                        <input
                                            name="businessName"
                                            type="text"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                            placeholder="Optional"
                                            className="w-full px-5 py-4 border border-slate-100 bg-slate-50 rounded-xl outline-none focus:border-primary-theme focus:ring-4 focus:ring-primary-theme/5 transition-all font-medium"
                                        />
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
                <div className="mt-24 space-y-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                        <div className="space-y-2 text-left">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Recent Submissions</h2>
                            <p className="text-slate-500 font-medium">Overview of all captured inquiries from the local pool.</p>
                        </div>
                        <button
                            onClick={handleExport}
                            className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-primary-theme transition-all active:scale-95 shadow-lg group"
                        >
                            <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                            Export Master List
                        </button>
                    </div>

                    <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Business</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Address</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {contacts.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-medium uppercase tracking-widest text-xs">
                                                No submissions found in your local storage
                                            </td>
                                        </tr>
                                    ) : (
                                        contacts.map((contact, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <span className="text-slate-900 font-bold block">{contact.name}</span>
                                                </td>
                                                <td className="px-8 py-6 space-y-1">
                                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                                        <Mail size={14} className="text-primary-theme" /> {contact.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                                        <Phone size={14} className="text-primary-theme" /> {contact.phone}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="text-sm font-bold text-slate-600 uppercase tracking-tight">
                                                        {contact.businessName || 'N/A'}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm text-slate-500 max-w-[200px] truncate group-hover:whitespace-normal group-hover:truncate-none transition-all">
                                                        {contact.address}
                                                    </p>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase">{contact.timestamp}</span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
