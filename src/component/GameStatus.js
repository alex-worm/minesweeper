import React from "react";

export default class GameStatus extends React.Component {
  render() {
    return (
      <div className="status">
        <div className="minesLeft">{this.props.minesLeft}</div>
        <div className="smiley" onClick={this.props.onClick}>
          {this.props.gameStatus}
        </div>
        <div className="time">{this.props.time}</div>
      </div>
    );
  }
}
