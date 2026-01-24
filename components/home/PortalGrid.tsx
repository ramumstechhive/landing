'use client';

import React from 'react';
import {
  User,
  Stethoscope,
  Building2,
  Beaker,
  Pill,
  Truck,
  Headset,
  Users,
  FileText,
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const servicePortals = [
  {
    title: 'Patient Portal',
    desc: 'Access your health records, book appointments, and view reports.',
    icon: User,
    color: 'blue',
    image: '/assets/patinet.jpeg',
    classes: {
      bg: 'bg-blue-500/10',
      text: 'text-blue-600',
      border: 'hover:border-blue-500/50',
      shadow: 'hover:shadow-blue-500/20',
      iconBg: 'bg-blue-50',
    },
    path: '/about/patient-portal',
  },
  {
    title: 'Doctor Portal',
    desc: 'Manage patient consultations, digital prescriptions, and schedules.',
    icon: Stethoscope,
    color: 'emerald',
    image: '/assets/doctor.jpeg',
    classes: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-500/50',
      shadow: 'hover:shadow-emerald-500/20',
      iconBg: 'bg-emerald-50',
    },
    path: '/about/doctor-terminal',
  },
  {
    title: 'Hospital Admin',
    desc: 'Complete hospital management, staff oversight, and analytics.',
    icon: Building2,
    color: 'indigo',
    image: '/assets/admin2.jpeg',
    classes: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-600',
      border: 'hover:border-indigo-500/50',
      shadow: 'hover:shadow-indigo-500/20',
      iconBg: 'bg-indigo-50',
    },
    path: '/about/hospital-admin',
  },
  {
    title: 'Lab & Diagnostics',
    desc: 'Manage test reports, sample tracking, and diagnostic data.',
    icon: Beaker,
    color: 'purple',
    image: '/assets/lab3.jpeg',
    classes: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-600',
      border: 'hover:border-purple-500/50',
      shadow: 'hover:shadow-purple-500/20',
      iconBg: 'bg-purple-50',
    },
    path: '/about/lab-diagnostics',
  },
  {
    title: 'Pharmacy Portal',
    desc: 'Inventory control, medicine dispensing, and billing systems.',
    icon: Pill,
    color: 'teal',
    image: '/assets/pharma1.jpeg',
    classes: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-600',
      border: 'hover:border-teal-500/50',
      shadow: 'hover:shadow-teal-500/20',
      iconBg: 'bg-teal-50',
    },
    path: '/about/pharmacy-pos',
  },
  {
    title: 'Emergency Care',
    desc: 'Dispatch management and critical care response tracking.',
    icon: Truck,
    color: 'red',
    image: '/assets/emergency.jpg',
    classes: {
      bg: 'bg-red-500/10',
      text: 'text-red-600',
      border: 'hover:border-red-500/50',
      shadow: 'hover:shadow-red-500/20',
      iconBg: 'bg-red-50',
    },
    path: '/about/emergency-ems',
  },{
    title: 'Attendance Portal',
    desc: 'Automated attendance tracking for all hospital staff.',
    icon: FileText,
    color: 'teal',
    image: '/assets/attedence.png',
    classes: {
      bg: 'bg-teal-500/10',
      text: 'text-teal-600',
      border: 'hover:border-teal-500/50',
      shadow: 'hover:shadow-teal-500/20',
      iconBg: 'bg-teal-50',
    },
    path: '/about/staff-portal',
  },
  {
    title: 'Nurse Portal',
    desc: 'Dynamic nursing dashboard for vitals, medication, and ward management.',
    icon: HeartPulse,
    color: 'emerald',
    image: '/assets/nurse.png',
    classes: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600',
      border: 'hover:border-emerald-500/50',
      shadow: 'hover:shadow-emerald-500/20',
      iconBg: 'bg-emerald-50',
    },
    path: '/about/nurse-portal',
  },
  
  {
    title: 'HR Portal',
    desc: 'Complete Human Resource management system.',
    icon: Users,
    color: 'indigo',
    image: '/assets/hr.png',
    classes: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-600',
      border: 'hover:border-indigo-500/50',
      shadow: 'hover:shadow-indigo-500/20',
      iconBg: 'bg-indigo-50',
    },
    path: '/about/staff-portal',
  }
];

