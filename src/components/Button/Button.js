import "./Button.css"


const Button = (props) => {
  const styles = {
    color: props.color,
  };
  return (
    <button
      onClick={props.onClick}
      className={"bg-green-500 text-white rounded-md buttonStyle " + props.styles}
    >
      {props.text}
    </button>
  );
};

export default Button;
