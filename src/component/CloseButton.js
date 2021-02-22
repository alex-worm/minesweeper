import React from "react";

export default class CloseButton extends React.Component {
  render() {
    return (
      <div
        className="closeBut clickable"
        onClick={() => {
          document.body.style.backgroundImage = "url('blueScreen.png')";
        }}
      >
        X
      </div>
    );
  }
}