const adminPortals = [
  {
    title: 'Frontdesk Portal',
    desc: 'Front desk operations, patient registry, and queue management.',
    icon: Headset,
    color: 'orange',
    image: '/assets/frontdesk.png',
    classes: {
      bg: 'bg-orange-500/10',
      text: 'text-orange-600',
      border: 'hover:border-orange-500/50',
      shadow: 'hover:shadow-orange-500/20',
      iconBg: 'bg-orange-50',
    },
    path: '/about/helpdesk-reception',
  },
  {
    title: 'Staff Portal',
    desc: 'Staff attendance, profile management, and internal communications.',
    icon: Users,
    color: 'amber',
    image: '/assets/staff1.jpeg',
    classes: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-600',
      border: 'hover:border-amber-500/50',
      shadow: 'hover:shadow-amber-500/20',
      iconBg: 'bg-amber-50',
    },
    path: '/about/staff-portal',
  },
  {
    title: 'Discharge Procedure',
    desc: 'Manage patient discharge summaries, clearance, and procedural documentation.',
    icon: FileText,
    color: 'slate',
    image: '/assets/discharge.jpeg',
    classes: {
      bg: 'bg-slate-500/10',
      text: 'text-slate-600',
      border: 'hover:border-slate-500/50',
      shadow: 'hover:shadow-slate-500/20',
      iconBg: 'bg-slate-50',
    },
    path: '/about/discharge-center',
  }
];

const PortalCard = ({ portal, router }: { portal: typeof servicePortals[0], router: { push: (href: string) => void } }) => (
  <div
    onClick={() => router.push(portal.path)}
    className={`group relative flex flex-col rounded-[1rem] border border-primary-theme/30 bg-card transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl ${portal.classes.border} ${portal.classes.shadow} hover:-translate-y-1`}
  >
    {/* Image Section */}
    <div className="relative h-[240px] w-full overflow-hidden">
      <img
        src={portal.image}
        alt={portal.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
    </div>

    {/* Content Section */}
    <div className="p-8 flex flex-col flex-grow bg-white">
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${portal.classes.iconBg}`}>
          <portal.icon className={`w-6 h-6 ${portal.classes.text}`} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">
          {portal.title}
        </h3>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed mb-8 font-medium">
        {portal.desc}
      </p>

      <button className="bg-primary-theme text-white px-4 py-2 rounded-lg">
        Portal Details
      </button>
    </div>
  </div>
);

const PortalGrid = () => {
  const router = useRouter();

  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 space-y-16 sm:space-y-24 bg-slate-50/50">
      {/* Service Portals */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Our Core Healthcare Portals
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Primary gateways for patients, medical professionals, and clinical management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicePortals.map((portal) => (
            <PortalCard key={portal.title} portal={portal} router={router} />
          ))}
        </div>
      </section>

      {/* Admin Portals */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
            Management Gateways
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Dedicated portals for support staff, internal management, and system governance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminPortals.map((portal) => (
            <PortalCard key={portal.title} portal={portal} router={router} />
          ))}
        </div>
      </section>

      {/* See More Button */}
      <section className="max-w-7xl mx-auto  flex justify-center">
        <button
          onClick={() => router.push('/coming-soon')}
          className="group relative px-12 py-5 rounded-2xl bg-primary-theme border border-slate-200 text-white font-black text-sm  tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-xl hover:shadow-slate-200 active:scale-95 flex items-center gap-3"
        >
          See More Modules
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
        </button>
      </section>
    </div>
  );
};


export default PortalGrid;
