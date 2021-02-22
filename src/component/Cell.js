const Cell = (props) => {
  let className;
  if (props.value.isRevealed) {
    className = "revealed-cell";
  } else {
    className =
      "common-cell " + (props.value.isFlagged ? "flagged" : "clickable");
  }

  const getValue = () => {
    if (!props.value.isRevealed) {
      return props.value.isFlagged ? "🚩" : null;
    }
    if (props.value.isMine) {
      return "💣";
    }
    if (props.value.neighbors === 0) {
      return null;
    }
    return props.value.neighbors;
  };

  return (
    <div
      className={className}
      onClick={props.onClick}
      onContextMenu={props.cMenu}
    >
      {getValue()}
    </div>
  );
};

export default Cell;
