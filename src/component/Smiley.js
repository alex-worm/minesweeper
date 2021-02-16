import React from "react";

export default class Smiley extends React.Component {
  render() {
    return (
      <div className="Smiley" onClick={this.props.onClick}>
        {this.props.value}
      </div>
    );
  }
}
