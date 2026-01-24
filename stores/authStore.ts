import { create } from 'zustand';

interface User {
    name: string;
    role: string;
    image?: string;
}

interface AuthState {
    user: User | null;
    logout: () => void;
    login: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    logout: () => set({ user: null }),
    login: (user) => set({ user }),
}));
