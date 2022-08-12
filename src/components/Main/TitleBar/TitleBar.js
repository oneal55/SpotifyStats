import "./TitleBar.css";
import Button from "../../Button/Button";

const TitleBar = (props) => {
  return (
    // <div className="TitleBar text-white bg-black">
    <>
    <div className="title-container">
        <h1>
          <span className="text-white text-6xl title-main">
            <strong>Spotify Stats</strong>
          </span>
          <span className="logOut">
            <Button text="Log Out" styles="py-2 px-4" onClick={props.logOut} />
          </span>
        </h1>
    </div>
    </>
  //  </div>
  );
};

export default TitleBar;
