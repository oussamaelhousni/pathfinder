import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import { useEffect, useState } from "react";
import { SelectGroup } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { FaPlay } from "react-icons/fa6";
import { Cell as CellType } from "./types/cell";
import { createGrid } from "./lib/utils";
import Cell from "./components/ui/cell";

const ALGORITHMS = [
  {
    label: "Dijikstra",
    value: "djikstra",
  },
  {
    label: "A star",
    value: "a-start",
  },
  {
    label: "Depth first search",
    value: "dfs",
  },
] as const;

const GRID_SIZE = 30 as const;

type Position = {
  row: number;
  col: number;
};
function App() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState("djikstra");
  const [speed, setSpeed] = useState([50]);

  const [grid, setGrid] = useState<CellType[][]>(createGrid(GRID_SIZE));

  const [startNode, setStartNode] = useState<Position | null>(null);
  const [endNode, setEndNode] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleChooseNodes = (row: number, col: number) => {
    console.log("startNode", startNode);
    console.log("endNode", endNode);
    if (!startNode && (endNode?.row !== row || endNode?.col !== col)) {
      setStartNode({ row, col });
      setGrid((prev) => {
        prev[row][col].type = "start";
        return [...prev];
      });
      return;
    }

    if (!endNode && (startNode?.row !== row || startNode?.col !== col)) {
      setEndNode({ row, col });
      setGrid((prev) => {
        prev[row][col].type = "end";
        return [...prev];
      });
      return;
    }

    if (startNode && startNode.row === row && startNode.col === col) {
      setStartNode(null);
      setGrid((prev) => {
        prev[row][col].type = "empty";
        return [...prev];
      });
      return;
    }

    if (endNode && endNode.row === row && endNode.col === col) {
      setEndNode(null);
      setGrid((prev) => {
        prev[row][col].type = "empty";
        return [...prev];
      });
      return;
    }

    setGrid((prev) => {
      prev[row][col].type = prev[row][col].type === "empty" ? "wall" : "empty";
      return [...prev];
    });
  };

  const handleCreateWall = (row: number, col: number) => {
    if (!startNode || !endNode) return;
    if (
      startNode.row === row ||
      startNode.col === col ||
      endNode.row === row ||
      endNode.col === col
    ) {
      return;
    }

    setGrid((prev) => {
      prev[row][col].type = prev[row][col].type === "empty" ? "wall" : "empty";
      return [...prev];
    });
    return;
  };

  useEffect(() => {
    console.log("startNode", startNode);
  }, [startNode]);

  useEffect(() => {
    console.log("endNode", endNode);
  }, [endNode]);

  useEffect(() => {
    console.log("isDragging", isDragging);
  }, [isDragging]);

  const onMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className="w-full min-h-screen bg-zinc-950">
      {/*HEADER START*/}
      <header className="">
        <div className="max-w-[1000px] px-4 mx-auto flex items-center justify-between min-h-24">
          <h1 className="text-white text-2xl">Pathfinder</h1>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="text-white text-nowrap">
                Select an Algorithm :
              </div>
            </div>
            <Select
              value={currentAlgorithm}
              onValueChange={(value) => setCurrentAlgorithm(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ALGORITHMS.map((algo) => {
                    return (
                      <SelectItem value={algo.value} key={algo.value}>
                        {algo.label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <div className="text-white text-nowrap">Select The speed :</div>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={speed}
                onValueChange={(val) => setSpeed(val)}
                className="min-w-32 "
              />
            </div>

            <button className="w-8 h-8 rounded-full bg-zinc-700 text-green-500 flex items-center justify-center">
              <FaPlay />
            </button>
          </div>
        </div>
      </header>
      {/*HEADER ENDS*/}

      <div className="w-full">
        <div className={`max-w-[1000px] px-4 mx-auto  `}>
          <div
            className="grid aspect-square w-3/4 mx-auto"
            style={{
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            }}
            onMouseUp={onMouseUp}
          >
            {grid.flat().map((cell) => {
              return (
                <Cell
                  cell={cell}
                  handleChooseNodes={handleChooseNodes}
                  key={cell.id}
                  handleCreateWall={handleCreateWall}
                  setIsDragging={setIsDragging}
                  isDragging={isDragging}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
