import { Cell as CellType } from "@/types/cell";

function Cell({
  cell,
  handleChooseNodes,
  handleCreateWall,
  setIsDragging,
  isDragging,
}: {
  cell: CellType;
  handleChooseNodes: any;
  handleCreateWall: any;
  setIsDragging: any;
  isDragging: any;
}) {
  let color;

  switch (cell.type) {
    case "empty":
      color = "bg-zinc-700";
      break;
    case "wall":
      color = "bg-red-500";
      break;
    case "visited":
      color = "bg-blue-400";
      break;
    default:
      color = "bg-white";
  }

  const onClick = () => {
    handleChooseNodes(cell.row, cell.col);
  };

  const onMouseDown = () => {
    setIsDragging(true);
    handleCreateWall(cell.row, cell.col);
  };

  const onMouseEnter = () => {
    if (isDragging) {
      handleCreateWall(cell.row, cell.col);
    }
  };

  return (
    <div
      className={`${color} border border-zinc-500`}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    ></div>
  );
}

export default Cell;
