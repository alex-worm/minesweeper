import Board from "./component/Board";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Board
        count={10}
        onClick={() => alert("Click")}
        onCMenu={() => alert("CMenu")}
      />
    </div>
  );
}

export default App;
