import { Cell } from "@/types/cell";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { v4 } from "uuid";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createGrid(gridSize: number): Cell[][] {
  const grid = [];
  for (let i = 0; i < gridSize; i++) {
    const row = [];
    for (let j = 0; j < gridSize; j++) {
      const cell: Cell = {
        id: v4(),
        type: "empty",
        row: i,
        col: j,
      };
      row.push(cell);
    }
    grid.push(row);
  }
  return grid;
}
