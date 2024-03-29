import { create } from "zustand";
import {Data} from "../questions.json"
export interface GridState {
  grid: Array<{
    name?:string
    champNum?:number
  }>
  makeGuess: (guess:string, num:number, ind:number) => void
}

export const useGridStore = create<GridState>()((set) => ({
	grid: Array(9).fill({}),
	makeGuess: (guess:string, num:number, ind:number) => {
    if( Data[ind].includes(guess)){
      set((state) => ({ grid: state.grid.toSpliced(ind, 1, {name:guess, champNum:num}) }))}
    }
    ,
}));
