import React from "react";

function Square(props) {
  return (
    <div
      className="square"
      onClick={props.onClick}
      onContextMenu={props.onCMenu}
    >
      {props.value}
    </div>
  );
}

function Row(props) {
  let row = [];

  for (let j = 0; j < props.length; j++) {
    row.push([
      <Square
        key={props.i * props.length + j}
        value={props.i * props.length + j}
        onClick={() => props.onClick(props.i * props.length + j)}
        onCMenu={() => props.onCMenu(props.i * props.length + j)}
      />,
    ]);
  }

  return <div className="row">{row}</div>;
}

export default class Board extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < this.props.count; i++) {
      rows.push([
        <Row
          key={i}
          i={i}
          length={this.props.count}
          onClick={() => this.props.onClick(i)}
          onCMenu={() => this.props.onCMenu(i)}
        />,
      ]);
    }

    return <div className="board">{rows}</div>;
  }
}
