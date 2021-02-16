import React from "react";

export default class Cell extends React.Component {
  getValue() {
    const { value } = this.props;

    if (!value.isRevealed) {
      return this.props.value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbors === 0) {
      return null;
    }
    return value.neighbor;
  }

  render() {
    const className =
      (this.props.value.isRevealed ? "revealed-cell " : "common-cell ") +
      (this.props.value.isFlagged ? "flagged" : "");
    return (
      <div
        className={className}
        onClick={this.props.onClick}
        onContextMenu={this.props.cMenu}
      >
        {this.getValue()}
      </div>
    );
  }
}
