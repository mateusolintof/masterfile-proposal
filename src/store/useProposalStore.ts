import { create } from 'zustand';

interface ProposalState {
    activeSlide: number;
    setActiveSlide: (index: number) => void;
    // ROI State
    leadsPerMonth: number;
    setLeadsPerMonth: (value: number) => void;
    avgTicket: number;
    setAvgTicket: (value: number) => void;
    upliftFactor: number;
    setUpliftFactor: (value: number) => void;
    setupCost: number;
    monthlyOpex: number;
    // Navigation State
    isIntroComplete: boolean;
    completeIntro: () => void;
}

export const useProposalStore = create<ProposalState>((set) => ({
    activeSlide: 0,
    setActiveSlide: (index) => set({ activeSlide: index }),
    leadsPerMonth: 1000,
    setLeadsPerMonth: (value) => set({ leadsPerMonth: value }),
    avgTicket: 500,
    setAvgTicket: (value) => set({ avgTicket: value }),
    upliftFactor: 1.5,
    setUpliftFactor: (value) => set({ upliftFactor: value }),
    setupCost: 8000,
    monthlyOpex: 2500,
    isIntroComplete: false,
    completeIntro: () => set({ isIntroComplete: true }),
}));
