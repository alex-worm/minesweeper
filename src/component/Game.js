import React, { useState, useEffect } from "react";
import Board from "./Board";
import GetNeighbors from "./GetNeighbors";
import GetRandomInt from "./GetRandomInt";
import CloseButton from "./CloseButton";
import Smiley from "./Smiley";
import Timer from "./Timer";
import MinesCounter from "./MinesCounter";

const Game = () => {
  const length = 8;
  const mines = 10;

  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);
  const [status, setStatus] = useState("😀");
  const [minesCount, setMinesCount] = useState(mines);
  const [field, setField] = useState([]);

  const createField = () => {
    let field = [];
    let minesLeft = mines;

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

    while (minesLeft > 0) {
      let rndX = GetRandomInt(0, length);
      let rndY = GetRandomInt(0, length);
      if (!field[rndX][rndY].isMine) {
        field[rndX][rndY].isMine = true;
        minesLeft--;
      }
    }

    setNeighbors(field);

    return field;
  };

  const setNeighbors = (field) => {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
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
  };

  const handleClick = (x, y) => {
    if (status !== "😀" || field[x][y].isRevealed || field[x][y].isFlagged) {
      return null;
    }

    if (field[x][y].isMine) {
      endGame(false);
      return;
    }

    let newField = field.slice();

    if (newField[x][y].neighbors === 0) {
      newField = revealEmpty(newField, x, y);
    }
    newField[x][y].isRevealed = true;

    setField(newField);

    if (minesCount === 0) {
      checkForWin();
    }
  };

  const handleContextMenu = (e, x, y) => {
    e.preventDefault();

    if (
      status !== "😀" ||
      (minesCount === 0 && !field[x][y].isFlagged) ||
      field[x][y].isRevealed
    ) {
      return null;
    }

    let newField = field.slice();
    let minesLeft = minesCount;

    newField[x][y].isFlagged = !newField[x][y].isFlagged;
    newField[x][y].isFlagged ? minesLeft-- : minesLeft++;

    setMinesCount(minesLeft);
    setField(newField);

    if (minesLeft === 0) {
      checkForWin();
    }
  };

  const revealEmpty = (field, x, y) => {
    let area = GetNeighbors(field, x, y);

    area.map((cell) => {
      if (
        !cell.isFlagged &&
        !cell.isRevealed &&
        (cell.neighbors === 0 || !cell.isMine)
      ) {
        field[cell.x][cell.y].isRevealed = true;
        if (cell.neighbors === 0) {
          revealEmpty(field, cell.x, cell.y);
        }
      }
    });

    return field;
  };

  const checkForWin = () => {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (
          (field[i][j].isFlagged && !field[i][j].isMine) ||
          (!field[i][j].isRevealed && !field[i][j].isFlagged)
        ) {
          return null;
        }
      }
    }

    endGame(true);
  };

  const endGame = (isWon) => {
    clearInterval(timer);

    if (isWon) {
      setStatus("😎");
      return;
    }

    let blownField = field.map((row) => {
      return row.map((cell) => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
        return cell;
      });
    });

    setField(blownField);
    setStatus("🤕");
  };

  const startTimer = () => {
    clearInterval(timer);
    setTimer(
      setInterval(() => {
        setTime((time) => time + 1);
      }, 1000)
    );
  };

  useEffect(() => {
    startTimer();
    setField(createField());
  }, []);

  const discharge = () => {
    setMinesCount(mines);
    setField(createField());
    setTime(0);
    setStatus("😀");

    startTimer();
  };

  return (
    <div className="game">
      <div className="windowTop">
        <div>Minesweeper</div>
        <CloseButton />
      </div>
      <div className="gameStatus">
        <MinesCounter value={minesCount} />
        <Smiley value={status} onClick={() => discharge()} />
        <Timer time={time} />
      </div>
      <Board
        field={field}
        handleClick={handleClick}
        handleContextMenu={handleContextMenu}
      />
    </div>
  );
};

export default Game;
