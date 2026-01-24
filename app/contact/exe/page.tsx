'use client';

import React, { useState, useEffect } from 'react';
import LandingNavbar from '@/components/navbar/LandingNavbar';
import Footer from '@/components/footer/Footer';
import { Download } from 'lucide-react';

import { saveAs } from 'file-saver';

interface Contact {
    name: string;
    phone: string;
    email: string;
    businessName: string;
    address: string;
    timestamp: string;
}

export default function ExportPage() {
    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem('mscure_contacts');
        if (saved) {
            try {
                setContacts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved contacts', e);
            }
        }
    }, []);

    const handleExport = async () => {
        if (contacts.length === 0) {
            alert('No data to export!');
            return;
        }

        try {
            // Dynamically import xlsx-populate to avoid SSR issues
            // @ts-ignore
            const XlsxPopulate = (await import('xlsx-populate/browser/xlsx-populate')).default;

            const workbook = await XlsxPopulate.fromBlankAsync();
            const sheet = workbook.sheet(0);
            sheet.name("Contacts");

            // Row 1: Title
            sheet.range("A1:F1").merged(true).value("Contact Submissions").style({
                bold: true,
                fontSize: 16,
                horizontalAlignment: "center",
                verticalAlignment: "center",
                // specific request: no fill on title
            });
            sheet.row(1).height(35);

            // Row 2: Headers
            const headers = ['Name', 'Phone Number', 'Email', 'Hospital Name', 'Address', 'Date Submitted'];
            headers.forEach((header, i) => {
                const cell = sheet.cell(2, i + 1);
                cell.value(header);
                cell.style({
                    bold: true,
                    fontColor: "ffffff",
                    fill: "1e40af", // Darker Blue
                    fontSize: 12,
                    horizontalAlignment: "left",
                    verticalAlignment: "center",
                    indent: 1
                });
            });
            sheet.row(2).height(25);

            // Data
            contacts.forEach((contact, idx) => {
                const rowIdx = idx + 3;
                sheet.cell(rowIdx, 1).value(contact.name);
                sheet.cell(rowIdx, 2).value(contact.phone);
                sheet.cell(rowIdx, 3).value(contact.email);
                sheet.cell(rowIdx, 4).value(contact.businessName);
                sheet.cell(rowIdx, 5).value(contact.address);
                sheet.cell(rowIdx, 6).value(contact.timestamp);

                // Basic alignment for data
                sheet.row(rowIdx).style({
                    horizontalAlignment: "left",
                    verticalAlignment: "center",
                    indent: 1
                });
            });

            // Column Widths (approximate conversion)
            sheet.column("A").width(25);
            sheet.column("B").width(20);
            sheet.column("C").width(30);
            sheet.column("D").width(25);
            sheet.column("E").width(40);
            sheet.column("F").width(25);

            // Generate Encrypted Blob
            const blob = await workbook.outputAsync({
                password: "MScurechain986"
            });

            saveAs(blob, `MSCure_Contacts_${new Date().toISOString().split('T')[0]}.xlsx`);

        } catch (err) {
            console.error("Export failed:", err);
            alert("Failed to generate Excel file. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
            <LandingNavbar variant="home" />

            <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full flex flex-col items-center justify-center space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
                        Data <span className="text-primary-theme">Export</span>
                    </h1>
                    <p className="text-slate-500 font-medium max-w-lg mx-auto">
                        Restricted access area for exporting contact submissions data.
                    </p>
                </div>

                <div className="bg-white p-12 rounded-[2rem] border border-slate-200 shadow-xl text-center space-y-6 max-w-md w-full">
                    <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Download size={40} />
                    </div>

                    <div>
                        <p className="text-slate-900 font-bold text-lg">{contacts.length} Records Found</p>
                        <p className="text-slate-500 text-sm">Ready for download</p>
                    </div>

                    <button
                        onClick={handleExport}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg group"
                    >
                        <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                        Download Excel
                    </button>

                    <p className="text-xs text-slate-400 font-medium">
                        Contains confidential user data. Handle with care.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
