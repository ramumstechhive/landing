'use client';

import React from 'react';

const SchemaScripts = () => {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "MS Tech Hive",
        "url": "https://mscurechain.com",
        "logo": "https://mscurechain.com/assets/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9032223352",
            "contactType": "customer service",
            "email": "info@mstechhive.com",
            "availableLanguage": "en"
        },
        "sameAs": [
            "https://www.facebook.com/people/M-Techhive/pfbid02aehgvVvXUYcTmT4HUYZfLGzSNjJSTJkQ6FCG7sAuj6SRPR4u8wjif1RN24pBhof6l/",
            "https://x.com/MSTECHHIVE",
            "https://www.linkedin.com/in/ms-tech-hive-08aa7a378/",
            "https://www.instagram.com/mstechhive/"
        ]
    };

    const softwareApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "MSCureChain",
        "operatingSystem": "Web, Windows, Android, iOS",
        "applicationCategory": "HealthApplication",
        "description": "MSCureChain is an all-in-one AI-powered hospital management system (HMS) digitalizing healthcare with integrated patient portals and doctor terminals.",
        "offers": {
            "@type": "Offer",
            "price": "333",
            "priceCurrency": "INR"
        }
    };

    const faqPageSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is MSCureChain?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "MSCureChain is a comprehensive, AI-powered hospital management system (HMS) designed to digitalize the recovery process. It connects patients, doctors, labs, and pharmacies on a single, secure platform for seamless healthcare delivery."
                }
            },
            {
                "@type": "Question",
                "name": "How does the AI Prescription feature work?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our AI engine analyzes patient history, symptoms, and clinical guidelines to assist doctors in generating precision-grade prescriptions. It includes built-in safety checks for drug interactions and dosage accuracy."
                }
            },
            {
                "@type": "Question",
                "name": "Is my medical data secure?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, security is our top priority. We use AES-256 encryption and follow strict HIPAA-compliant data handle practices to ensure that all patient and clinical data remain private and tamper-proof."
                }
            },
            {
                "@type": "Question",
                "name": "Can I book appointments online?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Patients can browse doctor availability and book appointments instantly  through our Frontdesk portal. The system automatically synchronizes with the doctor's schedule and sends real-time notifications."
                }
            },
            {
                "@type": "Question",
                "name": "Does MSCureChain support multi-hospital networks?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, MSCureChain is built with a scalable multi-hospital architecture, allowing healthcare groups to manage multiple branches, resources, and departments from a centralized administrative dashboard."
                }
            },{
                "@type": "Question",
                "name": "What is the Inpatient Bed Management System?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The Inpatient Bed Management System is an intelligent, hospital-wide solution designed to efficiently manage patient admissions, bed allocation, transfers, and discharges. It provides real-time visibility of bed availability, patient status, and ward utilization, enabling hospitals to optimize resources, reduce wait times, and ensure smooth inpatient care across departments."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
            />
        </>
    );
};

export default SchemaScripts;
