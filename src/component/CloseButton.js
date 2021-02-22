const CloseButton = () => {
  return (
    <div
      className="closeBut clickable"
      onClick={() => {
        document.body.style.backgroundImage = "url('blue-screen.png')";
      }}
    >
      X
    </div>
  );
};

export default CloseButton;
