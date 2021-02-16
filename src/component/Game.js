import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  state = {
    length: 8,
    mines: 8,
    gameStatus: "Game in progress",
    minesLeft: this.mines,
  };

  createEmptyArray() {
    let field = [];

    for (let i = 0; i < this.state.length; i++) {
      field.push([]);
      for (let j = 0; j < this.state.length; j++) {
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
    return field;
  }

  render() {
    return (
      <div className="game">
        <Board field={this.createEmptyArray()} />
      </div>
    );
  }
}
