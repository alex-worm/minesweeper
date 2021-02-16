import React from "react";
import Cell from "./Cell";

export default class Board extends React.Component {
  handleClick(x, y) {
    if (
      this.props.gameStatus !== "😀" ||
      this.props.field[x][y].isRevealed ||
      this.props.field[x][y].isFlagged
    ) {
      return null;
    }

    if (this.state.field[x][y].isMine) {
      this.destroy();
      return;
    }

    const newField = this.state.field;
    newField[x][y].isRevealed = true;
    this.setState({ field: newField });
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();

    if (this.state.gameStatus !== "😀" || this.state.field[x][y].isRevealed) {
      return null;
    }

    const newField = this.state.field;
    newField[x][y].isFlagged = !newField[x][y].isFlagged;
    this.setState({ field: newField });
  }

  renderRow(row) {
    return row.map((cell) => {
      return (
        <Cell
          onClick={() => {
            this.props.onClick(cell.x, cell.y);
            alert("fgsd");
          }}
          cMenu={(e) => this.props.cMenu(e, cell.x, cell.y)}
          value={cell}
        />
      );
    });
  }

  render() {
    return this.props.field.map((row) => {
      return <div className="row">{this.renderRow(row)}</div>;
    });
  }
}
