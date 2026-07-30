import { create } from "zustand";

interface ThemeState {
    activeSectionColor: string;
    setActiveSectionColor: (color: string) => void;
    isAppLoaded: boolean;
    setIsAppLoaded: (loaded: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
    activeSectionColor: "from-violet-950/20 via-background to-indigo-950/20",
    setActiveSectionColor: (color) => set({ activeSectionColor: color }),
    isAppLoaded: false,
    setIsAppLoaded: (loaded: boolean) => set({ isAppLoaded: loaded }),
}));

