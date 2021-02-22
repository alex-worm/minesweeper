const Cell = (props) => {
  const className =
    (props.value.isRevealed ? "revealed-cell " : "common-cell clickable") +
    (props.value.isFlagged ? " flagged" : "");

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
