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
    row.concat([
      <Square
        value={this.props.squares[this.props.i * 10 + j]}
        onClick={() => this.props.onClick(this.props.i * 10 + j)}
        onCMenu={() => this.props.onCMenu(this.props.i * 10 + j)}
      />,
    ]);
  }

  return <div className="row">{row}</div>;
}

export default class Board extends React.Component {
  render() {
    let rows = [];

    // for (let i = 0; i < this.props.count; i++) {
    //   rows.concat([
    //     <Row
    //       i={i}
    //       onClick={() => this.props.onClick(i)}
    //       onCMenu={() => this.props.onCMenu(i)}
    //     />,
    //   ]);
    // }

    return <div className="board">{rows}</div>;
  }
}
