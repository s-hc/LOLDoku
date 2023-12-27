import { create } from "zustand";

export interface GridState {
  grid: Array<{
    name?:string
  }>
  makeGuess: (guess:string, ind:number) => void
}

export const useGridStore = create<GridState>()((set) => ({
	grid: Array(9).fill({}),
	makeGuess: (guess:string, ind:number) => set((state) => ({ grid: state.grid.toSpliced(ind, 1, {name:guess}) })),
}));
/* 
type State = {
  deep: {
    nested: {
      obj: { count: number }
    }
  }
}



set((state) => ({
      deep: {
        ...state.deep,
        nested: {
          ...state.deep.nested,
          obj: {
            ...state.deep.nested.obj,
            count: state.deep.nested.obj.count + 1
          }
        }
      }
    }))
    */