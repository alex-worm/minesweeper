import React from "react";

export default class Cell extends React.Component {
  render() {
    const className = this.props.value.isRevealed
      ? "revealed-cell"
      : "common-cell";
    return (
      <div
        onClick={this.props.onClick}
        className={className}
        onContextMenu={this.props.cMenu}
      >
        {this.props.value.x.toString() + this.props.value.y.toString()}
      </div>
    );
  }
}
