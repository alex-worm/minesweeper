import React from "react";
import Cell from "./Cell";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      field: props.field,
    };
  }

  handleClick(x, y) {
    if (this.state.field[x][y].isRevealed) {
      return null;
    }

    const newField = this.state.field;
    newField[x][y].isRevealed = true;
    this.setState({ field: newField });
  }

  renderRow(row) {
    return row.map((cell) => {
      return (
        <Cell
          onClick={() => this.handleClick(cell.x, cell.y)}
          cMenu={(e) => this.handleContextMenu(e, cell.x, cell.y)}
          value={cell}
        />
      );
    });
  }

  render() {
    return this.state.field.map((row) => {
      return <div className="row">{this.renderRow(row)}</div>;
    });
  }
}
