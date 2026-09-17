import { DetailPanel } from "@/types/detail.type";
import { create } from "zustand";

interface DetailsStore {
    type: DetailPanel | null;
    open: (type: DetailPanel) => void;
    close: () => void;
}

export const useDetailsStore = create<DetailsStore>((set) => ({
    type: null,
    open: (type) => set({ type }),
    close: () => set({ type: null }),
}));
