import React from "react";
import Board from "./Board";
import GameStatus from "./GameStatus";

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Game extends React.Component {
  state = {
    field: this.createField(8, 8),
    minesLeft: null,
    time: 0,
    gameStatus: "😀",
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

  endGame(isWon) {
    this.setState({ gameStatus: "🤕💣" });
    alert("bombed");
  }

  render() {
    const info = this.state;
    return (
      <div className="game">
        <GameStatus
          gameStatus={info.gameStatus}
          minesLeft={info.minesLeft}
          time={info.time}
          onCLick={() => this.endGame()}
        />
        <Board field={info.field} gameStatus={info.gameStatus} />
      </div>
    );
  }
}
