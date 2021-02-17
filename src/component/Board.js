import React from "react";
import Cell from "./Cell";

function GetRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: [],
    };
    this.state.field = this.createField(this.props.length, this.props.mines);
    this.state.minesCount = this.props.mines;
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
    for (let i = 0; i < this.props.length; i++) {
      for (let j = 0; j < this.props.length; j++) {
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
    if (x < this.props.length - 1) {
      el.push(field[x + 1][y]);
    }
    //left
    if (y > 0) {
      el.push(field[x][y - 1]);
    }
    //right
    if (y < this.props.length - 1) {
      el.push(field[x][y + 1]);
    }
    // top left
    if (x > 0 && y > 0) {
      el.push(field[x - 1][y - 1]);
    }
    // top right
    if (x > 0 && y < this.props.length - 1) {
      el.push(field[x - 1][y + 1]);
    }
    // bottom right
    if (x < this.props.length - 1 && y < this.props.length - 1) {
      el.push(field[x + 1][y + 1]);
    }
    // bottom left
    if (x < this.props.length - 1 && y > 0) {
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

      this.setState({ field: blownField });
      this.props.updateStatus("🤕");
      return;
    }

    this.props.updateStatus("😎");
  }

  checkForWin() {
    for (let i = 0; i < this.props.length; i++) {
      for (let j = 0; j < this.props.length; j++) {
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
      this.props.gameStatus !== "😀" ||
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
      this.props.gameStatus !== "😀" ||
      (this.state.minesCount === 0 && !this.state.field[x][y].isFlagged) ||
      this.state.field[x][y].isRevealed
    ) {
      return null;
    }

    const newField = this.state.field;
    let minesLeft = this.state.minesCount;

    newField[x][y].isFlagged = !newField[x][y].isFlagged;
    newField[x][y].isFlagged ? minesLeft-- : minesLeft++;

    this.setState({ field: newField, minesCount: minesLeft }, () => {
      this.props.updateMines(this.state.minesCount);
    });

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
        {this.state.field.map((row) => {
          return <div className="row">{this.renderRow(row)}</div>;
        })}
      </div>
    );
  }
}
