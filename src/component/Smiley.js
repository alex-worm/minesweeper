import React from "react";

export default class Smiley extends React.Component {
  render() {
    return (
      <div className="smiley" onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}
