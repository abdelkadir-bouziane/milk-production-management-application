const Button = ({ text, clickHandler, secondary }) => {
  return (
    <button
      className={secondary ? "secondary-btn btn" : "primary-btn btn"}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};

export default Button;
