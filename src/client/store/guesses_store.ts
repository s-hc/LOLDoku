import { create } from "zustand";

export interface GuessesState {
  guesses: number
  decrease: () => void
  reset: ()=>void
}

export const useGuessesStore = create<GuessesState>()((set) => ({
	guesses: 9,
	decrease: () => set((state) => ({ guesses: state.guesses - 1 })),
  reset: () => set((_) => ({ guesses: 0 })),
}));
