import { create } from "zustand";

interface IncrementStore {
    count: number;
    increment: () => void;
    setCount: (value: number) => void;
    getCount: () => number;
}

export const useIncrementStore = create<IncrementStore>((set, get) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    setCount: (value: number) => set({ count: value }),
    getCount: () => get().count,
}));
