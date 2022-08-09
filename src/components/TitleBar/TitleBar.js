import "./TitleBar.css";
import Button from "../Button/Button";

const TitleBar = (props) => {
  return (
    <div className="TitleBar text-white bg-black">
      <h1 className="titleText text-4xl">
        <p className="theText">Spotify Stats</p>
      </h1>
      {props.user ? (
        <Button styles="py-2 px-4 mr-2" text="Log Out" onClick={props.logOut} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TitleBar;
