const Smiley = (props) => {
  return (
    <div className="smiley clickable" onClick={props.onClick}>
      {props.value}
    </div>
  );
};

export default Smiley;
