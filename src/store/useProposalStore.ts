import { create } from 'zustand';

interface ProposalState {
    activeSlide: number;
    setActiveSlide: (index: number) => void;
    // ROI State
    leadsPerMonth: number;
    setLeadsPerMonth: (value: number) => void;
    // Navigation State
    isIntroComplete: boolean;
    completeIntro: () => void;
    // Scroll/Distortion State
    scrollSpeed: number;
    setScrollSpeed: (value: number) => void;
}

export const useProposalStore = create<ProposalState>((set) => ({
    activeSlide: 0,
    setActiveSlide: (index) => set({ activeSlide: index }),
    leadsPerMonth: 1000,
    setLeadsPerMonth: (value) => set({ leadsPerMonth: value }),
    isIntroComplete: false,
    completeIntro: () => set({ isIntroComplete: true }),
    scrollSpeed: 0,
    setScrollSpeed: (value) => set({ scrollSpeed: value }),
}));
