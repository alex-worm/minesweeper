import React from "react";
import Cell from "./Cell";
import Smiley from "./Smiley";
import Timer from "./Timer";
import MinesCounter from "./MinesCounter";
import Board from "./Board";
import CloseButton from "./CloseButton";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 10,
      mines: 1,
      time: 0,
      gameStatus: "😀",
    };
    this.state.minesCount = this.state.mines;
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
    }, 1000);
  }

  discharge() {
    this.setState({
      minesCount: this.state.mines,
      time: 0,
      gameStatus: "😀",
    });

    clearInterval(this.timer);
    this.startTimer();
  }

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
          updateStatus={this.updateStatus}
          updateMines={this.updateMines}
          length={info.length}
          mines={info.mines}
          gameStatus={info.gameStatus}
        />
      </div>
    );
  }
}
