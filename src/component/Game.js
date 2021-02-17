import React from "react";
import Cell from "./Cell";
import Smiley from "./Smiley";
import Timer from "./Timer";
import MinesCounter from "./MinesCounter";

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: 10,
      mines: 10,
      field: [],
      time: 0,
      gameStatus: "😀",
    };
    this.state.field = this.createField(this.state.length, this.state.mines);
    this.state.minesCount = this.state.mines;
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
        const area = this.getNeighbors(field, field[i][j].x, field[i][j].y);
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

  getNeighbors(field, x, y) {
    const el = [];
    //up
    if (x > 0) {
      el.push(field[x - 1][y]);
    }
    //down
    if (x < this.state.length - 1) {
      el.push(field[x + 1][y]);
    }
    //left
    if (y > 0) {
      el.push(field[x][y - 1]);
    }
    //right
    if (y < this.state.length - 1) {
      el.push(field[x][y + 1]);
    }
    // top left
    if (x > 0 && y > 0) {
      el.push(field[x - 1][y - 1]);
    }
    // top right
    if (x > 0 && y < this.state.length - 1) {
      el.push(field[x - 1][y + 1]);
    }
    // bottom right
    if (x < this.state.length - 1 && y < this.state.length - 1) {
      el.push(field[x + 1][y + 1]);
    }
    // bottom left
    if (x < this.state.length - 1 && y > 0) {
      el.push(field[x + 1][y - 1]);
    }

    return el;
  }

  revealEmpty(field, x, y) {
    let area = this.getNeighbors(field, x, y);

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

  endGame(isWon) {
    clearInterval(this.timer);

    if (!isWon) {
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
      return;
    }

    this.setState({ gameStatus: "😎" });
  }

  discharge() {
    this.setState({
      minesCount: this.state.mines,
      field: this.createField(this.state.length, this.state.mines),
      time: 0,
      gameStatus: "😀",
      refreshField: !this.state.refreshField,
    });

    clearInterval(this.timer);
    this.startTimer();
  }

  checkForWin() {
    for (let i = 0; i < this.state.length; i++) {
      for (let j = 0; j < this.state.length; j++) {
        if (
          (this.state.field[i][j].isFlagged &&
            !this.state.field[i][j].isMine) ||
          (!this.state.field[i][j].isRevealed &&
            !this.state.field[i][j].isFlagged)
        ) {
          return null;
        }
      }
    }

    this.endGame(true);
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
      this.endGame(false);
      return;
    }

    let newField = this.state.field;

    if (newField[x][y].neighbors === 0) {
      newField = this.revealEmpty(newField, x, y);
    }

    newField[x][y].isRevealed = true;
    this.setState({ field: newField });

    if (this.state.minesCount === 0) {
      this.checkForWin();
    }
  }

  handleContextMenu(e, x, y) {
    e.preventDefault();

    if (
      this.state.gameStatus !== "😀" ||
      (this.state.minesCount === 0 && !this.state.field[x][y].isFlagged) ||
      this.state.field[x][y].isRevealed
    ) {
      return null;
    }

    const newField = this.state.field;
    let minesLeft = this.state.minesCount;

    newField[x][y].isFlagged = !newField[x][y].isFlagged;
    newField[x][y].isFlagged ? minesLeft-- : minesLeft++;

    this.setState({ field: newField, minesCount: minesLeft });

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
    let info = this.state;

    return (
      <div className="game">
        <div className="windowTop">
          <div>Minesweeper</div>
          <div
            className="closeBut"
            onClick={() => {
              alert(";(");
            }}
          >
            X
          </div>
        </div>
        <div className="gameStatus">
          <MinesCounter value={info.minesCount} />
          <Smiley value={info.gameStatus} onClick={() => this.discharge()} />
          <Timer value={info.time} />
        </div>
        <div className="board">
          {info.field.map((row) => {
            return <div className="row">{this.renderRow(row)}</div>;
          })}
        </div>
      </div>
    );
  }
}
