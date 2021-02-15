import logo from "./logo.svg";
import "./App.css";

function Square(props) {
  return (
    <div className="square"
      onClick={props.onClick}
      onContextMenu={props.onCMenu}
    >
      {props.value}
    </div>
  );
}

function Row(props) {
  let row = [];

  for (let i = 0; i < props.length; i++) {
    row.concat([<Square
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}//изменить i
      onCMenu={() => this.props.onCMenu(i)}       
      />]);
  }

  return <div className="row">{row}</div>;
}

class Board extends React.Component {
  render() {
    let rows = [];

    for (let i = 0; i < props.count; i++) {
      row.concat([{ Row(props) }]);
    }

    return <div className="board">{rows}</div>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
