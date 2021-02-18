import React from "react";
import Cell from "./Cell";
import GetNeighbors from "./GetNeighbors";

export default class Board extends React.Component {
  revealEmpty(field, x, y) {
    let area = GetNeighbors(field, x, y);

    area.map((cell) => {
      if (
        !cell.isFlagged &&
        !cell.isRevealed &&
        (cell.neighbors === 0 || !cell.isMine)
      ) {
        field[cell.x][cell.y].isRevealed = true;
        if (cell.neighbors === 0) {
          this.revealEmpty(field, cell.x, cell.y);
        }
      }
    });

    return field;
  }

  checkForWin() {
    for (let i = 0; i < this.props.field.length; i++) {
      for (let j = 0; j < this.props.field.length; j++) {
        if (
          (this.props.field[i][j].isFlagged &&
            !this.props.field[i][j].isMine) ||
          (!this.props.field[i][j].isRevealed &&
            !this.props.field[i][j].isFlagged)
        ) {
          return null;
        }
      }
    }

    this.props.endGame(true);
  }

  handleClick(x, y) {
    if (
      this.props.gameStatus !== "😀" ||
      this.props.field[x][y].isRevealed ||
      this.props.field[x][y].isFlagged
    ) {
      return null;
    }

    if (this.props.field[x][y].isMine) {
      this.props.endGame(false);
      return;
    }

    let newField = this.props.field;

    if (newField[x][y].neighbors === 0) {
      newField = this.revealEmpty(newField, x, y);
    }

    newField[x][y].isRevealed = true;
    this.props.updateField(newField);

    if (this.props.minesCount === 0) {
      this.checkForWin();
    }
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();

    if (
      this.props.gameStatus !== "😀" ||
      (this.props.minesCount === 0 && !this.props.field[x][y].isFlagged) ||
      this.props.field[x][y].isRevealed
    ) {
      return null;
    }

    const newField = this.props.field;
    let minesLeft = this.props.minesCount;

    newField[x][y].isFlagged = !newField[x][y].isFlagged;
    newField[x][y].isFlagged ? minesLeft-- : minesLeft++;

    this.props.updateMines(minesLeft);
    this.props.updateField(newField);

    if (minesLeft === 0) {
      this.checkForWin();
    }
  }

  renderRow(row) {
    return row.map((cell) => {
      return (
        <Cell
          key={cell.x.toString() + cell.y.toString()}
          value={cell}
          onClick={() => this.handleClick(cell.x, cell.y)}
          cMenu={(e) => this.handleContextMenu(e, cell.x, cell.y)}
        />
      );
    });
  }

  render() {
    return (
      <div className="board">
        {this.props.field.map((row) => {
          return <div className="row">{this.renderRow(row)}</div>;
        })}
      </div>
    );
  }
}
