import { create } from "zustand";


export interface BearState {
  guesses: number
  decrease: () => void
}

export const useBearStore = create<BearState>()((set) => ({
	guesses: 9,
	decrease: () => set((state) => ({ guesses: state.guesses - 1 })),
}));
