import CellH from "./CellH";

const Board = (props) => {
  const renderRow = (row) => {
    return row.map((cell) => {
      return (
        <CellH
          key={cell.x.toString() + cell.y.toString()}
          value={cell}
          onClick={() => props.handleClick(cell.x, cell.y)}
          cMenu={(e) => props.handleContextMenu(e, cell.x, cell.y)}
        />
      );
    });
  };

  return (
    <div className="board">
      {props.field.map((row) => {
        return <div className="row">{renderRow(row)}</div>;
      })}
    </div>
  );
};

export default Board;
