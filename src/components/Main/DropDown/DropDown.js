const DropDown = (props) => {
  return (
    <>
      <label htmlFor="type">Artists or Tracks: </label>
      <select
        className="mr-8"
        name="type"
        onChange={(event) => props.setter(event.target.value)}
      >
        {props.choices.map((option) => (
          <option key={option} value={option}>
            {props.formatter(option)}
          </option>
        ))}
      </select>
    </>
  );
};

export default DropDown;
