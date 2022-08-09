const Button = (props) => {
  const styles = {
    color: props.color,
  };
  return (
    <button
      onClick={props.onClick}
      className={"bg-green-500 text-white rounded-md " + props.styles}
    >
      {props.text}
    </button>
  );
};

export default Button;
