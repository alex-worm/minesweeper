import React from "react";
import Cell from "./Cell";

export default class Board extends React.Component {
  renderRow(row) {
    return row.map((cell) => {
      return (
        <Cell
          onClick={() => this.props.onClick(cell.x, cell.y)}
          cMenu={(e) => this.props.cMenu(e, cell.x, cell.y)}
          value={cell}
        />
      );
    });
  }

  render() {
    return this.props.field.map((row) => {
      return <div className="row">{this.renderRow(row)}</div>;
    });
  }
}
