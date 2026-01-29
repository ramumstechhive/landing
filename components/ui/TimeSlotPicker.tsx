import { AlertCircle } from 'lucide-react';


interface TimeSlotPickerProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

export default function TimeSlotPicker({ value, onChange, error }: TimeSlotPickerProps) {
    const generateTimeSlots = () => {
        const slots = [];
        const start = 9 * 60; // 9:00 AM
        const end = 18 * 60 + 30; // 6:30 PM
        for (let time = start; time <= end; time += 30) {
            const hours = Math.floor(time / 60);
            const minutes = time % 60;
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours > 12 ? hours - 12 : hours; // 12 should be 12 not 0
            const displayHoursFixed = displayHours === 0 ? 12 : displayHours;
            const displayMinutes = minutes === 0 ? '00' : minutes;
            const timeString = `${displayHoursFixed}:${displayMinutes} ${period}`;
            slots.push(timeString);
        }
        return slots;
    };

    const slots = generateTimeSlots();

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[140px] overflow-y-auto pr-1 custom-scrollbar">
                {slots.map((slot) => (
                    <button
                        key={slot}
                        type="button"
                        onClick={() => onChange(slot)}
                        className={`px-2 py-2 text-xs font-bold rounded-lg border transition-all ${value === slot
                            ? 'bg-primary-theme text-white border-primary-theme shadow-md scale-[1.02]'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-primary-theme/50 hover:bg-slate-50'
                            }`}
                    >
                        {slot}
                    </button>
                ))}
            </div>
            {error && (
                <p className="text-red-500 text-[10px] font-bold uppercase flex items-center gap-1">
                    <AlertCircle size={10} /> {error}
                </p>
            )}
        </div>
    );
}

// Add simple style for custom scrollbar within the component or ensure it exists globally
// The user has 'custom-scrollbar' class likely defined in globals.css
