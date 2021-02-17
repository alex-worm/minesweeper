import React from "react";

export default class MinesCounter extends React.Component {
  render() {
    return <div className="minesCounter">{this.props.value}</div>;
  }
}
