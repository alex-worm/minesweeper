import React from "react";
import Smiley from "./Smiley";
import Timer from "./Timer";
import MinesCounter from "./MinesCounter";
import Board from "./Board";
import CloseButton from "./CloseButton";
import GetNeighbors from "./GetNeighbors";
import GetRandomInt from "./GetRandomInt";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 8,
      mines: 10,
      field: [],
      time: 0,
      gameStatus: "😀",
    };
    this.state.minesCount = this.state.mines;
    this.state.field = this.createField(this.state.length, this.state.mines);
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  createField(length, minesCount) {
    let field = [];

    for (let i = 0; i < length; i++) {
      field.push([]);
      for (let j = 0; j < length; j++) {
        field[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbors: null,
          isRevealed: false,
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

    this.setNeighbors(field);

    return field;
  }

  setNeighbors(field) {
    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state.length; j++) {
        let mine = 0;
        const area = GetNeighbors(field, field[i][j].x, field[i][j].y);
        area.map((cell) => {
          if (cell.isMine) {
            mine++;
          }
        });
        field[i][j].neighbors = mine;
      }
    }

    return field;
  }

  discharge() {
    this.setState({
      minesCount: this.state.mines,
      field: this.createField(this.state.length, this.state.mines),
      time: 0,
      gameStatus: "😀",
    });

    clearInterval(this.timer);
    this.startTimer();
  }

  endGame = (isWon) => {
    clearInterval(this.timer);

    if (isWon) {
      this.setState({ gameStatus: "😎" });
      return;
    }

    let blownField = this.state.field;

    blownField = blownField.map((row) => {
      return row.map((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
        return cell;
      });
    });

    this.setState({ field: blownField, gameStatus: "🤕" });
  };

  updateField = (value) => {
    this.setState({ field: value });
  };

  updateStatus = (value) => {
    this.setState({ gameStatus: value });
  };

  updateMines = (value) => {
    this.setState({ minesCount: value });
  };

  render() {
    let info = this.state;

    return (
      <div className="game">
        <div className="windowTop">
          <div>Minesweeper</div>
          <CloseButton />
        </div>
        <div className="gameStatus">
          <MinesCounter value={info.minesCount} />
          <Smiley value={info.gameStatus} onClick={() => this.discharge()} />
          <Timer time={info.time} />
        </div>
        <Board
          updateField={this.updateField}
          updateStatus={this.updateStatus}
          updateMines={this.updateMines}
          endGame={this.endGame}
          field={info.field}
          length={info.length}
          minesCount={info.minesCount}
          gameStatus={info.gameStatus}
        />
      </div>
    );
  }
}
