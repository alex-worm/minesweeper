import React from "react";
import Board from "./Board";

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Game extends React.Component {
  state = {
    field: this.createField(8, 8),
    gameStatus: "😀",
    minesLeft: 8,
  };

  createField(length, minesCount) {
    let field = [];

    for (let i = 0; i < length; i++) {
      field.push([]);
      for (let j = 0; j < length; j++) {
        field[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbors: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }

    while (minesCount > 0) {
      let rndX = GetRandomInt(0, length);
      let rndY = GetRandomInt(0, length);
      if (!field[rndX][rndY].isMine) {
        field[rndX][rndY].isMine = true;
        minesCount--;
      }
    }

    return field;
  }

  destroy() {
    this.setState({ gameStatus: "🤕💣" });
    alert("bombed");
  }

  handleClick(x, y) {
    if (
      this.state.gameStatus !== "😀" ||
      this.state.field[x][y].isRevealed ||
      this.state.field[x][y].isFlagged
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

  render() {
    return (
      <div className="game">
        <button
          onClick={() => this.setState({ minesLeft: this.state.minesLeft })}
        >
          {this.state.gameStatus}
        </button>
        <div>Mines left: {this.state.minesLeft}</div>
        <Board
          field={this.state.field}
          onClick={this.handleClick}
          cMenu={this.handleContextMenu}
        />
      </div>
    );
  }
}
