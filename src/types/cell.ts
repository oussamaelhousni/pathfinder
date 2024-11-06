export type Cell = {
  id: string;
  type: "visited" | "empty" | "wall" | "start" | "end";
  row: number;
  col: number;
};
